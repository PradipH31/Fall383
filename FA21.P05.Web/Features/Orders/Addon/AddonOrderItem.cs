using FA21.P05.Web.Features.AddonItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.Orders.Addon
{
    public class AddonOrderItem
    {
        public int Id { get; set; }
        public decimal AddonItemPrice { get; set; }
        public int AddonItemId { get; set; }
        public virtual AddonItem AddonItem { get; set; }
        public int OrderItemId { get; set; }
        public virtual OrderItem Order { get; set; }
    }
}
