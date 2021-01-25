using Microsoft.AspNetCore.Http;

namespace aspnetcore.Controllers.Resources
{
    public class AccountQueryRequest : BaseQueryRequest
    {
        public int? ID { get; set; }
        public string Username { get; set; }
        public AccountQueryRequest()
        {
            ID = null;
        }
    }

    public class AccountAuthenticateRequest
    {
        public string Username { get; set; }
        public string Sha1Pass { get; set; }
    }

    public class AccountCreateRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }            
        public string Email { get; set; }    
        public string Name { get; set; }
    }

     public class UserInfoUpdateRequest
    {
        public int IDaccount { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? About { get; set; }
        public IFormFile Image { get; set; }
        public UserInfoUpdateRequest()
        {
            Address = null;
            Phone = null;
            About = null;
            Image = null;
        }
    }

}