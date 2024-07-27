using BookStoreClean.InfrastructureLayer.Data;
using BookStoreClean2.ApplicationLayer.DTOs.User;
using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.CoreLayer.Entities;
using BookStoreClean2.CoreLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace BookStoreClean.InfrastructureLayer.Repositories;

public class UserRepository :IUserRepository
{
    public required AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetUserByIdAsync(string id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User> AddUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task UpdateUserAsync(UpdateUserDto updateUserDto)
    {
        var existingUser = await _context.Users.FindAsync(updateUserDto.Id);
        if (existingUser == null)
        {
            return;
        }

        existingUser.FirstName = updateUserDto.FirstName;
        existingUser.LastName = updateUserDto.LastName;
        existingUser.Username = updateUserDto.Username;
        existingUser.Email = updateUserDto.Email;
        existingUser.PhoneNumber = updateUserDto.PhoneNumber;
        // var user = new User
        // {
        //     FirstName = updateUserDto.FirstName,
        //     LastName = updateUserDto.LastName,
        //     Username = updateUserDto.Username,
        //     Email = updateUserDto.Email,
        //     PhoneNumber = updateUserDto.PhoneNumber
        //
        // };
        _context.Users.Update(existingUser);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task DeleteUserAsync(string id)
    {
        var user = await _context.Users.FindAsync(id);
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

    }

    public async Task<User> GetUserByUsernameAsync(string username)
    {
        return await _context.Users.SingleOrDefaultAsync(user => user.Username == username);
    }

    public async Task<bool> AddBooksToLibraryAsync(string userId, string bookId)
    {
        var user = await _context.Users.Include(u => u.UserBooks).FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
        {
            return false;
        }

        var book = await _context.Books.FindAsync(bookId);
        if (book == null)
        {
            return false;
        }
        var existingUserBook = await _context.UserBooks
            .FirstOrDefaultAsync(ub => ub.UserId == userId && ub.BookId == bookId);

        if (existingUserBook != null)
        {
            return false; // Or handle as you wish, e.g., return true if you consider it a success
        }

        var userBook = new Library
        {
            UserId = userId,
            BookId = bookId,
            Book = book,
        };
        _context.UserBooks.Add(userBook);
       user.Books.Add(userBook.Book);
        await _context.SaveChangesAsync();
        Console.WriteLine($"Returning user {user.Id} with {user.Books.ToList()} books.");
        return true;
    }
    
}