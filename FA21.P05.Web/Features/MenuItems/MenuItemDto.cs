﻿using FA21.P05.Web.Features.AddonItems;
using FA21.P05.Web.Features.Categories;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FA21.P05.Web.Features.MenuItems
{
    public class MenuItemDto
    {
        public int Id { get; set; }
        [Required, MaxLength(120)]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public string ImageLink { get; set; }
        public decimal Price { get; set; }
        public int MenuCategoryId { get; set; }
        public int AddonCategoryId { get; set; }
        public virtual AddonCategoryDto AddonCategory { get; set; }
        public bool IsSpecial { get; set; }
    }
}