using BookStoreClean2.ApplicationLayer.DTOs;

namespace BookStoreClean.ApplicationLayer.Interfaces;

public interface IBookService
{
    Task<BookDto> GetBookByIdAsync(string id);
    Task<IEnumerable<BookDto>> GetAllBookAsync();
    Task<BookDto> AddBookAsync(AddBookDto bookDto);

    Task<BookDto> UpdateBookAsync(string id,BookDto bookDto);

    Task<bool> DeleteBookAsync(string id);

    Task<string> GetIdByTitleAsync(string title);

    Task<IEnumerable<BookDto>> SearchBooksAsync(string searchTerm);
}