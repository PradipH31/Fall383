﻿using FA21.P05.Web.Features.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FA21.P05.Web.Features.AddonItems
{
    public class AddonItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageLink { get; set; }
        public decimal Price { get; set; }
        public int AddonCategoryId { get; set; }
    }
}