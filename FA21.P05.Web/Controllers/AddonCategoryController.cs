using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FA21.P05.Web.Data;
using FA21.P05.Web.Features.Identity;
using FA21.P05.Web.Features.AddonItems;
using FA21.P05.Web.Features.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FA21.P05.Web.Controllers
{
    [ApiController]
    [Route("api/addon-categories")]
    public class AddonCategoryController : ControllerBase
    {
        private readonly DataContext dataContext;

        public AddonCategoryController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        private static Expression<Func<AddonCategory, AddonCategoryDto>> MapDto()
        {
            return x => new AddonCategoryDto
            {
                Id = x.Id,
                Name = x.Name
            };
        }

        [HttpGet]
        public ActionResult<IEnumerable<AddonCategoryDto>> Get()
        {
            return GetDtos().ToList();
        }

        private IQueryable<AddonCategoryDto> GetDtos()
        {
            return dataContext.Set<AddonCategory>().Select(MapDto());
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<AddonCategoryDto> GetById(int id)
        {
            var result = dataContext
                .Set<AddonCategory>()
                .Select(MapDtoWithAddonItems()
                )
                .FirstOrDefault(x => x.Id == id);
            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        private static Expression<Func<AddonCategory, AddonCategoryDto>> MapDtoWithAddonItems()
        {
            return x => new AddonCategoryDto
            {
                Id = x.Id,
                Name = x.Name,
                AddonItemDtos = x.AddonItems.Select(y => new AddonItemDto
                {
                    Id = y.Id,
                    Name = y.Name,
                    AddonCategoryId = y.AddonCategoryId,
                    Price = y.Price,
                    ImageLink = y.ImageLink
                })
            };
        }

        [HttpPut]
        [Authorize(Roles = RoleNames.StaffOrAdmin)]
        [Route("{id}")]
        public ActionResult<AddonCategoryDto> Update(int id, AddonCategoryDto item)
        {
            var entity = dataContext
                .Set<AddonCategory>()
                .FirstOrDefault(x => x.Id == id);
            if (entity == null)
            {
                return NotFound();
            }

            if (item.Name.Equals(""))
            {
                return BadRequest();
            }

            entity.Name = item.Name;
            dataContext.SaveChanges();

            return new AddonCategoryDto
            {
                Id = entity.Id,
                Name = entity.Name
            };
        }

        [HttpPost]
        [Authorize(Roles = RoleNames.StaffOrAdmin)]
        public ActionResult<AddonCategoryDto> Create(AddonCategoryDto Category)
        {
            if (Category.Name.Equals(""))
            {
                return BadRequest();
            }

            var item = dataContext
                .Set<AddonCategory>()
                .Add(new AddonCategory
                {
                    Name = Category.Name
                });

            dataContext.SaveChanges();
            Category.Id = item.Entity.Id;

            return CreatedAtAction(nameof(GetById), new { id = Category.Id }, Category);
        }

        [HttpDelete]
        [Authorize(Roles = RoleNames.Admin)]
        [Route("{id}")]
        public ActionResult Delete(int id)
        {
            var entity = dataContext
                .Set<AddonCategory>()
                .FirstOrDefault(x => x.Id == id);
            if (entity == null)
            {
                return NotFound();
            }

            var anyItemWithCategory = dataContext
                .Set<AddonItem>()
                .Any(x => x.AddonCategoryId == id);

            if (anyItemWithCategory)
            {
                return BadRequest();
            }

            dataContext.Set<AddonCategory>().Remove(entity);
            dataContext.SaveChanges();

            return Ok();
        }
    }
}
