using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.Orders.Addon.Dto
{
    public class CreateAddonOrderItemDto
    {
        //[Range(1, int.MaxValue)]
        //public int AddonItemQuantity { get; set; }

        public int AddonItemId { get; set; }
    }
}
