using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.Orders.Addon
{
    public class AddonOrder
    {
        public int Id { get; set; }
        public decimal OrderTotal { get; set; }
        public virtual ICollection<AddonOrderItem> AddonOrderItems { get; set; } = new List<AddonOrderItem>();
    }
}
