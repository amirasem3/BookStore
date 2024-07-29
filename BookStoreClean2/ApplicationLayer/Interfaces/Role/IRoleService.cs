using BookStoreClean2.ApplicationLayer.DTOs.Role;

namespace BookStoreClean2.ApplicationLayer.Interfaces.Role;

public interface IRoleService
{
    public Task<RoleDto> GetRoleByIdAsync(string id);
    public Task<IEnumerable<RoleDto>> GetAllRolesAsync();

    public Task<RoleDto> GetRoleIdByName(string name);

    public Task<RoleDto> CreateRoleAsync(string roleName);

    public Task<bool> DeleteRoleAsync(string id);

    public Task<RoleDto> UpdateRole(RoleDto roleDto);
}