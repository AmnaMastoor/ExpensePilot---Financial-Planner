
using System.Net.Http.Json;
using ExpensePilot.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ExpensePilot.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public ChatController(
            HttpClient httpClient,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            _httpClient = httpClient;
            _userManager = userManager;
            _configuration = configuration;
        }

        // =====================================================
        // ASK AI ASSISTANT
        // =====================================================

        [HttpPost("ask")]
        public async Task<IActionResult> Ask(
            [FromBody] ChatRequest request)
        {
            if (request == null ||
                string.IsNullOrWhiteSpace(request.Question))
            {
                return BadRequest(new
                {
                    message = "Question is required."
                });
            }

            // -------------------------------------------------
            // Get authenticated user
            // -------------------------------------------------

            var userId =
                _userManager.GetUserId(User);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            // -------------------------------------------------
            // Python RAG API URL
            // -------------------------------------------------

            var pythonApiUrl =
                _configuration["FastApi:BaseUrl"];

            if (string.IsNullOrWhiteSpace(pythonApiUrl))
            {
                return StatusCode(500, new
                {
                    message =
                        "Python RAG API URL is not configured."
                });
            }

            // -------------------------------------------------
            // Request for Python
            // -------------------------------------------------

            var payload = new
            {
                question = request.Question,
                user_id = userId
            };

            try
            {
                var response =
                    await _httpClient.PostAsJsonAsync(
                        $"{pythonApiUrl.TrimEnd('/')}/ask",
                        payload
                    );

                // -------------------------------------------------
                // Python API error
                // -------------------------------------------------

                if (!response.IsSuccessStatusCode)
                {
                    var error =
                        await response.Content
                            .ReadAsStringAsync();

                    return StatusCode(
                        (int)response.StatusCode,
                        new
                        {
                            message =
                                "Python RAG API returned an error.",

                            details = error
                        }
                    );
                }

                // -------------------------------------------------
                // Read Python response
                // -------------------------------------------------

                var result =
                    await response.Content
                        .ReadFromJsonAsync<ChatResponse>();

                if (result == null)
                {
                    return StatusCode(502, new
                    {
                        message =
                            "Invalid response from Python RAG API."
                    });
                }

                return Ok(result);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(503, new
                {
                    message =
                        "Unable to connect to Python RAG API.",

                    details = ex.Message
                });
            }
        }

        // =====================================================
        // GET CHAT HISTORY
        // =====================================================

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            // -------------------------------------------------
            // Get authenticated user
            // -------------------------------------------------

            var userId =
                _userManager.GetUserId(User);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            // -------------------------------------------------
            // Python RAG API URL
            // -------------------------------------------------

            var pythonApiUrl =
                _configuration["FastApi:BaseUrl"];

            if (string.IsNullOrWhiteSpace(pythonApiUrl))
            {
                return StatusCode(500, new
                {
                    message =
                        "Python RAG API URL is not configured."
                });
            }

            try
            {
                // -------------------------------------------------
                // Request user-specific history
                // -------------------------------------------------

                var url =
                    $"{pythonApiUrl.TrimEnd('/')}" +
                    $"/chat/history" +
                    $"?user_id={Uri.EscapeDataString(userId)}";

                var response =
                    await _httpClient.GetAsync(url);

                // -------------------------------------------------
                // Python API error
                // -------------------------------------------------

                if (!response.IsSuccessStatusCode)
                {
                    var error =
                        await response.Content
                            .ReadAsStringAsync();

                    return StatusCode(
                        (int)response.StatusCode,
                        new
                        {
                            message =
                                "Python RAG API returned an error.",

                            details = error
                        }
                    );
                }

                // -------------------------------------------------
                // Read history response
                // -------------------------------------------------

                var result =
                    await response.Content
                        .ReadFromJsonAsync<ChatHistoryResponse>();

                if (result == null)
                {
                    return Ok(new ChatHistoryResponse());
                }

                return Ok(result);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(503, new
                {
                    message =
                        "Unable to connect to Python RAG API.",

                    details = ex.Message
                });
            }
        }
    }
}


// =========================================================
// CHAT REQUEST
// =========================================================

public class ChatRequest
{
    public string Question { get; set; }
        = string.Empty;
}


// =========================================================
// CHAT RESPONSE
// =========================================================

public class ChatResponse
{
    public string Answer { get; set; }
        = string.Empty;
}


// =========================================================
// CHAT HISTORY RESPONSE
// =========================================================

public class ChatHistoryResponse
{
    public List<ChatHistoryMessage> Messages { get; set; }
        = new();
}


// =========================================================
// CHAT HISTORY MESSAGE
// =========================================================

public class ChatHistoryMessage
{
    public string Role { get; set; }
        = string.Empty;

    public string Content { get; set; }
        = string.Empty;
}

