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

            var categories = dataContext.Set<MenuCategory>();
            if (!await categories.AnyAsync(cancellationToken))
            {
                categories.AddRange(
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
                  },
                  new MenuCategory
                  {
                      Name = "Burger Addons",
                  },
                  new MenuCategory
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
                  MenuCategoryId = 2,
                  IsSpecial = true
              },
              new MenuItem
              {
                  Name = "Medium Pizza",
                  Price = 2.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Large Pizza",
                  Price = 8.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 3
              },
              new MenuItem
              {
                  Name = "Mini Burger",
                  Price = 5.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 1
              },
              new MenuItem
              {
                  Name = "Burger",
                  Price = 7.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 1,
                  IsSpecial = true
              },
              new MenuItem
              {
                  Name = "Turkey Burger",
                  Price = 7.99m,
                  Description = "Pick your own toppings",
                  MenuCategoryId = 1
              }, new MenuItem
              {
                  Name = "Bottled Water",
                  Price = 1.99m,
                  Description = "Chill",
                  MenuCategoryId = 2
              },
              new MenuItem
              {
                  Name = "Medium Soda",
                  Price = 2.99m,
                  Description = "Chill",
                  MenuCategoryId = 2
              },
              new MenuItem
              {
                  Name = "Large Soda",
                  Price = 3.99m,
                  Description = "Chill",
                  MenuCategoryId = 2,
                  IsSpecial = true
              },
              new MenuItem
              {
                  Name = "Chocolate Milk Shake",
                  Price = 4.99m,
                  Description = "Chill",
                  MenuCategoryId = 2
              },
              new MenuItem
              {
                  Name = "Strawberry Milk Shake",
                  Price = 4.99m,
                  Description = "Chill",
                  MenuCategoryId = 2
              },
              new MenuItem
              {
                  Name = "Vanilla Milk Shake",
                  Price = 4.99m,
                  Description = "Chill",
                  MenuCategoryId = 2
              },
              new MenuItem
              {
                  Name = "Fries",
                  Price = 3.99m,
                  MenuCategoryId = 3,
                  Description = "It's beside you",
                  IsSpecial = true
              },
              new MenuItem
              {
                  Name = "Caesar Salad",
                  Price = 3.99m,
                  MenuCategoryId = 3,
                  Description = "It's beside you",
                  IsSpecial = true
              },
              new MenuItem
              {
                  Name = "Small Coleslaw",
                  Price = 1.99m,
                  MenuCategoryId = 3,
                  Description = "It's beside you"
              },
              new MenuItem
              {
                  Name = "Mayo",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              },
              new MenuItem
              {
                  Name = "Onion",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              },
              new MenuItem
              {
                  Name = "Relish",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              },
              new MenuItem
              {
                  Name = "Lettuce",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              },
              new MenuItem
              {
                  Name = "Ketchup",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              },
              new MenuItem
              {
                  Name = "Pickles",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              },
              new MenuItem
              {
                  Name = "Mustard",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              },
              new MenuItem
              {
                  Name = "Tomatoes",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              },
              new MenuItem
              {
                  Name = "BBQ Sauce",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              },
              new MenuItem
              {
                  Name = "Hot Sauce",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              }, new MenuItem
              {
                  Name = "Cheddar Cheese",
                  Price = 0.99m,
                  Description = "Make your burger premium",
                  MenuCategoryId = 4
              }
              , new MenuItem
              {
                  Name = "Mozzarella Cheese",
                  Price = 0.99m,
                  Description = "Make your burger premium",
                  MenuCategoryId = 4
              }
              , new MenuItem
              {
                  Name = "Provolone Cheese",
                  Price = 0.99m,
                  Description = "Make your burger premium",
                  MenuCategoryId = 4
              },
              new MenuItem
              {
                  Name = "Avocado",
                  Price = 0.99m,
                  Description = "Make your burger premium",
                  MenuCategoryId = 4
              },
              new MenuItem
              {
                  Name = "Fried Egg",
                  Price = 0.99m,
                  Description = "Make your burger premium",
                  MenuCategoryId = 4
              },
              new MenuItem
              {
                  Name = "Extra Patty",
                  Price = 2.99m,
                  Description = "Make your burger premium",
                  MenuCategoryId = 4
              },
              new MenuItem
              {
                  Name = "Bacon (2 slice)",
                  Price = 1.99m,
                  Description = "Make your burger premium",
                  MenuCategoryId = 4
              },
              new MenuItem
              {
                  Name = "Extra Turkey Patty",
                  Price = 2.99m,
                  Description = "Make your burger premium",
                  MenuCategoryId = 4
              },
              new MenuItem
              {
                  Name = "Grilled Onions",
                  Price = 0m,
                  MenuCategoryId = 4,
                  Description = "Make your burger more deluxe"
              },
              new MenuItem
              {
                  Name = "Pepper",
                  Price = 0m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more deluxe"
              },
              new MenuItem
              {
                  Name = "Garlic Drizzle",
                  Price = 0m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more deluxe"
              },
              new MenuItem
              {
                  Name = "Small Grilled Chicken",
                  Price = 2.50m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Medium Grilled Chicken",
                  Price = 3.75m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Large Grilled Chicken",
                  Price = 4.50m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Small Pepperoni",
                  Price = 0.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Medium Pepperoni",
                  Price = 1.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Large Pepperoni",
                  Price = 2.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Small Cheddar Extra Cheese",
                  Price = 1.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Small Mozzarella Extra Cheese",
                  Price = 1.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Small Provolone Extra Cheese",
                  Price = 1.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Medium Cheddar Extra Cheese",
                  Price = 2.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Medium Mozzarella Extra Cheese",
                  Price = 2.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Medium Provolone Extra Cheese",
                  Price = 2.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Large Cheddar Extra Cheese",
                  Price = 3.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Large Mozzarella Extra Cheese",
                  Price = 3.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              },
              new MenuItem
              {
                  Name = "Large Provolone Extra Cheese",
                  Price = 3.99m,
                  MenuCategoryId = 5,
                  Description = "Make your pizza more premium"
              }
            );
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}