using System.Collections;
using aspnetcore.Repositories.DTOs;
using System.Collections.Generic;
namespace aspnetcore.Services.Models
{
    public class QuizModel
    {
        public QuizListQueryDTO quizinfo { get; set; }
        public List<QuestionQueryDTO> questions { get; set; }
        public QuizModel(){
        }
    }
}