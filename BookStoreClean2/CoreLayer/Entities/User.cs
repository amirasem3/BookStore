using System.Text.Json.Serialization;

namespace BookStoreClean2.CoreLayer.Entities;

public class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N").Substring(0, 12);
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    
    public string PasswordHash { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }

    public ICollection<Book> Books = new List<Book>();


    public ICollection<Library> UserBooks { get; set; } = new List<Library>();

}