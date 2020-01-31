using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Models.Domain;
using Api.Models.Requests;
using Api.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("api/test")]
        public IActionResult Test()
        {
            return new JsonResult(new {test = "test"});
        }

        [Authorize]
        [HttpGet("api/test1")]
        public IActionResult Test1()
        {
            var test = User.Claims.FirstOrDefault(x => x.Type.Equals("UserName"));
            return Ok(new { test = test.Value });
        }

        [HttpPost("api/user/register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        { 
            string hashedPassword = PasswordHashService.HashPassword(request.Password);
            var user = new User
            {
                Email = request.Email,
                UserName = request.UserName,
                Password = hashedPassword
            };

            User registeredUser = await _userService.RegisterAsync(user);

            if (registeredUser != null)
            {
                ClaimsPrincipal claimsPrincipal = _userService.CreateClaimsPrinciple(user);
                await Request.HttpContext.SignInAsync("Cookies", claimsPrincipal);
                return Ok(new { test = "test" });
            }

            return BadRequest();
        }

        [HttpPost("api/user/login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            User user = await _userService.VerifyLoginAsync(request.Email, request.Password);
            if (user != null)
            {
                ClaimsPrincipal claimsPrincipal = _userService.CreateClaimsPrinciple(user);
                await Request.HttpContext.SignInAsync(
                    "Cookies",
                    claimsPrincipal,
                    new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.UtcNow.AddDays(90),
                        IsPersistent = true
                    });
                return Ok(new {userId = user.Id, userName = user.UserName});
            }

            return BadRequest();
        }

        [Authorize]
        [HttpPost("api/user/auth")]
        public IActionResult Auth()
        {
            var userId = Request.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserId")?.Value;
            var userName = Request.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "UserName")?.Value;
            return Ok(new {userId, userName});
        }

        [HttpPost("api/user/logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("Cookies");
            return NoContent();
        }
    } 
}
