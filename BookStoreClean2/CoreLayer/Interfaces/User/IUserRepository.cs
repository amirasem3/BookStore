using BookStoreClean2.ApplicationLayer.DTOs.User;
using BookStoreClean2.CoreLayer.Entities;

namespace BookStoreClean2.CoreLayer.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByIdAsync(string id);
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User> AddUserAsync(User user);
    Task UpdateUserAsync(UpdateUserDto user);
    Task DeleteUserAsync(string id);

    Task<User> GetUserByUsernameAsync(string username);
}