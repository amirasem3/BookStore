namespace BookStoreClean2.CoreLayer.Entities;

public class Book
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public decimal Price { get; set; }

    public Book()
    {
        Id = GenerateUniqueId();
    }

    private string GenerateUniqueId()
    {
        return Guid.NewGuid().ToString("N").Substring(0, 24);
    }
}