using System;
using System.Text.Json.Serialization;
using aspnetcore.Repositories.DTOs;

namespace aspnetcore.Services.Models
{
    public class ForumQuestionModel
    {
        public ForumQuestionQueryDTO question { get; set; }
        public ProfileQueryDTO profile { get; set; }
        public ForumQuestionModel(){}
    }

    public class ForumAnswerModel
    {
        public ForumAnswerQueryDTO answer { get; set; }
        public ProfileQueryDTO profile { get; set; }
        public ForumAnswerModel(){}
    }
}