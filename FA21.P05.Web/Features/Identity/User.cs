using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace FA21.P05.Web.Features.Identity
{
    public class User : IdentityUser<int>
    {
        public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();
    }
}