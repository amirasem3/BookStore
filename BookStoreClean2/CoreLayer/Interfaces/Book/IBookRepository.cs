using BookStoreClean2.CoreLayer.Entities;

namespace BookStoreClean2.CoreLayer.Interfaces;

public interface IBookRepository
{
    Task<Book> GetByIdAsync(string id);
    Task<IEnumerable<Book>> GetAllAsync();
    Task<Book> AddAsync(Book book);
    Task UpdateAsync(Book book);
    Task DeleteAsync(string id);

    Task<string> GetIdByTitleAsync(string title);

    Task<IEnumerable<Book>> SearchAsync(string searchTerm);
}