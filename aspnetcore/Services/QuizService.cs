using System.IO;
using System.Collections.Generic;
using aspnetcore.Controllers.Resources;
using aspnetcore.Helpers;
using aspnetcore.Repositories.DTOs;
using aspnetcore.Services.Models;
using System.Linq;
using System;

namespace aspnetcore.Services
{
    public interface IQuizService
    {
        (ResultCode, QueryModel) Query(BaseQueryRequest filter);
        
        (ResultCode, QueryModel) QuizQuery(int ID_topic);
    }
    public class QuizService : BaseService, IQuizService
    {       
        public (ResultCode, QueryModel) Query(BaseQueryRequest filter)
        {
            QueryModel queryResult = new QueryModel();
            List<QuizListQueryDTO> grammarDTOs = _procedureHelper.GetData<QuizListQueryDTO>(
                "quiz_table_query", filter);
            if (0 != grammarDTOs.Count)
                queryResult.TotalRows = grammarDTOs[0].TotalRows;
            queryResult.Items = grammarDTOs;
            return (ResultCode.SUCCESS, queryResult);
        }

        public (ResultCode, QueryModel) QuizQuery(int ID_topic)
        {
            QueryModel queryResult = new QueryModel();            
            QuizModel quiz = new QuizModel();
                fatherIDModel.Instance.fatherID = ID_topic;
            List<QuizListQueryDTO> grammarDTOs = _procedureHelper.GetData<QuizListQueryDTO>(
                "quiz_info_byID", fatherIDModel.Instance);    
                quiz.quizinfo = grammarDTOs[0];            

                fatherIDModel.Instance.fatherID = quiz.quizinfo.ID;
               List<QuestionQueryDTO> question = _procedureHelper.GetData<QuestionQueryDTO>(
                "quiz_question_query", fatherIDModel.Instance);
                quiz.questions = question;
            if (0 != grammarDTOs.Count)
                queryResult.TotalRows = quiz.quizinfo.TotalRows;
      

            List<QuizModel> sections = new List<QuizModel>();
            sections.Add(quiz);
            queryResult.Items = sections; 
            return (ResultCode.SUCCESS, queryResult);
        }

    }
}