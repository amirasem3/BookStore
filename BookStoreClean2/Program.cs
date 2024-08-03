using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using BookStoreClean.ApplicationLayer.Interfaces;
using BookStoreClean.ApplicationLayer.Services;
using BookStoreClean.InfrastructureLayer.Data;
using BookStoreClean.InfrastructureLayer.Repositories;
using BookStoreClean2.ApplicationLayer.Interfaces.Role;
using BookStoreClean2.ApplicationLayer.Interfaces.User;
using BookStoreClean2.ApplicationLayer.Interfaces.UserBook;
using BookStoreClean2.ApplicationLayer.Services.Role;
using BookStoreClean2.ApplicationLayer.Services.User;
using BookStoreClean2.ApplicationLayer.Services.UserBook;
using BookStoreClean2.CoreLayer.Entities;
using BookStoreClean2.CoreLayer.Interfaces;
using BookStoreClean2.CoreLayer.Interfaces.Role;
using BookStoreClean2.CoreLayer.Interfaces.UserBook;
using BookStoreClean2.InfrastructureLayer.Repositories.Role;
using BookStoreClean2.InfrastructureLayer.Repositories.UserBook;
using BookStoreClean2.Middleware;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; 
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = "AmirHosseinIssuer",
            ValidAudience = "AmirHosseinAudience",
            IssuerSigningKey = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
        };
    });


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BookStore3")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("https://bookfront.liara.run", "http://localhost:3000")
                .AllowAnyHeader()
                .AllowCredentials()
                .AllowAnyMethod();
        });
   
});

builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"/keys")) // Adjust the directory path as needed
    .SetApplicationName("BookStoreCleanApp");


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Bookstore API",
        Description = "A simple example ASP.NET Core Web API"
    });
    
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter into field the word 'Bearer' followed by a space and the JWT token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
//Add repositories and Services
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILibraryRepository, LibraryRepository>();
builder.Services.AddScoped<ILibraryService, LibraryService>();
builder.Services.AddScoped<IRoleService,RoleService>();
builder.Services.AddScoped<IRoleRepository,RoleRepository>();
var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    

   
    // app.UseHttpsRedirection();
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.EnvironmentName=="Docker")
{
    app.UseDeveloperExceptionPage();
}

// Enable middleware to serve generated Swagger as a JSON endpoint.
app.UseSwagger();

// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
// specifying the Swagger JSON endpoint.
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Bookstore API V1");
    c.RoutePrefix = string.Empty; // Serve the Swagger UI at the app's root
});

// app.UseMiddleware<CustomUnauthorizedResponseMiddleware>();
app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseCors("AllowReactApp");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers().RequireAuthorization();
    endpoints.MapFallbackToFile("index.html"); // Serve React app for unknown routes
});



app.Run();