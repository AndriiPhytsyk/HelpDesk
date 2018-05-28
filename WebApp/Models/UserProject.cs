using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HelpDesk.Models
{
    public class UserProject
    {
        public int UserID { get; set; }
        public User User { get; set; }
        public int ProjectID { get; set; }
        public Project Project { get; set; }
    }
}
