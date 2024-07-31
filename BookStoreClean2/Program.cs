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
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
// builder.Services.AddControllers().AddJsonOptions(options =>
// {
//     options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
// });
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

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapFallbackToFile("index.html"); // Serve React app for unknown routes
});
// app.UseEndpoints(endpoint =>
// {
//     endpoint.MapFallbackToFile("BookStoreClean2/bookstore-frontend/public/index.html");
// });



// app.MapControllers();

app.Run();