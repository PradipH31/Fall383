using FA21.P05.Web.Features.Orders.Addon.Dto;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FA21.P05.Web.Features.Orders.Dto
{
    public class CreateOrderItemDto
    {
        [Range(1, int.MaxValue)]
        public int LineItemQuantity { get; set; }

        public int MenuItemId { get; set; }
        public IEnumerable<CreateAddonOrderItemDto> AddonOrderItemsDto { get; set; } = new List<CreateAddonOrderItemDto>();
    }
}