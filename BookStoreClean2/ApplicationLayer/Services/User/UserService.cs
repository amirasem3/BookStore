using System.Collections;
using BookStoreClean2.ApplicationLayer.DTOs;
using BookStoreClean2.ApplicationLayer.DTOs.User;
using BookStoreClean2.ApplicationLayer.Interfaces.User;
using BookStoreClean2.CoreLayer.Entities;
using BookStoreClean2.CoreLayer.Interfaces;
using BookStoreClean2.CoreLayer.Interfaces.UserBook;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookStoreClean2.ApplicationLayer.Services.User;

public class UserService : IUserService
{
    public required IPasswordHasher<CoreLayer.Entities.User> _passwordHasher;
    public required IUserRepository _userRepository;
    public required ILibraryRepository _libraryRepository;
    public required IBookRepository _bookRepository;

    public UserService(IPasswordHasher<CoreLayer.Entities.User> passwordHasher, IUserRepository userRepository, ILibraryRepository libraryRepository, IBookRepository bookRepository)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _bookRepository = bookRepository;
        _libraryRepository = libraryRepository;
    }

    public async Task<UserDto> GetUserByIdAsync(string id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        var books = await _libraryRepository.GetBooksByUserIdAsync(id);
        var userDto = new UserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Username = user.Username,
            PhoneNumber = user.PhoneNumber,
            Email = user.Email,
            PasswordHash = user.PasswordHash,
            Books = books.Select(book => new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Price = book.Price

            }).ToList()
        };
        Console.WriteLine($"Returning user {id} with {userDto.Books.Count} books.");
        // Console.WriteLine($"Returning user {id} first book is {userDto.Books.First().Id}");
        return userDto;
    }

    public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
    {
       var allUsers = new List<UserDto>();
        var users = await _userRepository.GetAllUsersAsync();
        foreach (var user in users)
        {
            var userBooks = await _libraryRepository.GetBooksByUserIdAsync(user.Id);
            var userDto  = new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username = user.Username,
                PhoneNumber = user.PhoneNumber,
                PasswordHash = user.PasswordHash,
                Email = user.Email,
                Books = userBooks.Select(book => new BookDto
                {
                    Id = book.Id,
                    Title = book.Title,
                    Author = book.Author,
                    Price = book.Price
                }).ToList()
            };
            allUsers.Add(userDto);
            Console.WriteLine($"Returning user {user.Id} with {userDto.Books.Count} books.");


        }

        return allUsers;
    }

    public async Task<UserDto> CreateUserAsync(RegisterUserDto registerUserDto)
    {
        var user = new CoreLayer.Entities.User
        {
            Id = Guid.NewGuid().ToString("N").Substring(0, 12),
            Username = registerUserDto.Username,
            FirstName = registerUserDto.FirstName,
            LastName = registerUserDto.LastName,
            Email = registerUserDto.Email,
            PhoneNumber = registerUserDto.PhoneNumber
        };
        user.PasswordHash = _passwordHasher.HashPassword(user, registerUserDto.Password);
        await _userRepository.AddUserAsync(user);
        return new UserDto
        {
            Id = user.Id,
           Username = user.Username,
           PasswordHash = user.PasswordHash,
           FirstName = user.FirstName,
           LastName = user.LastName,
           Email = user.Email,
           PhoneNumber = user.PhoneNumber
        };
    }

    public async Task<UpdateUserDto> UpdateUserAsync(string id, UpdateUserDto updateUserDto)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
       
        if (user == null)
        {
            return null;
        }

        user.FirstName = updateUserDto.FirstName;
        user.LastName = updateUserDto.LastName;
        user.Username = updateUserDto.Username;
        user.Email = updateUserDto.Email;
        user.PhoneNumber = updateUserDto.PhoneNumber;
        

        try
        {
            await _userRepository.UpdateUserAsync(updateUserDto);
        }
        catch (DbUpdateConcurrencyException e)
        {
            Console.WriteLine(e);
            throw;
        }
        return updateUserDto;
    }

    public async Task<bool> DeleteUserAsync(string id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);

        await _userRepository.DeleteUserAsync(id);
        return true;
    }

    public async Task<UserDto> AuthenticateUserAsync(string username, string password)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null)
        {
            return null;
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }

        return new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            PasswordHash = user.PasswordHash
        };
    }

    public async Task<UserDto> GetUserByUsernameAsync(string username)
    {
        var user =  await _userRepository.GetUserByUsernameAsync(username);
        return new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber
        };
    }

    
}