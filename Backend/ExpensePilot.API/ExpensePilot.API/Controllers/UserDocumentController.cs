
using ExpensePilot.API.Models;
using ExpensePilot.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ExpensePilot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserDocumentController : ControllerBase
    {
        private readonly IUserDocumentService _userDocumentService;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserDocumentController(
            IUserDocumentService userDocumentService,
            UserManager<ApplicationUser> userManager)
        {
            _userDocumentService = userDocumentService;
            _userManager = userManager;
        }

        // =====================================================
        // UPLOAD
        // =====================================================

        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocument(
            IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new
                {
                    message = "Please select a file."
                });
            }

            var userId = _userManager.GetUserId(User);

            if (userId == null)
                return Unauthorized();

            var result =
                await _userDocumentService.UploadAsync(
                    file,
                    userId
                );

            return Ok(result);
        }

        // =====================================================
        // GET MY DOCUMENTS
        // =====================================================

        [HttpGet]
        public async Task<IActionResult> GetMyDocuments()
        {
            var userId = _userManager.GetUserId(User);

            if (userId == null)
                return Unauthorized();

            var documents =
                await _userDocumentService
                    .GetMyDocumentsAsync(userId);

            return Ok(documents);
        }

        // =====================================================
        // DELETE BY ID ONLY
        // =====================================================

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteDocument(
            Guid id)
        {
            var userId = _userManager.GetUserId(User);

            if (userId == null)
                return Unauthorized();

            var deleted =
                await _userDocumentService.DeleteAsync(
                    id,
                    userId
                );

            if (!deleted)
            {
                return NotFound(new
                {
                    message = "Document not found."
                });
            }

            return Ok(new
            {
                message = "Document deleted successfully."
            });
        }
    }
}

