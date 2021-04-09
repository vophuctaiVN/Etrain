using System;
namespace aspnetcore.Repositories.DTOs
{
    public class LessonQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public int ID_account { get; set; }
        public int Times { get; set; }
        public DateTime Title { get; set; }
        public string Level { get; set; }
        public string LessonsID { get; set; }
        public int ExerciseID { get; set; }
    }
}