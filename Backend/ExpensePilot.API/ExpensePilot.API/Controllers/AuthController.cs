using ExpensePilot.API.DTO.Auth;
using ExpensePilot.API.Models;
using ExpensePilot.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Google.Apis.Auth;

namespace ExpensePilot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;

        public AuthController(
    UserManager<ApplicationUser> userManager,
    RoleManager<IdentityRole> roleManager,
    TokenService tokenService,
    IConfiguration configuration,
    EmailService emailService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _configuration = configuration;
            _emailService = emailService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto request)
        {
            if (string.IsNullOrWhiteSpace(request.FullName))
            {
                return BadRequest(new
                {
                    message = "Full name is required."
                });
            }


            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new
                {
                    message = "Email is required."
                });
            }


            if (string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message = "Password is required."
                });
            }


            var existingUser = await _userManager.FindByEmailAsync(request.Email);



            var user = new ApplicationUser
            {
                UserName = request.Email,
                Email = request.Email,
                FullName = request.FullName,
                EmailConfirmed = false
            };


            var result = await _userManager.CreateAsync(
                user,
                request.Password
            );


            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = string.Join(
                        " ",
                        result.Errors.Select(e => e.Description)
                    )
                });
            }


            if (!await _roleManager.RoleExistsAsync("User"))
            {
                await _roleManager.CreateAsync(
                    new IdentityRole("User")
                );
            }


            await _userManager.AddToRoleAsync(
                user,
                "User"
            );


            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);


            var confirmationLink =
                $"http://localhost:5173/verify-email?userId={user.Id}&token={Uri.EscapeDataString(token)}";


            await _emailService.SendEmailAsync(
                user.Email,
                "Verify your ExpensePilot account",
                $@"
        <h2>Welcome to ExpensePilot 🚀</h2>

        <p>Hello {user.FullName},</p>

        <p>
            Thanks for creating your account.
            Please verify your email address to activate your account.
        </p>

        <a href='{confirmationLink}'
        style='
        display:inline-block;
        padding:12px 20px;
        background:#4F46E5;
        color:white;
        text-decoration:none;
        border-radius:8px;
        '>
            Verify Email
        </a>

        <p>
            If you did not create this account, ignore this email.
        </p>
        "
            );


            return Ok(new
            {
                message = "Registration successful. Please verify your email."
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new
                {
                    message = "Email is required."
                });
            }


            if (string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message = "Password is required."
                });
            }


            var user = await _userManager.FindByEmailAsync(request.Email);


            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }


            if (!user.EmailConfirmed)
            {
                return Unauthorized(new
                {
                    code = "EMAIL_NOT_VERIFIED",
                    message = "Please verify your email first."
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
                    message = "Invalid email or password."
                });
            }


            var token = await _tokenService.CreateToken(user);


            return Ok(new
            {
                message = "Login successful.",
                token
            });
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin(GoogleLoginDto request)
        {
            GoogleJsonWebSignature.Payload payload;

            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[]
                    {
                _configuration["Google:ClientId"]
            }
                };


                payload = await GoogleJsonWebSignature.ValidateAsync(
                    request.IdToken,
                    settings
                );
            }
            catch
            {
                return BadRequest(new
                {
                    message = "Invalid Google token."
                });
            }


            var user = await _userManager.FindByEmailAsync(payload.Email);


            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = payload.Email,
                    Email = payload.Email,
                    FullName = payload.Name,
                    EmailConfirmed = true
                };


                var result = await _userManager.CreateAsync(user);


                if (!result.Succeeded)
                {
                    return BadRequest(new
                    {
                        message = string.Join(
                            " ",
                            result.Errors.Select(e => e.Description)
                        )
                    });
                }


                if (!await _roleManager.RoleExistsAsync("User"))
                {
                    await _roleManager.CreateAsync(
                        new IdentityRole("User")
                    );
                }


                await _userManager.AddToRoleAsync(
                    user,
                    "User"
                );
            }


            else
            {
                // Existing normal account check

                if (!user.EmailConfirmed)
                {
                    user.EmailConfirmed = true;

                    await _userManager.UpdateAsync(user);
                }
            }


            var token = await _tokenService.CreateToken(user);


            return Ok(new
            {
                message = "Google login successful.",
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

        [HttpGet("test-email")]
        public async Task<IActionResult> TestEmail(
    [FromServices] EmailService emailService)
        {
            await emailService.SendEmailAsync(
                "noumansaeed977@gmail.com",
                "ExpensePilot Test",
                "<h1>Email Working 🚀</h1>"
            );

            return Ok("Email sent");
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(
    string userId,
    string token)
        {
            if (string.IsNullOrWhiteSpace(userId) ||
                string.IsNullOrWhiteSpace(token))
            {
                return BadRequest(new
                {
                    message = "Invalid verification link."
                });
            }


            var user = await _userManager.FindByIdAsync(userId);


            if (user == null)
            {
                return BadRequest(new
                {
                    message = "User not found."
                });
            }


            if (user.EmailConfirmed)
            {
                return Ok(new
                {
                    message = "Email is already verified. You can login now."
                });
            }


            token = Uri.UnescapeDataString(token);


            var result = await _userManager.ConfirmEmailAsync(
                user,
                token
            );


            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = string.Join(
                        " ",
                        result.Errors.Select(e => e.Description)
                    )
                });
            }


            return Ok(new
            {
                message = "Email verified successfully. You can login now."
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new
                {
                    message = "Email is required."
                });
            }


            var user = await _userManager.FindByEmailAsync(request.Email);


            // Security: don't reveal whether email exists
            if (user == null)
            {
                return Ok(new
                {
                    message = "If this email exists, a reset link has been sent."
                });
            }


            if (!user.EmailConfirmed)
            {
                return Ok(new
                {
                    message = "If this email exists, a reset link has been sent."
                });
            }


            var token = await _userManager.GeneratePasswordResetTokenAsync(user);


            var resetLink =
                $"http://localhost:5173/reset-password?email={Uri.EscapeDataString(user.Email)}&token={Uri.EscapeDataString(token)}";


            await _emailService.SendEmailAsync(
                user.Email,
                "Reset your ExpensePilot password",
                $@"
        <h2>Password Reset Request 🔐</h2>

        <p>Hello {user.FullName},</p>

        <p>
            We received a request to reset your ExpensePilot password.
        </p>

        <p>
            Click the button below to create a new password:
        </p>

        <a href='{resetLink}'
           style='
           background:#4F46E5;
           color:white;
           padding:12px 20px;
           text-decoration:none;
           border-radius:8px;
           display:inline-block;
           '>
            Reset Password
        </a>

        <p>
            If you did not request this, you can ignore this email.
        </p>
        "
            );


            return Ok(new
            {
                message = "Password reset link sent to your email."
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new
                {
                    message = "Email is required."
                });
            }


            if (string.IsNullOrWhiteSpace(request.Token))
            {
                return BadRequest(new
                {
                    message = "Invalid reset token."
                });
            }


            if (string.IsNullOrWhiteSpace(request.NewPassword))
            {
                return BadRequest(new
                {
                    message = "Password is required."
                });
            }


            var user = await _userManager.FindByEmailAsync(request.Email);


            if (user == null)
            {
                return BadRequest(new
                {
                    message = "Invalid reset request."
                });
            }


            request.Token = Uri.UnescapeDataString(request.Token);


            var result = await _userManager.ResetPasswordAsync(
                user,
                request.Token,
                request.NewPassword
            );


            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = string.Join(
                        " ",
                        result.Errors.Select(e => e.Description)
                    )
                });
            }


            return Ok(new
            {
                message = "Password reset successful. You can now login."
            });
        }

        [HttpPost("resend-verification-email")]
        public async Task<IActionResult> ResendVerificationEmail(
    ResendVerificationEmailDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new
                {
                    message = "Email is required."
                });
            }


            var user = await _userManager.FindByEmailAsync(request.Email);


            if (user == null)
            {
                return Ok(new
                {
                    message = "If this email exists, a verification email has been sent."
                });
            }


            if (user.EmailConfirmed)
            {
                return Ok(new
                {
                    message = "If this email exists, a verification email has been sent."
                });
            }


            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);


            var confirmationLink =
                $"http://localhost:5173/verify-email?userId={user.Id}&token={Uri.EscapeDataString(token)}";


            await _emailService.SendEmailAsync(
                user.Email,
                "Verify your ExpensePilot account",
                $@"
        <div style='font-family:Segoe UI, sans-serif;'>

            <h2>
                Welcome to ExpensePilot 🚀
            </h2>

            <p>
                You requested a new email verification link.
            </p>

            <p>
                Click the button below to verify your account:
            </p>

            <a href='{confirmationLink}'
            style='
            display:inline-block;
            padding:12px 24px;
            background:#4F46E5;
            color:white;
            text-decoration:none;
            border-radius:8px;
            font-weight:600;
            '>
                Verify Email
            </a>

            <p style='margin-top:20px;color:#64748b;'>
                If you did not request this email, you can safely ignore it.
            </p>

        </div>
        "
            );


            return Ok(new
            {
                message = "If this email exists, a verification email has been sent."
            });
        }
    }
}