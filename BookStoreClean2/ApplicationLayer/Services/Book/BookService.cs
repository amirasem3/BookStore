using BookStoreClean.ApplicationLayer.Interfaces;
using BookStoreClean2.ApplicationLayer.DTOs;
using BookStoreClean2.CoreLayer.Entities;
using BookStoreClean2.CoreLayer.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreClean.ApplicationLayer.Services;

public class BookService : IBookService
{
    public required IBookRepository _bookRepository;

    public BookService(IBookRepository bookRepository)
    {
        _bookRepository = bookRepository;
    }

    public async Task<BookDto> GetBookByIdAsync(string id)
    {
        var book = await _bookRepository.GetByIdAsync(id);
        return new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Price = book.Price
        };
    }


  

    public async Task<IEnumerable<BookDto>> GetAllBookAsync()
    {
        var books = await _bookRepository.GetAllAsync();
        return books.Select(book => new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Price = book.Price
        });
    }
    public async Task<BookDto> AddBookAsync(AddBookDto bookDto)
    {
        var book = new Book
        {
            Id = Guid.NewGuid().ToString("N").Substring(0,24),
            Title = bookDto.Title,
            Author = bookDto.Author,
            Price = bookDto.Price
        };
        await _bookRepository.AddAsync(book);
        return new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Price = book.Price
        };
    }

    public async Task<BookDto> UpdateBookAsync(string id,BookDto bookDto)
    {
        var book = await _bookRepository.GetByIdAsync(id);
        if (book == null)
        {
            return null;
        }
        
        book.Title = bookDto.Title;
        book.Author = bookDto.Author;
        book.Price = bookDto.Price;

        await _bookRepository.UpdateAsync(book);
        return new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Price = book.Price
        };
    }

    public async Task<bool> DeleteBookAsync(string id)
    {
        var book = await _bookRepository.GetByIdAsync(id);
        // if (book != null)
        // {
        //     return false;
        // }

        await _bookRepository.DeleteAsync(id);

        return true;
    }

    public async Task<string> GetIdByTitleAsync(string title)
    {
        return await _bookRepository.GetIdByTitleAsync(title);
        
    }

    public async Task<IEnumerable<BookDto>> SearchBooksAsync(string searchTerm)
    {
        var books = await _bookRepository.SearchAsync(searchTerm);
        return books.Select(book => new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Price = book.Price

        });
    }
}