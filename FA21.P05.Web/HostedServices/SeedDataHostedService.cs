using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FA21.P05.Web.Data;
using FA21.P05.Web.Features.Identity;
using FA21.P05.Web.Features.MenuItems;
using FA21.P05.Web.Features.Categories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FA21.P05.Web.Features.AddonItems;

namespace FA21.P05.Web.HostedServices
{
    public class SeedDataHostedService : IHostedService
    {
        private readonly IServiceProvider serviceProvider;

        public SeedDataHostedService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using
            var scope = serviceProvider.CreateScope();

            await using
            var dataContext = scope.ServiceProvider.GetService<DataContext>() ??
              throw new Exception("Missing DataContext");
            using
            var userManager = scope.ServiceProvider.GetService<UserManager<User>>() ??
              throw new Exception("Missing UserManager<User>");
            using
            var roleManager = scope.ServiceProvider.GetService<RoleManager<Role>>() ??
              throw new Exception("Missing RoleManager<Role>");

            var menuCategories = dataContext.Set<MenuCategory>();
            if (!await menuCategories.AnyAsync(cancellationToken))
            {
                menuCategories.AddRange(
                  new MenuCategory
                  {
                      Name = "Entrees"
                  },
                  new MenuCategory
                  {
                      Name = "Drinks"
                  },
                  new MenuCategory
                  {
                      Name = "Sides"
                  }
                );
            }

            var addonCategories = dataContext.Set<AddonCategory>();
            if (!await addonCategories.AnyAsync(cancellationToken))
            {
                addonCategories.AddRange(
                  new AddonCategory
                  {
                      Name = "No Addons"
                  },
                  new AddonCategory
                  {
                      Name = "Burger Addons",
                  },
                  new AddonCategory
                  {
                      Name = "Pizza Addons",
                  }
                );
            }

            var menuItems = dataContext.Set<MenuItem>();
            if (!await menuItems.AnyAsync(cancellationToken))
            {
                AddMenuItems(menuItems);
            }

            var addonItems = dataContext.Set<AddonItem>();
            if (!await addonItems.AnyAsync(cancellationToken))
            {
                AddAddonItems(addonItems);
            }

            var anyRoles = await roleManager.Roles.AnyAsync(cancellationToken);
            if (!anyRoles)
            {
                await roleManager.CreateAsync(new Role
                {
                    Name = RoleNames.Admin
                });
                await roleManager.CreateAsync(new Role
                {
                    Name = RoleNames.Staff
                });
            }

            var anyUsers = await userManager.Users.AnyAsync(cancellationToken);
            if (!anyUsers)
            {
                const string defaultPassword = "Password123!";
                var adminUser = new User
                {
                    UserName = "galkadi"
                };
                await userManager.CreateAsync(adminUser, defaultPassword);
                await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

                var normalUser = new User
                {
                    UserName = "bob"
                };
                await userManager.CreateAsync(normalUser, defaultPassword);
                await userManager.AddToRoleAsync(normalUser, RoleNames.Staff);
            }

            await dataContext.SaveChangesAsync(cancellationToken);
        }

