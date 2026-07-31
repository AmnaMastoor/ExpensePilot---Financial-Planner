using ExpensePilot.API.DTO.Profile;
using ExpensePilot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ExpensePilot.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        private async Task<ApplicationUser> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return await _userManager.FindByIdAsync(userId);
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var user = await GetCurrentUser();

            if (user == null)
                return NotFound();

            return Ok(new ProfileDto
            {
                FullName = user.FullName,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                IsGoogleAccount = !await _userManager.HasPasswordAsync(user)
            });
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProfile(UpdateProfileDto dto)
        {
            var user = await GetCurrentUser();

            if (user == null)
                return NotFound();

            user.FullName = dto.FullName;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Profile updated successfully.");
        }
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            var user = await GetCurrentUser();

            if (user == null)
                return NotFound();

            if (!await _userManager.HasPasswordAsync(user))
            {
                return BadRequest(new
                {
                    message = "Please set a password first."
                });
            }

            var result = await _userManager.ChangePasswordAsync(
                user,
                dto.CurrentPassword,
                dto.NewPassword
            );

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Password updated successfully.");
        }

        [HttpPut("set-password")]
        public async Task<IActionResult> SetPassword(SetPasswordDto dto)
        {
            var user = await GetCurrentUser();

            if (user == null)
                return NotFound();

            if (await _userManager.HasPasswordAsync(user))
            {
                return BadRequest(new
                {
                    message = "Password already exists."
                });
            }

            var result = await _userManager.AddPasswordAsync(
                user,
                dto.NewPassword
            );

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = string.Join(" ", result.Errors.Select(e => e.Description))
                });
            }

            return Ok(new
            {
                message = "Password set successfully."
            });
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteAccount(DeleteAccountDto dto)
        {
            var user = await GetCurrentUser();

            if (user == null)
                return NotFound();

            if (await _userManager.HasPasswordAsync(user))
            {
                var passwordCorrect = await _userManager.CheckPasswordAsync(user, dto.Password);

                if (!passwordCorrect)
                {
                    return BadRequest(new
                    {
                        message = "Incorrect password."
                    });
                }
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new
            {
                message = "Account deleted successfully."
            });
        }
    }
}
