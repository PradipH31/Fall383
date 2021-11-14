using FA21.P05.Web.Features.MenuItems;
using FA21.P05.Web.Features.Orders.Addon;
using System.Collections.Generic;

namespace FA21.P05.Web.Features.Orders
{
    public class OrderItem
    {
        public int Id { get; set; }
        //public int LineItemQuantity { get; set; }
        public decimal AddonItemTotal { get; set; }
        public decimal LineItemTotal { get; set; }
        public int MenuItemQuantity { get; set; }
        public decimal MenuItemPrice { get; set; }
        public decimal MenuItemTotal { get; set; }

        public int MenuItemId { get; set; }
        public virtual MenuItem MenuItem { get; set; }
        public virtual ICollection<AddonOrderItem> AddonOrderItems { get; set; } = new List<AddonOrderItem>();

        public int OrderId { get; set; }
        public virtual Order Order { get; set; }
    }
}