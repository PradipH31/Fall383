using FA21.P05.Web.Features.MenuItems;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.Categories
{
    public class MenuCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
    }
}
