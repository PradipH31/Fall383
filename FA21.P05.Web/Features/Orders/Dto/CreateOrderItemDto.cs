using System.ComponentModel.DataAnnotations;

namespace FA21.P05.Web.Features.Orders.Dto
{
    public class CreateOrderItemDto
    {
        [Range(1, int.MaxValue)]
        public int LineItemQuantity { get; set; }

        public int MenuItemId { get; set; }
        public int? AddonOrderId { get; set; }
    }
}