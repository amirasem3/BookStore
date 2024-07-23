using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace BookStoreClean2.ApplicationLayer.DTOs;

public class BookDto
{
    public string Id { get; set; }

    [Required] [StringLength(100)] public string Title { get; set; }

    [Required] [StringLength(50)] public string Author { get; set; }

    [Required] [Range(0.01, 1000)] public decimal Price { get; set; }
}