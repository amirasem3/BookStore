using BookStoreClean2.ApplicationLayer.DTOs.Role;
using BookStoreClean2.ApplicationLayer.Interfaces.Role;
using BookStoreClean2.ApplicationLayer.Services.Role;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreClean2.Controllers.Role;

[ApiController]
[Route("api/[controller]")]
public class RoleController : ControllerBase
{
    private readonly IRoleService _roleService;

    public RoleController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    [HttpGet("GetRoleById")]
    public async Task<IActionResult> GetRoleById(string id)
    {
        var role = await _roleService.GetRoleByIdAsync(id);
        if (role == null)
        {
            return NotFound($"There is no role with ID {id}.");
        }

        return Ok(role);
    }

    [HttpGet("GetAllRoles")]
    public async Task<IActionResult> GetAllRoles()
    {
        var roles = await _roleService.GetAllRolesAsync();
        return Ok(roles);
    }

    [HttpGet("GetRoleIdByName")]
    public async Task<IActionResult> GetRoleIdByName(string name)
    {
        var role = await _roleService.GetRoleIdByName(name);
        if (role == null)
        {
            return NotFound($"There is no role with Name {name}.");
        }

        return Ok(role);
    }

    [HttpPost("CreateRole")]
    public async Task<IActionResult> CreateRoleAsync(string roleName)
    {
        var newRole = await _roleService.CreateRoleAsync(roleName);
        return Ok(newRole);
    }

    [HttpDelete("DeleteRole")]
    public async Task<IActionResult> DeleteRoleAsync(string roleId)
    {
        var result = await _roleService.DeleteRoleAsync(roleId);
        if (!result)
        {
            return NotFound($"The Role {roleId} is not exist!");
        }

        return Ok($"The role with ID ({roleId}) successfully deleted");
    }

    [HttpPut("UpdateRole")]
    public async Task<IActionResult> UpdateRoleAsync(RoleDto roleDto)
    {
        var result = await _roleService.UpdateRole(roleDto);
        if (result==null)
        {
            return NotFound($"The Role {roleDto.Id} is not exist!");
        }

        return Ok(result);
    }
}