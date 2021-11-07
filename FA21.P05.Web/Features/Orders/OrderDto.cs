using System;
using System.Collections.Generic;

namespace FA21.P05.Web.Features.Orders
{
    public class OrderDto
    {
        public int Id { get; set; }
        public IEnumerable<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
        public decimal OrderTotal { get; set; }
        public DateTimeOffset Placed { get; set; }
        public DateTimeOffset? Started { get; set; }
        public DateTimeOffset? Canceled { get; set; }
        public bool IsDelivery { get; set; }
        public String? DeliveryAddress { get; set; }
    }
}