using aspnetcore.Repositories.DTOs;

namespace aspnetcore.Services.Models
{
    public class LessonJourneyModel
    {
        public int ID { get; set; }
        public string Status { get; set; }
        public LessonJourneyModel() { }
        public LessonJourneyModel(LessonQueryDTO dto)
        {
            ID = dto.ID;
            Status = dto.Status;
        }
    }
}