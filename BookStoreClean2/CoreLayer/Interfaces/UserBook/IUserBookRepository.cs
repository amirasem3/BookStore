using System.Collections;
using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.CoreLayer.Entities;

namespace BookStoreClean2.CoreLayer.Interfaces.UserBook;

public interface IUserBookRepository
{
    public Task<UserBookAddDto> AddUserBookAsync(UserBookAddDto userBook);
    // public IEnumerable<Book> AddBookToUserLibraryAsync(string userId);
}