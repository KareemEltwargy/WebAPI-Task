using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Core.DTOs;
using WebAPI.Core.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> UserManager;
        public AccountController(UserManager<AppUser> userManager)
        {
            UserManager = userManager;
        }


        [HttpPost("Register")]
        public async Task<IActionResult> Registeration(RegisterDTO registerDTO)
        {
            if (ModelState.IsValid)
            {
                AppUser user = new AppUser();
                user.Email = registerDTO.Email;
                user.UserName = registerDTO.UserName;
                IdentityResult result = await UserManager.CreateAsync(user, registerDTO.Password);
                if (result.Succeeded)
                {
                    return Created();
                }
                var ErrList = new List<string>();
                foreach (var err in result.Errors)
                {
                    ErrList.Add(err.Description);
                }
                return BadRequest(ErrList);
            }
            else return BadRequest(ModelState);
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            if (ModelState.IsValid)
            {
                AppUser user = await UserManager.FindByNameAsync(loginDTO.UserName);
                if(user is null)
                {
                    return Unauthorized();
                }
                bool found = await UserManager.CheckPasswordAsync(user, loginDTO.Password);

                if (found)
                {
                    var claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.Name, user.UserName));
                    claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
                    claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                    SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("qcnasGq7fB8eNBj2dmM3lNM8mjwHVRLkbL3Bw0Ftts="));
                    SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                    JwtSecurityToken token = new JwtSecurityToken(
                        issuer:"",
                        audience:"",
                        claims:claims,
                        expires:DateTime.Now.AddHours(1),
                        signingCredentials: signingCredentials
                        );;
                    return Ok(new {token=token, exp=token.ValidTo });
                }
                return Unauthorized();
            }
            return BadRequest();
        }
    }
}
