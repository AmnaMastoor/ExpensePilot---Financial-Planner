using ExpensePilot.API.DTO.Auth;
using ExpensePilot.API.Models;
using ExpensePilot.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ExpensePilot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly TokenService _tokenService;

        public AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, 
        TokenService tokenService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto request)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.Email);

            if (existingUser != null)
            {
                return BadRequest(new
                {
                    message = "Email already exists"
                });
            }


            var user = new ApplicationUser
            {
                UserName = request.Email,
                Email = request.Email,
                FullName = request.FullName
            };


            var result = await _userManager.CreateAsync(
                user,
                request.Password
            );


            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            if (!await _roleManager.RoleExistsAsync("User"))
            {
                await _roleManager.CreateAsync(new IdentityRole("User"));
            }

            await _userManager.AddToRoleAsync(user, "User");

            return Ok(new
            {
                message = "User registered successfully"
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid credentials"
                });
            }


            var passwordValid = await _userManager.CheckPasswordAsync(
                user,
                request.Password
            );


            if (!passwordValid)
            {
                return Unauthorized(new
                {
                    message = "Invalid credentials"
                });
            }

            var token = await _tokenService.CreateToken(user);

            return Ok(new
            {
                token
            });
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> Profile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound();


            return Ok(new
            {
                name = user.FullName,
                email = user.Email
            });
        }
    }
}