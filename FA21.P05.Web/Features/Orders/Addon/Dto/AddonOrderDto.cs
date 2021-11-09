using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.Orders.Addon.Dto
{
    public class AddonOrderDto
    {
        public int Id { get; set; }
        public IEnumerable<AddonOrderItemDto> AddonOrderItems { get; set; } = new List<AddonOrderItemDto>();
        public decimal OrderTotal { get; set; }
    }
}
