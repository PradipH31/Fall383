using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FA21.P05.Web.Data;
using FA21.P05.Web.Features.AddonItems;
using FA21.P05.Web.Features.Categories;
using FA21.P05.Web.Features.Identity;
using FA21.P05.Web.Features.MenuItems;
using FA21.P05.Web.Features.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FA21.P05.Web.Controllers
{
    [ApiController]
    [Route("api/menu-items")]
    public class MenuItemController : ControllerBase
    {
        private readonly DataContext dataContext;

        public MenuItemController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        private static Expression<Func<MenuItem, MenuItemDto>> MapDto()
        {
            return x => new MenuItemDto
            {
                Id = x.Id,
                Price = x.Price,
                Description = x.Description,
                IsSpecial = x.IsSpecial,
                Name = x.Name,
                AddonCategoryId = x.AddonCategoryId,
                MenuCategoryId = x.MenuCategoryId,
                ImageLink = x.ImageLink
            };
        }

        private static Expression<Func<MenuItem, MenuItemDto>> MapDtoWithAddons()
        {
            return x => new MenuItemDto
            {
                Id = x.Id,
                Price = x.Price,
                Description = x.Description,
                IsSpecial = x.IsSpecial,
                Name = x.Name,
                ImageLink = x.ImageLink,
                AddonCategoryId = x.AddonCategoryId,
                MenuCategoryId = x.MenuCategoryId,
                AddonCategory = x.AddonCategoryId == 1 ? null : new AddonCategoryDto
                {
                    AddonItemDtos = x.AddonCategory.AddonItems.Select(y => new AddonItemDto
                    {
                        ImageLink = y.ImageLink,
                        AddonCategoryId = y.AddonCategoryId,
                        Id = y.Id,
                        Name = y.Name,
                        Price = y.Price
                    }),
                    Id = x.AddonCategoryId,
                }
            };
        }

        [HttpGet]
        public ActionResult<IEnumerable<MenuItemDto>> Get()
        {
            return GetDtos().ToList();
        }

        private IQueryable<MenuItemDto> GetDtos()
        {
            return dataContext.Set<MenuItem>().Select(MapDto());
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<MenuItemDto> GetById(int id)
        {
            var result = dataContext
                .Set<MenuItem>()
                .Select(MapDtoWithAddons())
                .FirstOrDefault(x => x.Id == id);
            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = RoleNames.StaffOrAdmin)]
        public ActionResult<MenuItemDto> Update(int id, MenuItemDto item)
        {
            var entity = dataContext
                .Set<MenuItem>()
                .FirstOrDefault(x => x.Id == id);
            if (entity == null)
            {
                return NotFound();
            }

            if (item.Price <= 0)
            {
                return BadRequest();
            }

            entity.Price = item.Price;
            entity.Description = item.Description;
            entity.Name = item.Name;
            entity.IsSpecial = item.IsSpecial;
            entity.AddonCategoryId = item.AddonCategoryId;
            entity.ImageLink = item.ImageLink;
            entity.MenuCategoryId = item.MenuCategoryId;
            dataContext.SaveChanges();

            return new MenuItemDto
            {
                Id = entity.Id,
                Price = entity.Price,
                Description = entity.Description,
                IsSpecial = entity.IsSpecial,
                AddonCategoryId = entity.AddonCategoryId,
                ImageLink = entity.ImageLink,
                Name = entity.Name,
                MenuCategoryId = entity.MenuCategoryId
            };
        }

        [HttpGet]
        [Route("specials")]
        public ActionResult<IEnumerable<MenuItemDto>> GetSpecials()
        {
            var result = dataContext
                .Set<MenuItem>()
                .Where(x => x.IsSpecial)
                .Select(MapDto())
                .ToList();
            return Ok(result);
        }

        [HttpPost]
        // [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<MenuItemDto> Create(MenuItemDto menuItem)
        {
            if (menuItem.Price <= 0)
            {
                return BadRequest();
            }

            var item = dataContext
                .Set<MenuItem>()
                .Add(new MenuItem
                {
                    Description = menuItem.Description,
                    Price = menuItem.Price,
                    IsSpecial = menuItem.IsSpecial,
                    Name = menuItem.Name,
                    ImageLink = menuItem.ImageLink,
                    AddonCategoryId = menuItem.AddonCategoryId,
                    MenuCategoryId = menuItem.MenuCategoryId
                });

            dataContext.SaveChanges();
            menuItem.Id = item.Entity.Id;

            return CreatedAtAction(nameof(GetById), new { id = menuItem.Id }, menuItem);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult Delete(int id)
        {
            var entity = dataContext
                .Set<MenuItem>()
                .FirstOrDefault(x => x.Id == id);
            if (entity == null)
            {
                return NotFound();
            }

            var anyOrdersWithItem = dataContext
                .Set<OrderItem>()
                .Any(x => x.MenuItemId == id);

            if (anyOrdersWithItem)
            {
                return BadRequest();
            }

            dataContext.Set<MenuItem>().Remove(entity);
            dataContext.SaveChanges();

            return Ok();
        }
    }
}
