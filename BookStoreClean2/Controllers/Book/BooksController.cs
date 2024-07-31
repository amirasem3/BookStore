
using BookStoreClean.ApplicationLayer.Interfaces;
using BookStoreClean2.ApplicationLayer.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreClean.Controllers;
// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet("GetBookById/{id}")]
        public async Task<IActionResult> GetBook(string id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpGet("GetBookByTitle/{title}")]
        public async Task<IActionResult> GetBookByTitleAsync(string title)
        {
            var bookId = await _bookService.GetIdByTitleAsync(title);
            if (bookId == "NotFound")
            {
                return NotFound();
            }

            return Ok($"{title}'s ID : {bookId}");
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("AllBooks")]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _bookService.GetAllBookAsync();
            return Ok(books);
        }
        
        

        [HttpPost("AddBook")]
        
        public async Task<IActionResult> AddBook([FromBody] AddBookDto bookDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdBook = await _bookService.AddBookAsync(bookDto);
            return CreatedAtAction(nameof(GetBook), new { id = createdBook.Id }, createdBook);
        }

        [HttpPut("UpdateBook/{id}")]
        public async Task<IActionResult> UpdateBookAsync(string id, [FromBody] BookDto bookDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedBook = await _bookService.UpdateBookAsync(id, bookDto);
            if (updatedBook == null)
            {
                return NotFound();
            }

            return Ok(updatedBook);
        }

        [HttpDelete("DeleteBook/{id}")]
        public async Task<IActionResult> DeleteBook(string id)
        {
            var deleted = await _bookService.DeleteBookAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return Ok($"The book with ID {id} successfully deleted");
            
        }

        [HttpGet("SearchBooks")]
        public async Task<IActionResult> SearchBooks([FromQuery] string searchTerm)
        {
            var books = await _bookService.SearchBooksAsync(searchTerm);
            return Ok(books);
        }
        
    
}