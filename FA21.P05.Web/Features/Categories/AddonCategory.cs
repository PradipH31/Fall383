using FA21.P05.Web.Features.AddonItems;
using FA21.P05.Web.Features.MenuItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.Categories
{
    public class AddonCategory
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public virtual ICollection<AddonItem> AddonItems { get; set; } = new List<AddonItem>();
        public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
    }
}
