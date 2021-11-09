using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FA21.P05.Web.Data;
using FA21.P05.Web.Features.Identity;
using FA21.P05.Web.Features.AddonItems;
using FA21.P05.Web.Features.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FA21.P05.Web.Features.Orders.Addon;

namespace FA21.P05.Web.Controllers
{
    [ApiController]
    [Route("api/addon-items")]
    public class AddonItemController : ControllerBase
    {
        private readonly DataContext dataContext;

        public AddonItemController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        private static Expression<Func<AddonItem, AddonItemDto>> MapDto()
        {
            return x => new AddonItemDto
            {
                Id = x.Id,
                Price = x.Price,
                Description = x.Description,
                Name = x.Name,
                AddonCategoryId = x.AddonCategoryId
            };
        }

        [HttpGet]
        public ActionResult<IEnumerable<AddonItemDto>> Get()
        {
            return GetDtos().ToList();
        }

        private IQueryable<AddonItemDto> GetDtos()
        {
            return dataContext.Set<AddonItem>().Select(MapDto());
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<AddonItemDto> GetById(int id)
        {
            var result = dataContext
                .Set<AddonItem>()
                .Select(MapDto())
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
        public ActionResult<AddonItemDto> Update(int id, AddonItemDto item)
        {
            var entity = dataContext
                .Set<AddonItem>()
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
            entity.AddonCategoryId = item.AddonCategoryId;
            dataContext.SaveChanges();

            return new AddonItemDto
            {
                Id = entity.Id,
                Price = entity.Price,
                Description = entity.Description,
                Name = entity.Name,
                AddonCategoryId = entity.AddonCategoryId
            };
        }

        [HttpPost]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<AddonItemDto> Create(AddonItemDto AddonItem)
        {
            if (AddonItem.Price <= 0)
            {
                return BadRequest();
            }

            var item = dataContext
                .Set<AddonItem>()
                .Add(new AddonItem
                {
                    Description = AddonItem.Description,
                    Price = AddonItem.Price,
                    Name = AddonItem.Name,
                    AddonCategoryId = AddonItem.AddonCategoryId
                });

            dataContext.SaveChanges();
            AddonItem.Id = item.Entity.Id;

            return CreatedAtAction(nameof(GetById), new { id = AddonItem.Id }, AddonItem);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult Delete(int id)
        {
            var entity = dataContext
                .Set<AddonItem>()
                .FirstOrDefault(x => x.Id == id);
            if (entity == null)
            {
                return NotFound();
            }

            var anyOrdersWithItem = dataContext
                .Set<AddonOrderItem>()
                .Any(x => x.AddonItemId == id);

            if (anyOrdersWithItem)
            {
                return BadRequest();
            }

            dataContext.Set<AddonItem>().Remove(entity);
            dataContext.SaveChanges();

            return Ok();
        }
    }
}
