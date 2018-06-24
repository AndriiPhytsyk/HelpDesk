using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HelpDesk.Models;

namespace WebApp.Dtos
{
    public class TaskDto
    {
        public string Title { get; set; }
        public int ID { get; set; }     
        public string State { get; set; }
        public string Description { get; set; }
        public int Effort { get; set; }
        public int Progress { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CurrentProjectId { get; set; }
        public int User { get; set; }

    }
}
