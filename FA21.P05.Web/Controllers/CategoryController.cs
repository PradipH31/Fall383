using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FA21.P05.Web.Data;
using FA21.P05.Web.Features.Identity;
using FA21.P05.Web.Features.MenuItems;
using FA21.P05.Web.Features.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FA21.P05.Web.Controllers
{
    [Authorize(Roles = RoleNames.Admin)]
    [ApiController]
    [Route("api/categories")]
    public class CategoryController : ControllerBase
    {
        private readonly DataContext dataContext;

        public CategoryController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        private static Expression<Func<Category, CategoryDto>> MapDto()
        {
            return x => new CategoryDto
            {
                Id = x.Id,
                Name = x.Name
            };
        }

        [HttpGet]
        public ActionResult<IEnumerable<CategoryDto>> Get()
        {
            return GetDtos().ToList();
        }

        private IQueryable<CategoryDto> GetDtos()
        {
            return dataContext.Set<Category>().Select(MapDto());
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<CategoryDto> GetById(int id)
        {
            var result = dataContext
                .Set<Category>()
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
        public ActionResult<CategoryDto> Update(int id, CategoryDto item)
        {
            var entity = dataContext
                .Set<Category>()
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

            return new CategoryDto
            {
                Id = entity.Id,
                Name = entity.Name
            };
        }

        [HttpPost]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<CategoryDto> Create(CategoryDto Category)
        {
            if (Category.Name.Equals(""))
            {
                return BadRequest();
            }

            var item = dataContext
                .Set<Category>()
                .Add(new Category
                {
                    Name = Category.Name
                });

            dataContext.SaveChanges();
            Category.Id = item.Entity.Id;

            return CreatedAtAction(nameof(GetById), new { id = Category.Id }, Category);
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Delete(int id)
        {
            var entity = dataContext
                .Set<Category>()
                .FirstOrDefault(x => x.Id == id);
            if (entity == null)
            {
                return NotFound();
            }

            var anyItemWithCategory = dataContext
                .Set<MenuItem>()
                .Any(x => x.CategoryId == id);

            if (anyItemWithCategory)
            {
                return BadRequest();
            }

            dataContext.Set<Category>().Remove(entity);
            dataContext.SaveChanges();

            return Ok();
        }
    }
}
