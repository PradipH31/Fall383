using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.Orders.Addon.Dto
{
    public class CreateAddonOrderDto
    {
        public List<CreateAddonOrderItemDto> OrderItems { get; set; } = new List<CreateAddonOrderItemDto>();
    }
}
