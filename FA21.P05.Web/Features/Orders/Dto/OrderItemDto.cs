using FA21.P05.Web.Features.Orders.Addon.Dto;
using System.Collections.Generic;

namespace FA21.P05.Web.Features.Orders.Dto
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int MenuItemId { get; set; }
        public decimal LineItemPrice { get; set; }
        public int LineItemQuantity { get; set; }
        public decimal LineItemTotal { get; set; }
        public int? AddonOrderId { get; set; }
        public IEnumerable<AddonOrderItemDto> AddonOrderItems { get; set; } = new List<AddonOrderItemDto>();
    }
}