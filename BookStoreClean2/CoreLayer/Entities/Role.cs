namespace BookStoreClean2.CoreLayer.Entities;

public class Role
{
    public string Id { get; set; }
    public string Name { get; set; }

    public Role()
    {
        Id = GenerateUniqueId();
    }
    
    public ICollection<User> Users { get; set; }
    
    private string GenerateUniqueId()
    {
        return Guid.NewGuid().ToString("N").Substring(0, 10);
    }
}