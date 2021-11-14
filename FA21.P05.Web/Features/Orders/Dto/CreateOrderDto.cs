using System.Collections.Generic;

namespace FA21.P05.Web.Features.Orders.Dto
{
    public class CreateOrderDto
    {
        public List<CreateOrderItemDto> OrderItems { get; set; } = new List<CreateOrderItemDto>();
    }
}