        public static void AddAddonItems(DbSet<AddonItem> addonItems)
        {
            addonItems.AddRange(
                  new AddonItem
                  {
                      Name = "Mayo",
                      Price = 0m,
                      AddonCategoryId = 2,
                      ImageLink= "https://cdnimg.webstaurantstore.com/images/products/large/274948/1246813.jpg",
                  },
                  new AddonItem
                  {
                      Name = "Onion",
                      Price = 0m,
                      AddonCategoryId = 2,
                      ImageLink= "https://www.theculinarycompass.com/wp-content/uploads/2020/07/Pickled-Red-Onion-Recipe-2-735x490.jpg.webp",
                  },
                  new AddonItem
                  {
                      Name = "Relish",
                      Price = 0m,
                      AddonCategoryId = 2,
                      ImageLink= "https://c0.wallpaperflare.com/preview/237/74/359/plant-moss-fruit-pineapple.jpg",
                  },
                  new AddonItem
                  {
                      Name = "Lettuce",
                      Price = 0m,
                      AddonCategoryId = 2,
                      ImageLink= "https://images.pexels.com/photos/102123/pexels-photo-102123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                  },
                  new AddonItem
                  {
                      Name = "Ketchup",
                      Price = 0m,
                      ImageLink= "https://ak.picdn.net/shutterstock/videos/30574309/thumb/1.jpg",
                      AddonCategoryId = 2,
                  },
                  new AddonItem
                  {
                      Name = "Pickles",
                      Price = 0m,
                      AddonCategoryId = 2,
                      ImageLink= "https://www.aspicyperspective.com/wp-content/uploads/2021/03/bread-and-butter-pickles-recipe-14-650x947.jpg",
                  },
                  new AddonItem
                  {
                      Name = "Mustard",
                      Price = 0m,
                      ImageLink= "https://m.media-amazon.com/images/I/81nheaG4pIS.jpg",
                      AddonCategoryId = 2,
                  },
                  new AddonItem
                  {
                      Name = "Tomatoes",
                      Price = 0m,
                      AddonCategoryId = 2,
                      ImageLink= "https://www.justalittlebitofbacon.com/wp-content/uploads/2016/08/tomato-gratin-1.jpg"
                  },
                  new AddonItem
                  {
                      Name = "BBQ Sauce",
                      Price = 0m,
                      AddonCategoryId = 2,
                      ImageLink= "https://m.media-amazon.com/images/I/61VS8X4uq9L._SL1500_.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Hot Sauce",
                      Price = 0m,
                      AddonCategoryId = 2,
                      ImageLink= "https://cdn1.bigcommerce.com/n-yp39j5/ysxlvs/products/4433/images/12527/939598__06220.1518623660.380.500.jpg?c=2"
                  }, 
                  new AddonItem
                  {
                      Name = "Cheddar Cheese",
                      Price = 0.99m,
                      AddonCategoryId = 2,
                      ImageLink= "https://cdn.shopify.com/s/files/1/0028/0235/2172/products/62172-1-1540_700x.png"
                  }, new AddonItem
                  {
                      Name = "Mozzarella Cheese",
                      Price = 0.99m,
                      AddonCategoryId = 2,
                      ImageLink= "https://cdn.shopify.com/s/files/1/0150/0232/products/Pearl_Valley_Mozzarella_Slices_99f3ce06-a72e-4510-9c95-d41ff2f5be38_720x.jpg?v=1620651241"
                  }, new AddonItem
                  {
                      Name = "Provolone Cheese",
                      Price = 0.99m,
                      AddonCategoryId = 2,
                      ImageLink= "https://www.pkuperspectives.com/images/products/secondary/kmaa1515csa-1.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Avocado",
                      Price = 0.99m,
                      AddonCategoryId = 2,
                      ImageLink= "https://www.buonapappa.net/wp-content/uploads/2015/07/green-beans-chicken-baby-food4.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Fried Egg",
                      Price = 0.99m,
                      AddonCategoryId = 2,
                      ImageLink= "https://wallpx.com/image/2021/06/sunny-side-up-fried-eggs-yolk.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Extra Patty",
                      Price = 2.99m,
                      AddonCategoryId = 2,
                      ImageLink= "https://i1.wp.com/topsecretrecipes.com/foodhackerblog/wp-content/uploads/2018/03/In-n-out-double-double_top.jpg?w=700&ssl=1"
                  },
                  new AddonItem
                  {
                      Name = "Bacon (2 slice)",
                      Price = 1.99m,
                      AddonCategoryId = 2,
                      ImageLink= "https://c4.wallpaperflare.com/wallpaper/979/129/209/bacon-wallpaper-preview.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Extra Turkey Patty",
                      Price = 2.99m,
                      AddonCategoryId = 2,
                      ImageLink= "https://therecipecritic.com/wp-content/uploads/2019/05/turkey_burger1-667x1000.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Grilled Onions",
                      Price = 0m,
                      AddonCategoryId = 2,
                      ImageLink= "https://www.foxandbriar.com/wp-content/uploads/2017/07/how-to-make-the-best-grilled-onions-5.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Pepper",
                      Price = 0m,
                      AddonCategoryId = 3,
                      ImageLink= "https://bbc.com.ng/file/2021/02/Garlic-herb-sauteed-bell-pepper-recipe.-Photo-The-Spruce-Eats-scaled-e1613844001451-960x540.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Garlic Drizzle",
                      Price = 0m,
                      AddonCategoryId = 3,
                      ImageLink= "https://asassyspoon.com/wp-content/uploads/2018/01/a-sassy-spoon-cilantro-garlic-sauce-recipe3.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Small Grilled Chicken",
                      Price = 2.50m,
                      AddonCategoryId = 3,
                      ImageLink= "https://insanelygoodrecipes.com/wp-content/uploads/2021/07/Grilled-Chicken-Breast-with-Vegetables-683x1024.webp"
                  },
                  new AddonItem
                  {
                      Name = "Medium Grilled Chicken",
                      Price = 3.75m,
                      AddonCategoryId = 3,
                      ImageLink= "https://insanelygoodrecipes.com/wp-content/uploads/2021/07/Grilled-Chicken-Breast-with-Vegetables-683x1024.webp"
                  },
                  new AddonItem
                  {
                      Name = "Large Grilled Chicken",
                      Price = 4.50m,
                      AddonCategoryId = 3,
                      ImageLink= "https://insanelygoodrecipes.com/wp-content/uploads/2021/07/Grilled-Chicken-Breast-with-Vegetables-683x1024.webp"
                  },
                  new AddonItem
                  {
                      Name = "Small Pepperoni",
                      Price = 0.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://www.teahub.io/photos/full/333-3331395_interpol-wallpaper.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Medium Pepperoni",
                      Price = 1.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://www.teahub.io/photos/full/333-3331395_interpol-wallpaper.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Large Pepperoni",
                      Price = 2.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://www.teahub.io/photos/full/333-3331395_interpol-wallpaper.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Small Cheddar Extra Cheese",
                      Price = 1.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://cdn.shopify.com/s/files/1/0028/0235/2172/products/62172-1-1540_700x.png"
                  },
                  new AddonItem
                  {
                      Name = "Small Mozzarella Extra Cheese",
                      Price = 1.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://cdn.shopify.com/s/files/1/0150/0232/products/Pearl_Valley_Mozzarella_Slices_99f3ce06-a72e-4510-9c95-d41ff2f5be38_720x.jpg?v=1620651241"
                  },
                  new AddonItem
                  {
                      Name = "Small Provolone Extra Cheese",
                      Price = 1.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://www.pkuperspectives.com/images/products/secondary/kmaa1515csa-1.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Medium Cheddar Extra Cheese",
                      Price = 2.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://cdn.shopify.com/s/files/1/0028/0235/2172/products/62172-1-1540_700x.png"
                  },
                  new AddonItem
                  {
                      Name = "Medium Mozzarella Extra Cheese",
                      Price = 2.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://cdn.shopify.com/s/files/1/0150/0232/products/Pearl_Valley_Mozzarella_Slices_99f3ce06-a72e-4510-9c95-d41ff2f5be38_720x.jpg?v=1620651241"
                  },
                  new AddonItem
                  {
                      Name = "Medium Provolone Extra Cheese",
                      Price = 2.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://www.pkuperspectives.com/images/products/secondary/kmaa1515csa-1.jpg"
                  },
                  new AddonItem
                  {
                      Name = "Large Cheddar Extra Cheese",
                      Price = 3.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://cdn.shopify.com/s/files/1/0028/0235/2172/products/62172-1-1540_700x.png"
                  },
                  new AddonItem
                  {
                      Name = "Large Mozzarella Extra Cheese",
                      Price = 3.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://cdn.shopify.com/s/files/1/0150/0232/products/Pearl_Valley_Mozzarella_Slices_99f3ce06-a72e-4510-9c95-d41ff2f5be38_720x.jpg?v=1620651241"
                  },
                  new AddonItem
                  {
                      Name = "Large Provolone Extra Cheese",
                      Price = 3.99m,
                      AddonCategoryId = 3,
                      ImageLink= "https://www.pkuperspectives.com/images/products/secondary/kmaa1515csa-1.jpg"
                  }
                );
        }

        private static void AddMenuItems(DbSet<MenuItem> menuItems)

        {
            menuItems.AddRange(
              new MenuItem
              {
                  Name = "Personal Pizza",
                  Price = 8.99m,
                  Description = "Luscious pizza with a tangy sauce",
                  MenuCategoryId = 1,
                  IsSpecial = true,
                  ImageLink = "https://wallpaperaccess.com/full/424516.jpg",
                  AddonCategoryId = 3
              },
              new MenuItem
              {
                  Name = "Medium Pizza",
                  Price = 2.99m,
                  Description = "Luscious pizza with a tangy sauce",
                  MenuCategoryId = 1,
                  ImageLink = "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2021%2F06%2F15%2Fmozzarella-pizza-margherita-FT-RECIPE0621.jpg",
                  AddonCategoryId = 3
              },
              new MenuItem
              {
                  Name = "Large Pizza",
                  Price = 8.99m,
                  Description = "Pick your own toppings",
                  ImageLink = "https://image.freepik.com/free-photo/pepperoni-pizza-with-mushrooms-table_140725-997.jpg",
                  MenuCategoryId = 1,
                  AddonCategoryId = 3
              },
              new MenuItem
              {
                  Name = "Mini Burger",
                  Price = 5.99m,
                  Description = "A classic, perfected burger with buttered bun",
                  ImageLink = "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                  MenuCategoryId = 1,
                  AddonCategoryId = 2
              },
              new MenuItem
              {
                  Name = "Burger",
                  Price = 7.99m,
                  Description = "A classic, perfected burger with buttered bun",
                  MenuCategoryId = 1,
                  IsSpecial = true,
                  ImageLink = "https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                  AddonCategoryId = 2
              },
              new MenuItem
              {
                  Name = "Turkey Burger",
                  Price = 7.99m,
                  Description = "A classic, perfected burger with buttered bun",
                  MenuCategoryId = 1,
                  AddonCategoryId = 2,
                  ImageLink = "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_03/1401615/anne-burrell-killer-turkey-burger-today-main-today-190114-02.jpg",
              }, new MenuItem
              {
                  Name = "Bottled Water",
                  Price = 1.99m,
                  Description = "Purified bottle of water",
                  MenuCategoryId = 2,
                  ImageLink = "https://cdn.abcotvs.com/dip/images/3718644_070618-cc-ss-water-bottle-warning-img.jpg",
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Medium Soda",
                  Price = 2.99m,
                  Description = "A refreshing can of your favorite soda",
                  MenuCategoryId = 2,
                  ImageLink = "https://img.wallpapic.com/i1810-629-93/thumb/drinks-soft-drink-cocktail-food-wallpaper.jpg",
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Large Soda",
                  Price = 3.99m,
                  Description = "A refreshing can of your favorite soda",
                  MenuCategoryId = 2,
                  IsSpecial = true,
                  ImageLink = "https://c0.wallpaperflare.com/preview/647/595/624/beverages-carbonated-drink-cold-drink-colorful.jpg",
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Chocolate Milk Shake",
                  Price = 4.99m,
                  Description = "A classic chocolate dessert, topped with whipped cream and a cherry",
                  MenuCategoryId = 2,
                  ImageLink = "https://www.mashed.com/img/gallery/chocolate-milkshake/l-intro-1620929808.jpg",
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Strawberry Milk Shake",
                  Price = 4.99m,
                  Description = "A classic strawberry dessert, topped with whipped cream and a cherry",
                  MenuCategoryId = 2,
                  ImageLink = "https://c4.wallpaperflare.com/wallpaper/147/926/442/strawberry-milkshake-wallpaper-preview.jpg",
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Vanilla Milk Shake",
                  Price = 4.99m,
                  Description = "A classic vanilla dessert, topped with whipped cream and a cherry",
                  MenuCategoryId = 2,
                  ImageLink = "https://w0.peakpx.com/wallpaper/867/793/HD-wallpaper-milkshakes-milk-food-milkshake-sweet.jpg",
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Fries",
                  Price = 3.99m,
                  MenuCategoryId = 3,
                  Description = "Don't let your main dish be lonely",
                  IsSpecial = true,
                  ImageLink = "https://img5.goodfon.com/original/1920x1080/4/b9/fried-potatoes-french-fries-yellow.jpg",
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Caesar Salad",
                  Price = 3.99m,
                  MenuCategoryId = 3,
                  Description = "Don't let your main dish be lonely",
                  ImageLink = "https://wallpapercave.com/wp/wp2170726.jpg",
                  IsSpecial = true,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Small Coleslaw",
                  Price = 1.99m,
                  MenuCategoryId = 3,
                  AddonCategoryId = 1,
                  ImageLink = "https://c0.wallpaperflare.com/preview/501/485/111/food-and-drink-salad-salads.jpg",
                  Description = "Don't let your main dish be lonely"
              }
            );
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}