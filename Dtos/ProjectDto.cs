using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Dtos
{
    public class ProjectDto
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public ICollection<int> MembersId { get; set; }
    }
}
