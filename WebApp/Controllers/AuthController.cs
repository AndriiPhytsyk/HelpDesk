using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HelpDesk.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApp.Dtos;
using WebApp.Helpers;

namespace WebApp.Controllers
{
    [Authorize]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly AppSettings _appSettings;
        private ApplicationContext db;
        public AuthController(ApplicationContext db,
            IOptions<AppSettings> appSetting)
        {
            _appSettings = appSetting.Value;
            this.db = db;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody]UserDto userDto)
        {
            User user = db.Users.Where(a => a.Name == userDto.Name && a.Password == userDto.Password).FirstOrDefault();
        
            if (user == null)
                return Unauthorized();
            return CreateToken(user);
        }

        private IActionResult CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.ID.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Ok(new
            {
                Id = user.ID,
                Username = user.Name,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            User user = db.Users.Where(a => a.Name == userDto.Name).FirstOrDefault();
            if (user != null)
            {
                return StatusCode(401);
            }
            Organization organization = db.Organizations.Where(a => a.Title == userDto.Organization).FirstOrDefault();
            if (organization == null)
            {
                organization = new Organization() { Title = userDto.Organization };
                db.Organizations.Add(organization);
                db.SaveChanges();
            }
            user = new User() { Name = userDto.Name, CurrentOrganization = organization, Password = userDto.Password };
            db.Users.Add(user);
            db.SaveChanges();
            return CreateToken(user);
        }
    }
}
