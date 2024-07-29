using System.Collections;
using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.CoreLayer.Entities;

namespace BookStoreClean2.CoreLayer.Interfaces.UserBook;

public interface ILibraryRepository
{

    public Task<Library> GetUserBookByIdAsync(string id);

    public Task<IEnumerable<Library>> GetAllUserBooksAsync();
    public Task<LibraryDto> AddLibraryRecord(LibraryDto library);
    public Task<bool> AddBookToUserLibraryAsync(string userId, string bookId);

    public Task<List<Book>> GetBooksByUserIdAsync(string userId);

    public Task<bool> RemoveLibraryRecord(string userId, string bookId);



}