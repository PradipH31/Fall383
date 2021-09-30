using System;
using System.Threading;
using System.Threading.Tasks;
using FA21.P05.Web.Data;
using FA21.P05.Web.Features.Identity;
using FA21.P05.Web.Features.MenuItems;
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
            using var scope = serviceProvider.CreateScope();

            await using var dataContext = scope.ServiceProvider.GetService<DataContext>() ?? throw new Exception("Missing DataContext");
            using var userManager = scope.ServiceProvider.GetService<UserManager<User>>() ?? throw new Exception("Missing UserManager<User>");
            using var roleManager = scope.ServiceProvider.GetService<RoleManager<Role>>() ?? throw new Exception("Missing RoleManager<Role>");

            var menuItems = dataContext.Set<MenuItem>();
            if (!await menuItems.AnyAsync(cancellationToken))
            {
                menuItems.AddRange(
                    new MenuItem
                    {
                        Name = "Pizza",
                        Description = "Pick your own toppings",
                        IsSpecial = true,
                        Price = 5.99m
                    },
                    new MenuItem
                    {
                        Name = "Salad",
                        Description = "Fresh greens",
                        Price = 10.99m
                    },
                    new MenuItem
                    {
                        Name = "Cereal",
                        Description = "Comes with optional Malk",
                        Price = 27.36m
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

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}