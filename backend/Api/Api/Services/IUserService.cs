using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models.Domain;

namespace Api.Services
{
    public interface IUserService
    {
        public Task<User> RegisterAsync(User user);

        public Task<User> VerifyLoginAsync(string email, string password);

        public ClaimsPrincipal CreateClaimsPrinciple(User user);
    }
}
