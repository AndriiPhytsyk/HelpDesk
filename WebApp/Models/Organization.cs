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
        public ICollection<Project> Projects { get; set; }

    }
}
