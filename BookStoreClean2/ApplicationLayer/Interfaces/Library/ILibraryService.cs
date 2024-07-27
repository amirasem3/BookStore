using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.CoreLayer.Entities;

namespace BookStoreClean2.ApplicationLayer.Interfaces.UserBook;

public interface ILibraryService
{

    Task<List<Book>> GetBooksByUserIdAsync(string userId);
    Task<LibraryDto> AddUserBookAsync(LibraryDto library);

    Task<bool> AddLibraryRecordAsync(string userId, string bookId);

    Task<bool> RemoveLibraryRecordAsync(string userId, string bookId);




}