using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using HelpDesk.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using WebApp.Dtos;

namespace HelpDesk.Controllers
{
    [Authorize]
    [Route("api/users")]
    public class UserController: Controller
    {
        ApplicationContext db;
        public UserController(ApplicationContext context)
        {
            db = context;
            
           
        }

        [HttpGet("all")]
        public IActionResult Get()
        {
            var user = getUserFromToken();
            var organizationID = user.CurrentOrganizationID;

            var organization = db.Organizations.Where(o => o.ID == organizationID).Include(o => o.Users).FirstOrDefault();
            var users = organization.Users;
            var userDtos = users.Select(u => new UserDto { Name = u.Name, Id = u.ID });
            return Ok(userDtos);
            
        }

        private User getUserFromToken(bool withProjects = false, bool withTasks = false)
        {
            var headers = this.Request.Headers;
            if (headers.ContainsKey("Authorization"))
            {
                StringValues token;
                headers.TryGetValue("Authorization", out token);
                var tokenText = token.ToString().Replace("Bearer ", "");
                var handler = new JwtSecurityTokenHandler();
                var tokenS = handler.ReadToken(tokenText) as JwtSecurityToken;

                tokenS.Payload.TryGetValue("unique_name", out var userId);
                User user;

                if (withProjects)
                {
                    user = db.Users.Include(u => u.CurrentOrganization).Include(u => u.UserProjects).Where(a => a.ID == Convert.ToInt32(userId)).FirstOrDefault();

                }
                else
                {
                    user = db.Users.Include(u => u.CurrentOrganization).Where(a => a.ID == Convert.ToInt32(userId)).FirstOrDefault();

                }

                return user;
            }
            return null;
        }

        [HttpGet("getProjectUsers/{id}")]
        public IActionResult GetProjectUsers(int id)
        {
            var user = getUserFromToken();

            var project = db.Projects.Where(p => p.ID == id).Include(p => p.UserProjects).FirstOrDefault();

            var userIds = project.UserProjects.Select(up => up.UserID);

            var users = db.Users.Where(u => userIds.Contains(u.ID)).Select(u => new UserDto { Name = u.Name, Id = u.ID });

            return Ok(users);
        }

        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                db.SaveChanges();
                return Ok(user);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]User user)
        {
            if (ModelState.IsValid)
            {
                db.Update(user);
                db.SaveChanges();
                return Ok(user);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            User user = db.Users.FirstOrDefault(x => x.ID == id);
            if (user != null)
            {
                db.Users.Remove(user);
                db.SaveChanges();
            }
            return Ok(user);
        }
    }
}