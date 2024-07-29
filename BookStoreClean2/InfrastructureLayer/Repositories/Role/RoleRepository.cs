using BookStoreClean.InfrastructureLayer.Data;
using BookStoreClean2.CoreLayer.Interfaces.Role;
using Microsoft.EntityFrameworkCore;

namespace BookStoreClean2.InfrastructureLayer.Repositories.Role;

public class RoleRepository : IRoleRepository
{
    public required AppDbContext _context;

    public RoleRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<CoreLayer.Entities.Role> GetRoleByIdAsync(string id)
    {
        return await _context.Roles.FindAsync(id);
    }

    public async Task<CoreLayer.Entities.Role> GetRoleIdByName(string name)
    {
        return await _context.Roles.SingleOrDefaultAsync(role => role.Name == name); 
    }

    public async Task<IEnumerable<CoreLayer.Entities.Role>> GetAllRolesAsync()
    {
        return await _context.Roles.ToListAsync();
    }

    public async Task<CoreLayer.Entities.Role> CreateRoleAsync(CoreLayer.Entities.Role role)
    {
        await _context.Roles.AddAsync(role);
        await _context.SaveChangesAsync();
        return role;
    }

    public async Task<bool> DeleteRoleAsync(string id)
    {
        var role = await _context.Roles.FindAsync(id);
        if (role == null)
        {
            return false;
        }

        _context.Roles.Remove(role);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<CoreLayer.Entities.Role> UpdateRole(CoreLayer.Entities.Role role)
    {
        _context.Roles.Update(role);
        await _context.SaveChangesAsync();
        return role;
    }
}