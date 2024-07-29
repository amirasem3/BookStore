using BookStoreClean2.CoreLayer.Entities;

namespace BookStoreClean2.ApplicationLayer.DTOs.User;

public class UserDto
{
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    
    public string PasswordHash { get; set;}
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    
    public string RoleName { get; set; }
    public ICollection<BookDto> Books { get; set; }
    
}