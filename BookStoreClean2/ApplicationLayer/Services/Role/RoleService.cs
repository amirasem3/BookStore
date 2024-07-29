using BookStoreClean2.ApplicationLayer.DTOs.Role;
using BookStoreClean2.ApplicationLayer.Interfaces.Role;
using BookStoreClean2.CoreLayer.Interfaces.Role;

namespace BookStoreClean2.ApplicationLayer.Services.Role;

public class RoleService : IRoleService
{
    public required IRoleRepository _roleRepository;

    public RoleService(IRoleRepository roleRepository)
    {
        _roleRepository = roleRepository;
    }

    public async Task<RoleDto> GetRoleByIdAsync(string id)
    {
        var role = await _roleRepository.GetRoleByIdAsync(id);
        return new RoleDto
        {
            Id = role.Id,
            Name = role.Name
        };
    }

    public async Task<IEnumerable<RoleDto>> GetAllRolesAsync()
    {
        var roles = await _roleRepository.GetAllRolesAsync();

        return roles.Select(role => new RoleDto
        {
            Id = role.Id,
            Name = role.Name
        });
    }

    public async Task<RoleDto> GetRoleIdByName(string name)
    {
        var role = await _roleRepository.GetRoleIdByName(name);
        return new RoleDto
        {
            Id = role.Id,
            Name = role.Name
        };
    }

    public async Task<RoleDto> CreateRoleAsync(string roleName)
    {
        var role = new CoreLayer.Entities.Role
        {
            Id = Guid.NewGuid().ToString("N").Substring(0, 10),
            Name = roleName
        };
        var roleDto = new RoleDto
        {
            Id = role.Id,
            Name = role.Name
        };
        await _roleRepository.CreateRoleAsync(role);
        return roleDto;
    }

    public async Task<bool> DeleteRoleAsync(string id)
    {
        return await _roleRepository.DeleteRoleAsync(id);
    }

    public async Task<RoleDto> UpdateRole(RoleDto roleDto)
    {
        var role = new CoreLayer.Entities.Role
        {
            Id = roleDto.Id,
            Name = roleDto.Name
        };
        await _roleRepository.UpdateRole(role);
        return roleDto;
    }
}