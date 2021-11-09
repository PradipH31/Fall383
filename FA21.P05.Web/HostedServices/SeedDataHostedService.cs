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
                addonItems.AddRange(
                  new AddonItem
                  {
                      Name = "Mayo",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Onion",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Relish",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Lettuce",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Ketchup",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Pickles",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Mustard",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Tomatoes",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "BBQ Sauce",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Hot Sauce",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  }, new AddonItem
                  {
                      Name = "Cheddar Cheese",
                      Price = 0.99m,
                      Description = "Make your burger premium",
                      AddonCategoryId = 2
                  }, new AddonItem
                  {
                      Name = "Mozzarella Cheese",
                      Price = 0.99m,
                      Description = "Make your burger premium",
                      AddonCategoryId = 2
                  }, new AddonItem
                  {
                      Name = "Provolone Cheese",
                      Price = 0.99m,
                      Description = "Make your burger premium",
                      AddonCategoryId = 2
                  },
                  new AddonItem
                  {
                      Name = "Avocado",
                      Price = 0.99m,
                      Description = "Make your burger premium",
                      AddonCategoryId = 2
                  },
                  new AddonItem
                  {
                      Name = "Fried Egg",
                      Price = 0.99m,
                      Description = "Make your burger premium",
                      AddonCategoryId = 2
                  },
                  new AddonItem
                  {
                      Name = "Extra Patty",
                      Price = 2.99m,
                      Description = "Make your burger premium",
                      AddonCategoryId = 2
                  },
                  new AddonItem
                  {
                      Name = "Bacon (2 slice)",
                      Price = 1.99m,
                      Description = "Make your burger premium",
                      AddonCategoryId = 2
                  },
                  new AddonItem
                  {
                      Name = "Extra Turkey Patty",
                      Price = 2.99m,
                      Description = "Make your burger premium",
                      AddonCategoryId = 2
                  },
                  new AddonItem
                  {
                      Name = "Grilled Onions",
                      Price = 0m,
                      AddonCategoryId = 2,
                      Description = "Make your burger more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Pepper",
                      Price = 0m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Garlic Drizzle",
                      Price = 0m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more deluxe"
                  },
                  new AddonItem
                  {
                      Name = "Small Grilled Chicken",
                      Price = 2.50m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Medium Grilled Chicken",
                      Price = 3.75m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Large Grilled Chicken",
                      Price = 4.50m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Small Pepperoni",
                      Price = 0.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Medium Pepperoni",
                      Price = 1.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Large Pepperoni",
                      Price = 2.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Small Cheddar Extra Cheese",
                      Price = 1.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Small Mozzarella Extra Cheese",
                      Price = 1.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Small Provolone Extra Cheese",
                      Price = 1.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Medium Cheddar Extra Cheese",
                      Price = 2.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Medium Mozzarella Extra Cheese",
                      Price = 2.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Medium Provolone Extra Cheese",
                      Price = 2.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Large Cheddar Extra Cheese",
                      Price = 3.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Large Mozzarella Extra Cheese",
                      Price = 3.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  },
                  new AddonItem
                  {
                      Name = "Large Provolone Extra Cheese",
                      Price = 3.99m,
                      AddonCategoryId = 3,
                      Description = "Make your pizza more premium"
                  }
                );
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

        private static void AddMenuItems(DbSet<MenuItem> menuItems)

        {
            menuItems.AddRange(
              new MenuItem
              {
                  Name = "Personal Pizza",
                  Price = 8.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 1,
                  IsSpecial = true,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Medium Pizza",
                  Price = 2.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 1,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Large Pizza",
                  Price = 8.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 1,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Mini Burger",
                  Price = 5.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 1,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Burger",
                  Price = 7.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 1,
                  IsSpecial = true,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Turkey Burger",
                  Price = 7.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 1,
                  AddonCategoryId = 1
              }, new MenuItem
              {
                  Name = "Bottled Water",
                  Price = 1.99m,
                  Description = "Chill",
                  MenuCategoryId = 2,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Medium Soda",
                  Price = 2.99m,
                  Description = "Chill",
                  MenuCategoryId = 2,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Large Soda",
                  Price = 3.99m,
                  Description = "Chill",
                  MenuCategoryId = 2,
                  IsSpecial = true,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Chocolate Milk Shake",
                  Price = 4.99m,
                  Description = "Chill",
                  MenuCategoryId = 2,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Strawberry Milk Shake",
                  Price = 4.99m,
                  Description = "Chill",
                  MenuCategoryId = 2,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Vanilla Milk Shake",
                  Price = 4.99m,
                  Description = "Chill",
                  MenuCategoryId = 2,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Fries",
                  Price = 3.99m,
                  MenuCategoryId = 3,
                  Description = "It's beside you",
                  IsSpecial = true,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Caesar Salad",
                  Price = 3.99m,
                  MenuCategoryId = 3,
                  Description = "It's beside you",
                  IsSpecial = true,
                  AddonCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Small Coleslaw",
                  Price = 1.99m,
                  MenuCategoryId = 3,
                  AddonCategoryId = 1,
                  Description = "It's beside you"
              }
            );
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}