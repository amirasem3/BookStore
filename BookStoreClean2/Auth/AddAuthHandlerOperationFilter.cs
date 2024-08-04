using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace BookStoreClean2.Auth;

public class AddAuthHandlerOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (operation.Parameters == null)
            operation.Parameters = new List<OpenApiParameter>();

        var isAuthorized = context.ApiDescription.ActionDescriptor.EndpointMetadata
            .Any(em => em.GetType() == typeof(Microsoft.AspNetCore.Authorization.AuthorizeAttribute));

        if (isAuthorized)
        {
            operation.Parameters.Add(new OpenApiParameter
            {
                Name = "Cookie",
                In = ParameterLocation.Header,
                Required = false
            });
        }
    }
}