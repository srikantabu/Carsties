using System;
using System.Security.Claims;
using Duende.IdentityModel;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services;

public class CustomProfileService : IProfileService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public CustomProfileService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = await _userManager.GetUserAsync(context.Subject);
        if (user is null)
        {
            // No user → no claims to issue. You can also log here.
            return;
        }

        var existingClaims = await _userManager.GetClaimsAsync(user);

        var claims = new List<Claim>
        {
            new Claim("username", user.UserName ?? string.Empty)
        };

        context.IssuedClaims.AddRange(claims);

        var nameClaim = existingClaims.FirstOrDefault(x => x.Type == JwtClaimTypes.Name);
        if (nameClaim is not null)
        {
            context.IssuedClaims.Add(nameClaim);
        }
    }


    public Task IsActiveAsync(IsActiveContext context)
    {
        return Task.CompletedTask;
    }
}
