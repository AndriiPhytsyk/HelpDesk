using System;
using System.Collections.Generic;

namespace HelpDesk.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public Organization CurrentOrganization { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
        public ICollection<UserProject> UserProjects { get; set; }
        public string Password { get; set; }
        
    }
}