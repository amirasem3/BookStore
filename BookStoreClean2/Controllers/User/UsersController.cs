using BookStoreClean.ApplicationLayer.Interfaces;
using BookStoreClean.Controllers;
using BookStoreClean2.ApplicationLayer.DTOs.User;
using BookStoreClean2.ApplicationLayer.DTOs.UserBook;
using BookStoreClean2.ApplicationLayer.Interfaces.User;
using BookStoreClean2.ApplicationLayer.Interfaces.UserBook;
using BookStoreClean2.CoreLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreClean2.Controllers.User;
// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILibraryService _libraryService;

    public UsersController(IUserService userService, ILibraryService libraryService)
    {
        _userService = userService;
        _libraryService = libraryService;
    }
    [HttpGet("GetUserById/{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        
        // Console.WriteLine($"Returning {user.Books.First().Id} users.");

        return Ok(user);
        
        
    }
    
    [HttpGet("GetUserByUsername/{title}")]
    public async Task<IActionResult> GetUserByUsername(string title)
    {
        var user = await _userService.GetUserByUsernameAsync(title);
        if (user == null)
        {
            return NotFound();
        }

        return Ok($"{title}'s ID : {user.Id}");
    }
    
    [HttpGet("AllUsers")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("GetUserByRole")]
    public async Task<IActionResult> GetUserByRole(CoreLayer.Entities.Role role)
    {
        var user = await _userService.GetUserByRoleAsync(role);
        return Ok(user);
    }
    
    [HttpPost("RegisterUser")]
        
    public async Task<IActionResult> AddBook([FromBody] RegisterUserDto registerUserDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdUser = await _userService.CreateUserAsync(registerUserDto);
        return CreatedAtAction(nameof(GetUser), new { id =createdUser.Id }, createdUser);
    }
    [HttpPut("UpdateUser")]
    public async Task<IActionResult> UpdateBookAsync([FromBody] UpdateUserDto userDto)
    {

        var userId = userDto.Id;
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var updatedUser = await _userService.UpdateUserAsync(userId, userDto);
        if (updatedUser == null)
        {
            return NotFound();
        }

        return Ok(updatedUser);
    }
    
    [HttpDelete("RemoveUser")]
    public async Task<IActionResult> RemoveUser(string id)
    {
        var deleted = await _userService.DeleteUserAsync(id);
        if (!deleted)
        {
            return NotFound();
        }

        return Ok($"The user with ID {id} successfully deleted");
            
    }
    [HttpPost("Login")]
    public async Task<IActionResult> LoginUser([FromBody] LoginRequestDto loginRequestDto)
    {
        var user = await _userService.AuthenticateUserAsync(loginRequestDto.Username, loginRequestDto.Password);
        if (user == null)
        {
            return NotFound();
        }
    
        return Ok(user);
            
    }
    
}