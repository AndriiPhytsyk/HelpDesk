using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using HelpDesk.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using WebApp.Dtos;

namespace HelpDesk.Controllers
{
    [Authorize]
    [Route("api/projects")]
    public class ProjectController : Controller
    {
        ApplicationContext db;
        public ProjectController(ApplicationContext context)
        {
            db = context;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = getUserFromToken(true);
            if (user != null)
            {
                var projectsIds = user.UserProjects.Select(userProject => userProject.ProjectID);
                var projects = db.Projects.Where(project => projectsIds.Contains(project.ID)).Select(project => new ProjectDto() { ID = project.ID, Title = project.Title });


                return Ok(projects);
            }
            else
            {
                return Unauthorized();
            }

        }

        [HttpGet("{id}")]
        public Project Get(int id)
        {
            Project project = db.Projects.FirstOrDefault(x => x.ID == id);
            return project;
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

        [HttpPost]
        public IActionResult Post([FromBody]ProjectDto projectDto)
        {
            User user = getUserFromToken();

            if (ModelState.IsValid && user != null)
            {
                var userIds = projectDto.MembersId;

                var users = db.Users.Where(u => userIds.Contains(u.ID));

                Project project = new Project { Title = projectDto.Title };

                Organization organization = user.CurrentOrganization;

                project.CurrentOrganization = organization;

                project.CurrentOrganizationId = organization.ID;

                db.Projects.Add(project);
                db.SaveChanges();             

                foreach(User u in users)
                {
                    u.UserProjects.Add(new UserProject() { User = u, UserID = u.ID, Project = project, ProjectID = project.ID });
                }

                db.SaveChanges();


                return Ok(new ProjectDto() { ID = project.ID, Title = project.Title });
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Project project)
        {
            if (ModelState.IsValid)
            {
                db.Update(project);
                db.SaveChanges();
                return Ok(project);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Project project = db.Projects.FirstOrDefault(x => x.ID == id);
            if (project != null)
            {
                db.Projects.Remove(project);
                db.SaveChanges();
            }
            return Ok(project);
        }
    }
}
