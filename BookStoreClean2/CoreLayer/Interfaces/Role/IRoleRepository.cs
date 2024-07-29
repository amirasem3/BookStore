namespace BookStoreClean2.CoreLayer.Interfaces.Role;

public interface IRoleRepository
{
    public Task<Entities.Role> GetRoleByIdAsync(string id);

    public Task<Entities.Role> GetRoleIdByName(string name);
    public Task<IEnumerable<Entities.Role>> GetAllRolesAsync();

    public Task<Entities.Role> CreateRoleAsync(Entities.Role role);

    public Task<bool> DeleteRoleAsync(string id);

    Task <Entities.Role>UpdateRole(Entities.Role role);
}