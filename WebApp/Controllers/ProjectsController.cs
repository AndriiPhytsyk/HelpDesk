using System.Collections.Generic;
using System.Linq;
using HelpDesk.Models;
using Microsoft.AspNetCore.Mvc;

namespace HelpDesk.Controllers
{
    [Route("api/projects")]
    public class ProjectController : Controller
    {
        ApplicationContext db;
        public ProjectController(ApplicationContext context)
        {
            db = context;


            db.Projects.Add(new Project { Title = "Help-Desk" });
            db.SaveChanges();

        }

        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return db.Projects.ToList();
        }

        [HttpGet("{id}")]
        public Project Get(int id)
        {
            Project project = db.Projects.FirstOrDefault(x => x.ID == id);
            return project;
        }

        [HttpPost]
        public IActionResult Post([FromBody]Project project)
        {
            if (ModelState.IsValid)
            {
                db.Projects.Add(project);
                db.SaveChanges();
                return Ok(project);
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
 