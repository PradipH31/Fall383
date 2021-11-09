﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FA21.P05.Web.Data;
using FA21.P05.Web.Features.AddonItems;
using FA21.P05.Web.Features.Identity;
using FA21.P05.Web.Features.MenuItems;
using FA21.P05.Web.Features.Orders;
using FA21.P05.Web.Features.Orders.Addon;
using FA21.P05.Web.Features.Orders.Addon.Dto;
using FA21.P05.Web.Features.Orders.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FA21.P05.Web.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext dataContext;

        public OrdersController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        private static Expression<Func<Order, OrderDto>> MapDto()
        {
            return x => new OrderDto
            {
                Id = x.Id,
                Canceled = x.Canceled,
                OrderTotal = x.OrderTotal,
                Placed = x.Placed,
                Started = x.Started,
                OrderItems = x.OrderItems.Select(y => new OrderItemDto
                {
                    Id = y.Id,
                    LineItemPrice = y.LineItemPrice,
                    LineItemQuantity = y.LineItemQuantity,
                    LineItemTotal = y.LineItemTotal,
                    MenuItemId = y.MenuItemId,
                    AddonOrderItems = y.AddonOrderItems.Select(z => new AddonOrderItemDto
                    {
                        AddonItemId = z.AddonItemId,
                        Id = z.Id,
                        LineItemTotal = z.LineItemTotal
                    })
                }),
            };
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<OrderDto> GetById(int id)
        {
            var result = dataContext
                .Set<Order>()
                .Select(MapDto())
                .FirstOrDefault(x => x.Id == id);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        [HttpPost]
        public ActionResult<OrderDto> Create(CreateOrderDto create)
        {
            var createdOrder = new Order
            {
                Placed = DateTimeOffset.UtcNow
            };

            var matchingIds = create.OrderItems.Select(x => x.MenuItemId);
            var relatedMenuItems = dataContext
                .Set<MenuItem>()
                .Where(x => matchingIds.Contains(x.Id))
                .ToArray();

            foreach (var item in create.OrderItems)
            {
                var menuItem = relatedMenuItems.FirstOrDefault(y => y.Id == item.MenuItemId);
                if (menuItem == null)
                {
                    return BadRequest();
                }

                OrderItem orderItem = new OrderItem
                {
                    LineItemPrice = menuItem.Price,
                    LineItemQuantity = item.LineItemQuantity,
                    LineItemTotal = menuItem.Price * item.LineItemQuantity,
                    MenuItemId = menuItem.Id,

                };
                IncludeAddonToMenuItem(item, menuItem, orderItem);
                createdOrder.OrderItems.Add(orderItem);
            }

            createdOrder.OrderTotal = createdOrder.OrderItems.Sum(x => x.LineItemTotal);
            dataContext.Set<Order>().Add(createdOrder);
            dataContext.SaveChanges();

            var dto = new OrderDto()
            {
                Id = createdOrder.Id,
                OrderTotal = createdOrder.OrderTotal,
                Placed = createdOrder.Placed,
                OrderItems = createdOrder.OrderItems.Select(y => new OrderItemDto
                {
                    Id = y.Id,
                    LineItemPrice = y.LineItemPrice,
                    LineItemQuantity = y.LineItemQuantity,
                    LineItemTotal = y.LineItemTotal,
                    MenuItemId = y.MenuItemId,
                    AddonOrderItems = y.AddonOrderItems.Select(a => new AddonOrderItemDto
                    {
                        Id = a.Id,
                        AddonItemId = a.AddonItemId,
                        LineItemTotal = a.LineItemTotal
                    })
                })
            };

            return CreatedAtAction(nameof(GetById), new { id = createdOrder.Id }, dto);
        }

        private void IncludeAddonToMenuItem(CreateOrderItemDto item, MenuItem menuItem, OrderItem orderItem)
        {
            var matchingAddonIds = item.AddonOrderItemsDto.Select(x => x.AddonItemId);
            var relatedAddonItems = dataContext
                .Set<AddonItem>()
                .Where(x => matchingAddonIds.Contains(x.Id))
                .ToArray();
            if (relatedAddonItems.Any())
            {
                foreach (var createAddonOrderItemDto in item.AddonOrderItemsDto)
                {
                    var addonItem = relatedAddonItems.FirstOrDefault(y => y.Id == createAddonOrderItemDto.AddonItemId);
                    menuItem.Price = menuItem.Price + addonItem.Price;
                    orderItem.AddonOrderItems.Add(new AddonOrderItem
                    {
                        AddonItemId = addonItem.Id,
                        LineItemTotal = addonItem.Price,
                    });
                }
            }
        }

        [HttpPut("{id}/cancel")]
        public ActionResult<OrderDto> Cancel(int id)
        {
            var order = dataContext
                .Set<Order>()
                .FirstOrDefault(x => x.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            if (order.Canceled != null)
            {
                return BadRequest("already canceled");
            }

            if (order.Started != null)
            {
                return BadRequest("already started");
            }

            if (order.Placed < DateTimeOffset.UtcNow.AddMinutes(-10))
            {
                return BadRequest("older than 10 minutes");
            }

            order.Canceled = DateTimeOffset.UtcNow;
            dataContext.SaveChanges();

            return Ok();
        }

        [HttpPut("{id}/start")]
        [Authorize(Roles = RoleNames.StaffOrAdmin)]
        public ActionResult<OrderDto> Start(int id)
        {
            var order = dataContext
                .Set<Order>()
                .FirstOrDefault(x => x.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            if (order.Canceled != null)
            {
                return BadRequest("already canceled");
            }

            if (order.Started != null)
            {
                return BadRequest("already started");
            }

            order.Started = DateTimeOffset.UtcNow;
            dataContext.SaveChanges();

            return Ok();
        }
    }
}