﻿namespace BookStoreClean2.ApplicationLayer.DTOs.User;

public class RegisterUserDto
{
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    
    public string RoleId { get; set; }
}