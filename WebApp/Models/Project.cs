using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

/// <summary>
/// Summary description for Class1
/// </summary>
namespace HelpDesk.Models
{
    public class Project
    {
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }      
        public int CurrentOrganizationId { get; set; }
        public Organization CurrentOrganization { get; set; }
        public ICollection<Task> Tasks { get; set; }
        public ICollection<UserProject> UserProjects { get; set; }


    }

    
}