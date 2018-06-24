using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using HelpDesk.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using WebApp.Controllers;
using WebApp.Dtos;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860


[Authorize]
[Route("api/tasks")]
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
        var user = getUserFromToken(false, true);
        if (user != null)
        {
            

            var tasks = user.Tasks.Select(task => new TaskDto { Title = task.Title, ID = task.ID, State = task.State, Description = task.Description, Effort = task.Effort, Progress = task.Progress, StartDate = task.StartDate, EndDate = task.EndDate, CurrentProjectId = task.CurrentProjectId});
            return Ok(tasks);
        }
        else
        {
            return Unauthorized();
        }
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

            if (withTasks)
            {
                user = db.Users.Include(u => u.CurrentOrganization).Include(u => u.Tasks).Where(a => a.ID == Convert.ToInt32(userId)).FirstOrDefault();
            }
            else
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
    public IActionResult Post([FromBody]TaskDto task)
    {
    

        if (ModelState.IsValid)
        {
            int projectId = task.CurrentProjectId;
            var userId = task.User;
            User user = db.Users.Where(u => u.ID == Convert.ToInt32(userId)).FirstOrDefault();
            Project project = db.Projects.Where(project1 => projectId == project1.ID).Single();
            var taskModel = new HelpDesk.Models.Task() { Title = task.Title, User = user, State = task.State, Description = task.Description, Effort = task.Effort, Progress = task.Progress, StartDate = task.StartDate, EndDate = task.EndDate, CurrentProjectId = project.ID, CurrentProject = project };
            

            //task.CurrentProject = project;



            db.Tasks.Add(taskModel);
                db.SaveChanges();

               
            

            return Ok(task);
        }
        return BadRequest(ModelState);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        HelpDesk.Models.Task task = db.Tasks.FirstOrDefault(x => x.ID == id);
        if (task != null)
        {
            db.Tasks.Remove(task);
            db.SaveChanges();
        }
        return Ok(task);
    }

    [HttpPut]
    public IActionResult Put([FromBody]TaskDto taskDto)
    {
        HelpDesk.Models.Task task = db.Tasks.Where(t => t.ID == taskDto.ID).FirstOrDefault();
        task.Title = taskDto.Title;
        task.Description = taskDto.Description;
        task.State = taskDto.State;
        task.Progress = taskDto.Progress;
        task.StartDate = taskDto.StartDate;
        task.EndDate = taskDto.EndDate;

            db.Update(task);
            db.SaveChanges();
            return Ok(task);
    }
}
