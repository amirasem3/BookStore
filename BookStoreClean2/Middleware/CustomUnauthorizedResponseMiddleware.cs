﻿using System.Text.Json;

namespace BookStoreClean2.Middleware;

public class CustomUnauthorizedResponseMiddleware
{

    private readonly RequestDelegate _next;
    public CustomUnauthorizedResponseMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        await _next(context);

        if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
        {
            var response = new
            {
                type = "https://tools.ietf.org/html/rfc9110#section-15.5.2",
                title = "Unauthorized",
                status = 401,
                traceId = context.TraceIdentifier,
            };

            context.Response.ContentType = "application/json";
            var responseJson = JsonSerializer.Serialize(response);
            await context.Response.WriteAsync(responseJson);
        }
    }
}