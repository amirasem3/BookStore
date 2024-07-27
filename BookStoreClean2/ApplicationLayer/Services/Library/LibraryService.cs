using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.ApplicationLayer.Interfaces.UserBook;
using BookStoreClean2.CoreLayer.Entities;
using BookStoreClean2.CoreLayer.Interfaces.UserBook;

namespace BookStoreClean2.ApplicationLayer.Services.UserBook;

public class LibraryService : ILibraryService
{
    public required ILibraryRepository _libraryRepository;

    public LibraryService(ILibraryRepository libraryRepository)
    {
        _libraryRepository = libraryRepository;
    }


    public async Task<List<Book>> GetBooksByUserIdAsync(string userId)
    {
        return await _libraryRepository.GetBooksByUserIdAsync(userId);
    }

    public async Task<LibraryDto> AddUserBookAsync(LibraryDto libraryDto)
    {
        var userBook = new CoreLayer.Entities.Library
        {
            UserId = libraryDto.UserId,
            BookId = libraryDto.BookId
        };
        return await _libraryRepository.AddLibraryRecord(libraryDto);
    }

    public async Task<bool> AddLibraryRecordAsync(string userId, string bookId)
    {
        return await _libraryRepository.AddBookToUserLibraryAsync(userId, bookId);
    }

    public async Task<bool> RemoveLibraryRecordAsync(string userId, string bookId)
    {
        return await _libraryRepository.RemoveLibraryRecord(userId, bookId);
    }
}