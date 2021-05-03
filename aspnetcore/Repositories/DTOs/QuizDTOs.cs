namespace aspnetcore.Repositories.DTOs
{
    public class QuizListQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool RecordStatus { get; set; }
    }

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

        public string explanation { get; set; }
    }
}
