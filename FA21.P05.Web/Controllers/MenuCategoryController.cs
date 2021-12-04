using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FA21.P05.Web.Data;
using FA21.P05.Web.Features.Identity;
using FA21.P05.Web.Features.MenuItems;
using FA21.P05.Web.Features.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FA21.P05.Web.Controllers
{
    [ApiController]
    [Route("api/menu-categories")]
    public class MenuCategoryController : ControllerBase
    {
        private readonly DataContext dataContext;

        public MenuCategoryController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        private static Expression<Func<MenuCategory, MenuCategoryDto>> MapDto()
        {
            return x => new MenuCategoryDto
            {
                Id = x.Id,
                Name = x.Name
            };
        }

        [HttpGet]
        public ActionResult<IEnumerable<MenuCategoryDto>> Get()
        {
            return GetDtos().ToList();
        }

        private IQueryable<MenuCategoryDto> GetDtos()
        {
            return dataContext.Set<MenuCategory>().Select(MapDto());
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<MenuCategoryDto> GetById(int id)
        {
            var result = dataContext
                .Set<MenuCategory>()
                .Select(MapDtoWithMenuItems()
                )
                .FirstOrDefault(x => x.Id == id);
            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        private static Expression<Func<MenuCategory, MenuCategoryDto>> MapDtoWithMenuItems()
        {
            return x => new MenuCategoryDto
            {
                Id = x.Id,
                Name = x.Name,
                MenuItems = x.MenuItems.Select(y => new MenuItemDto
                {
                    Id = y.Id,
                    Name = y.Name,
                    MenuCategoryId = y.MenuCategoryId,
                    Description = y.Description,
                    IsSpecial = y.IsSpecial,
                    Price = y.Price,
                    AddonCategoryId = y.AddonCategoryId,
                    ImageLink = y.ImageLink
                })
            };
        }

        [HttpPut]
        [Authorize(Roles = RoleNames.StaffOrAdmin)]
        [Route("{id}")]
        public ActionResult<MenuCategoryDto> Update(int id, MenuCategoryDto item)
        {
            var entity = dataContext
                .Set<MenuCategory>()
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

            return new MenuCategoryDto
            {
                Id = entity.Id,
                Name = entity.Name
            };
        }

        [HttpPost]
        // [Authorize(Roles = RoleNames.StaffOrAdmin)]
        public ActionResult<MenuCategoryDto> Create(MenuCategoryDto Category)
        {
            if (Category.Name.Equals(""))
            {
                return BadRequest();
            }

            var item = dataContext
                .Set<MenuCategory>()
                .Add(new MenuCategory
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
                .Set<MenuCategory>()
                .FirstOrDefault(x => x.Id == id);
            if (entity == null)
            {
                return NotFound();
            }

            var anyItemWithCategory = dataContext
                .Set<MenuItem>()
                .Any(x => x.MenuCategoryId == id);

            if (anyItemWithCategory)
            {
                return BadRequest();
            }

            dataContext.Set<MenuCategory>().Remove(entity);
            dataContext.SaveChanges();

            return Ok();
        }
    }
}
