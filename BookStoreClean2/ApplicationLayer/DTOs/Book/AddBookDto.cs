using System.ComponentModel.DataAnnotations;
namespace BookStoreClean2.ApplicationLayer.DTOs;

public class AddBookDto
{
    [Required] [StringLength(100)] public string Title { get; set; }

    [Required] [StringLength(50)] public string Author { get; set; }

    [Required] [Range(0.01, 1000)] public decimal Price { get; set; }
}