using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.ApplicationLayer.Interfaces.UserBook;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreClean2.Controllers.Library;
// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class LibraryController : ControllerBase
{
    private readonly ILibraryService _libraryService;

    public LibraryController(ILibraryService libraryService)
    {
        _libraryService = libraryService;
    }
    
    [HttpPut("AddBookToLibrary")]
    public async Task<IActionResult> AddLibraryRecord(LibraryDto library)
    {
        var result = await _libraryService.AddLibraryRecordAsync(library.UserId, library.BookId);
    
        if (!result)
        {
            return NotFound("Your Book or User does Not Exist");
        }

        return Ok($"The book successfully ({library.BookId}) added to user ({library.UserId}) library.");
    }

    [HttpDelete("RemoveBookFromLibrary")]
    public async Task<IActionResult> RemoveLibraryRecord([FromQuery]LibraryRemoveDto libraryDto)
    {
        var result = await _libraryService.RemoveLibraryRecordAsync(libraryDto.UserId, libraryDto.BookId);
        if (!result)
        {
            return NotFound();
        }
        return Ok($"The book successfully ({libraryDto.BookId}) removed to user ({libraryDto.UserId}) library.");
    }

    [HttpGet("GetUserLibrary")]
    public async Task<IActionResult> GetUserLibrary(string userId)
    {
        var result = await _libraryService.GetBooksByUserIdAsync(userId);

        return Ok(result);
    }
}