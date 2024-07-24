using BookStoreClean2.ApplicationLayer.DTOs.User;

namespace BookStoreClean2.ApplicationLayer.Interfaces.User;

public interface IUserService
{
    Task<UserDto> GetUserByIdAsync(string id);
    Task<IEnumerable<UserDto>> GetAllUsersAsync();
    Task<UserDto> CreateUserAsync(RegisterUserDto registerUserDto);
    Task<UpdateUserDto> UpdateUserAsync(string id,UpdateUserDto userDto);
    Task<bool> DeleteUserAsync(string id);
    Task<UserDto> AuthenticateUserAsync(string username, string password);

    Task<UserDto> GetUserByUsernameAsync(string username);

    Task<bool> AddBookToUserLibraryAsync(string userId, string bookId);
}