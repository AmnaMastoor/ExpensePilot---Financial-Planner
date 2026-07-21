using ExpensePilot.API.DTOs;
using ExpensePilot.API.Models;
using ExpensePilot.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ExpensePilot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly TokenService _tokenService;

        public AuthController(UserManager<ApplicationUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
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


            var token = _tokenService.CreateToken(user);


            return Ok(new
            {
                token
            });
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile()
        {
            return Ok(new
            {
                message = "You are authenticated"
            });
        }
    }
}