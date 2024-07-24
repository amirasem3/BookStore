using System.Collections;
using BookStoreClean.InfrastructureLayer.Data;
using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.CoreLayer.Entities;
using BookStoreClean2.CoreLayer.Interfaces.UserBook;
using BookStoreClean2.Migrations;

namespace BookStoreClean2.InfrastructureLayer.Repositories.UserBook;

public class UserBookRepository : IUserBookRepository
{
    public required AppDbContext _context;

    public UserBookRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<UserBookAddDto> AddUserBookAsync(UserBookAddDto userBookAddDto)
    {
      
       
        var user = await _context.Users.FindAsync(userBookAddDto.UserId);
        var book = await _context.Books.FindAsync(userBookAddDto.BookId);
        if (user!=null && book!=null)
        {
            var userBook = new CoreLayer.Entities.UserBook
            {
                UserId = userBookAddDto.UserId,
                BookId = userBookAddDto.BookId,
                Book = book,
                User = user
            };
            await _context.UserBooks.AddAsync(userBook);
            _context.Users.Update(user);
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
            return userBookAddDto;
        }

        return null;
    }

    // public async Task<IEnumerable<Book>> AddBookToUserLibraryAsync(string userId)
    // {
    //
    //     var user = await _context.Users.FindAsync(userId);
    //     IEnumerable<Book> books = new List<Book>();
    //     foreach (var userBook in _context.UserBooks)
    //     {
    //         if (userBook.UserId == userId)
    //         {
    //             
    //             user.Books.Append(userBook.Book);
    //         }
    //     }
    //
    //     _context.Users.Update(user);
    //     await _context.SaveChangesAsync();
    //
    //     return books;
    // }
}