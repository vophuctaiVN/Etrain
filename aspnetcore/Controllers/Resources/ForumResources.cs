using Microsoft.AspNetCore.Http;

namespace aspnetcore.Controllers.Resources
{
    public class QuestionCreateRequest
    {
        public string Question { get; set; }
        public string Topic { get; set; }            
        public string Detail { get; set; }    
        public int IDaccount  { get; set; }
    }

    public class AnswerCreateRequest
    { 
        public int IDquestion { get; set; }          
        public string Detail { get; set; }    
        public int IDaccount  { get; set; }
    }
}