using System.Collections;
using aspnetcore.Repositories.DTOs;
using System.Collections.Generic;
namespace aspnetcore.Services.Models
{
    public class SectionModel
    {
        public SectionContentQueryDTO sectionContent { get; set; }
        public List<SectionExampleQueryDTO> examples { get; set; }
        public SectionModel(){
        }
    }
}