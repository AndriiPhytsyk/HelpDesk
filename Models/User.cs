using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HelpDesk.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public virtual Organization CurrentOrganization { get; set; }
        public int CurrentOrganizationID { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
        public ICollection<UserProject> UserProjects { get; set; } = new List<UserProject>();
        public string Password { get; set; }
        
    }
}