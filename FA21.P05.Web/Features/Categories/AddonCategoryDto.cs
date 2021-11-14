﻿using FA21.P05.Web.Features.AddonItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.Categories
{
    public class AddonCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual IEnumerable<AddonItemDto> AddonItemDtos { get; set; } = new List<AddonItemDto>();
    }
}