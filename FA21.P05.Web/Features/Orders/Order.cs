using System;
using System.Collections.Generic;

namespace FA21.P05.Web.Features.Orders
{
    public class Order
    {
        public int Id { get; set; }
        public decimal OrderTotal { get; set; }
        public DateTimeOffset Placed { get; set; }
        public DateTimeOffset? Started { get; set; }
        public DateTimeOffset? Canceled { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}