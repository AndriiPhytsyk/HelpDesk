using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

/// <summary>
/// Summary description for Class1
/// </summary>
namespace HelpDesk.Models
{
    public class Organization
    {
       
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<User> Users { get; set; }

        //public Organization()
        //{
        //    this.Projects = new List<Project>();
        //}

    }
}
