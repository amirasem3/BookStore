using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.CoreLayer.Entities;

namespace BookStoreClean2.ApplicationLayer.Interfaces.UserBook;

public interface IUserBookService
{
    Task<UserBookAddDto> AddUserBookAsync(UserBookAddDto userBook);
    // Task<bool> AddBookToUserLibraryAsync(UserBookAddDto userBookAddDto);

   // IAsyncEnumerable<Book> AddBookToUserLibraryAsync(string userId);
}