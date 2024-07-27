using System.Collections;
using BookStoreClean.InfrastructureLayer.Data;
using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.CoreLayer.Entities;
using BookStoreClean2.CoreLayer.Interfaces.UserBook;
using BookStoreClean2.Migrations;
using Microsoft.EntityFrameworkCore;

namespace BookStoreClean2.InfrastructureLayer.Repositories.UserBook;

public class LibraryRepository : ILibraryRepository
{
    public required AppDbContext _context;

    public LibraryRepository(AppDbContext context)
    {
        _context = context;
    }


   
    public async Task<Library> GetUserBookByIdAsync(string id)
    {
        var userBook = await _context.UserBooks.FindAsync(id);
        return userBook;
    }
    public async Task<IEnumerable<Library>> GetAllUserBooksAsync()
    {
        return await _context.UserBooks.ToListAsync();
    }
    public async Task<LibraryDto> AddLibraryRecord(LibraryDto libraryDto)
    {
      
       
        var user = await _context.Users.FindAsync(libraryDto.UserId);
        var book = await _context.Books.FindAsync(libraryDto.BookId);
        if (user!=null && book!=null)
        {
            var userBook = new CoreLayer.Entities.Library
            {
                UserId = libraryDto.UserId,
                BookId = libraryDto.BookId,
                Book = book,
                User = user
            };
            await _context.UserBooks.AddAsync(userBook);
            _context.Users.Update(user);
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
            return libraryDto;
        }

        return null;
    }

    public async Task<bool> AddBookToUserLibraryAsync(string userId, string bookId)
    {
        var user = await _context.Users
            .Include(u => u.UserBooks)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            Console.WriteLine($"User {userId} not found.");
            return false;
        }

        var existingUserBook = await _context.UserBooks
            .FirstOrDefaultAsync(ub => ub.UserId == userId && ub.BookId == bookId);

        if (existingUserBook != null)
        {
            Console.WriteLine($"User {userId} already has book {bookId}.");
            return false; // Or handle as you wish, e.g., return true if you consider it a success
        }

        var userBook = new Library
        {
            UserId = userId,
            BookId = bookId
        };

        user.UserBooks.Add(userBook);
        user.Books.Add(userBook.Book); // Add the book to the Books collection

        await _context.SaveChangesAsync();
        Console.WriteLine($"Added book {bookId} to user {userId}.");

        return true;

    }

    public async Task<List<Book>> GetBooksByUserIdAsync(string userId)
    {
        var bookIds =  await _context.UserBooks
            .Where(ub => ub.UserId == userId)
            .Select(ub => ub.BookId).ToListAsync();

        return await _context.Books
            .Where(b => bookIds.Contains(b.Id))
            .ToListAsync();
    }

    public async Task<bool> RemoveLibraryRecord(string userId, string bookId)
    {
        var userBook = await _context.UserBooks
            .FirstOrDefaultAsync(ub => ub.UserId == userId && ub.BookId == bookId);
        if (userBook == null)
        {
            return false;
        }

        _context.UserBooks.Remove(userBook);
        await _context.SaveChangesAsync();
        return true;

    }
}