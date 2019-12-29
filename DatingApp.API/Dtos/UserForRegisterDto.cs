using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }
        
         [Required]
         [StringLength(8, MinimumLength=4, ErrorMessage="Hasło musi posiada od 4 do 8 znaków")]
        public string Password { get; set; }
    }
}