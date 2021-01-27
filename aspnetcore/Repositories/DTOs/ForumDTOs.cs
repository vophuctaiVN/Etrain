using System;

namespace aspnetcore.Repositories.DTOs
{
    public class ForumQuestionQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public string Question { get; set; }   
        public string Topic { get; set; }        
        public string Detail { get; set; }
        public int ID_account { get; set; }
        public DateTime Time { get; set; }
        public int NumberOfAnswer { get; set; }   
    }

    public class ForumAnswerQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public int ID_question { get; set; }     
        public string Detail { get; set; }
        public int ID_account { get; set; }
        public DateTime Time { get; set; }
    }
}