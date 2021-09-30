using System.ComponentModel.DataAnnotations;

namespace FA21.P05.Web.Features.Identity
{
    public class UserLoginDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}