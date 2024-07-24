using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.ApplicationLayer.Interfaces.UserBook;
using BookStoreClean2.CoreLayer.Entities;
using BookStoreClean2.CoreLayer.Interfaces.UserBook;

namespace BookStoreClean2.ApplicationLayer.Services.UserBook;

public class UserBookService : IUserBookService
{
    public required IUserBookRepository _userBookRepository;

    public UserBookService(IUserBookRepository userBookRepository)
    {
        _userBookRepository = userBookRepository;
    }


    public async Task<UserBookAddDto> AddUserBookAsync(UserBookAddDto userBookAddDto)
    {
        var userBook = new CoreLayer.Entities.UserBook
        {
            UserId = userBookAddDto.UserId,
            BookId = userBookAddDto.BookId
        };
        return await _userBookRepository.AddUserBookAsync(userBookAddDto);
    }

    // public async IAsyncEnumerable<Book> AddBookToUserLibraryAsync(string userId)
    // {
    //     return await _userBookRepository.AddBookToUserLibraryAsync(userId);
    // }
    //
    // public async Task<bool> AddBookToUserLibraryAsync(UserBookAddDto userBookAddDto)
    // {
    //     return await _userBookRepository.AddBookToUserLibraryAsync(userBookAddDto);
    // }
    
}