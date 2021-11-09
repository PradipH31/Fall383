using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.Orders.Addon.Dto
{
    public class AddonOrderItemDto
    {
        public int Id { get; set; }
        public int AddonItemId { get; set; }
        public decimal LineItemTotal { get; set; }
    }
}
