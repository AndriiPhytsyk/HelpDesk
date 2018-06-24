using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using HelpDesk.Models;

namespace HelpDesk.Controllers
{
    [Route("api/organizations")]
    public class OrganizationController: Controller
    {
        ApplicationContext db;
        public OrganizationController(ApplicationContext context)
        {

            db = context;

            Organization organization = new Organization { Title = "NetFully" };
                db.Organizations.Add(organization);
            Project project = new Project { Title = "HelpDesk", CurrentOrganization = organization };
                db.SaveChanges();
            Task task = new Task { Description = "Вивчити dot.net", CurrentProject = project };
            db.Tasks.Add(task);
            db.Users.Add(new User { Name = "Andrii", Tasks = new List<Task> {task}, CurrentOrganization = organization});
            db.SaveChanges();
        }

        [HttpGet]
        public IEnumerable<Organization> Get()
        {
            return db.Organizations.ToList();
        }

        [HttpGet("{id}")]
        public Organization Get(int id)
        {
            Organization organization = db.Organizations.FirstOrDefault(x => x.ID == id);
            return organization;
        }

        [HttpPost]
        public IActionResult Post([FromBody]Organization organization)
        {
            if (ModelState.IsValid)
            {
                db.Organizations.Add(organization);
                db.SaveChanges();
                return Ok(organization);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Organization organization)
        {
            if (ModelState.IsValid)
            {
                db.Update(organization);
                db.SaveChanges();
                return Ok(organization);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Organization organization = db.Organizations.FirstOrDefault(x => x.ID == id);
            if (organization != null)
            {
                db.Organizations.Remove(organization);
                db.SaveChanges();
            }
            return Ok(organization);
        }
    }
}