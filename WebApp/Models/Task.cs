using System;
using System.ComponentModel.DataAnnotations;

namespace HelpDesk.Models {
    public class Task
    {
        [Key]
        public int ID { get; set; }
        public User User { get; set; }
        public string State { get; set; }
        public string Description { get; set; }
        public int Effort { get; set; }
        public int Progress { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CurrentProjectId { get; set; }
        public Project CurrentProject { get; set; }

        public Task()
	{
		//
		// TODO: Add constructor logic here
		//
	}
}
}