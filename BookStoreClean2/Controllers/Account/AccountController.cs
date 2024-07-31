using System.Drawing;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookStoreClean2.ApplicationLayer.DTOs.User;
using BookStoreClean2.ApplicationLayer.Interfaces.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace BookStoreClean2.Controllers.Account;
[Authorize]
[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;

    public AccountController(IConfiguration configuration, IUserService userService)
    {
        _configuration = configuration;
        _userService = userService;
    }
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromQuery] LoginRequestDto loginModel)
    {
        var user = await _userService.AuthenticateUserAsync(loginModel.Username, loginModel.Password);
        if (user == null)
        {
            return Unauthorized();
        }
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = "SuperSecretKeyForTestingPurposes123!"u8.ToArray(); // Replace with your secret key
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id), new Claim(ClaimTypes.Role, "Admin") }),
            Expires = DateTime.UnixEpoch.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new
        {
            Token = tokenString,
            Expires = token.ValidTo,
            TokenType = "Bearer"
        });
        // var claims = new[]
        // {
        //     new Claim(JwtRegisteredClaimNames.Sub, loginModel.Username),
        //     new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        // };
        //
        // var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]));
        // var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        //
        // var token = new JwtSecurityToken(
        //     issuer: _configuration["Jwt:Issuer"],
        //     audience: _configuration["Jwt:Audience"],
        //     claims: claims,
        //     expires: DateTime.Now.AddMinutes(60),
        //     signingCredentials: creds
        // );
        //
        // return Ok(new JwtSecurityTokenHandler().WriteToken(token));

    }
}