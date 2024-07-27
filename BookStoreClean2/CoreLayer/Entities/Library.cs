namespace BookStoreClean2.CoreLayer.Entities;

public class Library
{
    public string UserId { get; set; }
    public User User { get; set; }
    
    public string BookId { get; set; }
    public Book Book;
}