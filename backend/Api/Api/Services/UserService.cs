using System.Security.Claims;
using System.Threading.Tasks;
using Api.Data;
using Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _dataContext;

        public UserService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User> RegisterAsync(User user)
        {
            var registeredUser = await _dataContext.Users.AddAsync(user);
            var registered = await _dataContext.SaveChangesAsync();
            if (registered > 0)
            {
                return registeredUser.Entity;
            }

            return null;
        }

        public async Task<User> VerifyLoginAsync(string email, string password)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Email.Equals(email));
            if (user != null && PasswordHashService.ValidatePassword(password, user.Password))
            {
                return user;
            }

            return null;
        }

        public ClaimsPrincipal CreateClaimsPrinciple(User user)
        {
            var claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim("UserName", user.UserName),
            }, "Cookies");

            return new ClaimsPrincipal(claimsIdentity);
        }
    }
}
