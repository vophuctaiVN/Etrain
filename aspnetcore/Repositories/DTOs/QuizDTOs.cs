namespace aspnetcore.Repositories.DTOs
{
    public class QuizListQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool RecordStatus { get; set; }
    }
}