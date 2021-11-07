using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.MenuItems.Categories
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual IEnumerable<MenuItemDto>? MenuItems { get; set; } = new List<MenuItemDto>();

    }
}
