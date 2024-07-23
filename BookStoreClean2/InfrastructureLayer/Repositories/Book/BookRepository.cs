using BookStoreClean.InfrastructureLayer.Data;
using BookStoreClean2.CoreLayer.Entities;
using BookStoreClean2.CoreLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BookStoreClean.InfrastructureLayer.Repositories;

public class BookRepository : IBookRepository
{
    public required AppDbContext _context;

    public BookRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Book> GetByIdAsync(string id)
    {
        return await _context.Books.FindAsync(id);
    }


    public async Task<IEnumerable<Book>> GetAllAsync()
    {
        return await _context.Books.ToListAsync();
    }

    public async Task<Book> AddAsync(Book book)
    {
        await _context.Books.AddAsync(book);
        await _context.SaveChangesAsync();
        return book;
    }

    public async Task UpdateAsync(Book book)
    {
        _context.Books.Update(book);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(string id)
    {
        var book = await _context.Books.FindAsync(id);
        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
    }

    public async Task<string> GetIdByTitleAsync(string title)
    {
        foreach (var book in _context.Books)
        {
            if (book.Title == title)
            {
                return book.Id;
            }
        }

        return "NotFound";
    }

    public async Task<IEnumerable<Book>> SearchAsync(string searchTerm)
    {
        if (searchTerm == " ")
        {
            return await GetAllAsync();
        }

        return await _context.Books
            .Where(book => book.Title.Contains(searchTerm) ||
                           book.Author.Contains(searchTerm))
            .ToListAsync();
    }
}