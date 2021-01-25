namespace aspnetcore.Repositories.DTOs
{
    public class QuestionQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public int ID_quiz { get; set; }
        public string question { get; set; }
        public string questionType { get; set; }
        public string questionPic { get; set; }
        public string answerSelectionType { get; set; }
        public string answers { get; set; }
        public string correctAnswer { get; set; }
    }
}