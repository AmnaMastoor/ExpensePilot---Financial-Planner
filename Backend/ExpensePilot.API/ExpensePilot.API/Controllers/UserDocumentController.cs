using ExpensePilot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ExpensePilot.API.Services.Interfaces;

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


        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocument(IFormFile file)
        {
            var userId = _userManager.GetUserId(User);

            if (userId == null)
                return Unauthorized();


            var result = await _userDocumentService.UploadAsync(file, userId);


            return Ok(result);
        }



        [HttpGet]
        public async Task<IActionResult> GetMyDocuments()
        {
            var userId = _userManager.GetUserId(User);

            if (userId == null)
                return Unauthorized();


            var documents = await _userDocumentService.GetMyDocumentsAsync(userId);



            return Ok(documents);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(Guid id)
        {
            var userId = _userManager.GetUserId(User);

            if (userId == null)
                return Unauthorized();


            var deleted = await _userDocumentService.DeleteAsync(id, userId);


            if (!deleted)
                return NotFound();


            return Ok(new
            {
                message = "Document deleted successfully."
            });
        }
    }
}