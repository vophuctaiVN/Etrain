//using Internal;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using aspnetcore.Controllers.Resources;
using aspnetcore.Helpers;
using aspnetcore.Repositories.DTOs;
using aspnetcore.Services.Models;
using Microsoft.IdentityModel.Tokens;

namespace aspnetcore.Services
{
    public interface IForumService
    {
        (ResultCode, int?) Question_Create(QuestionCreateRequest form);
        (ResultCode, QueryModel) ListQuestionQuery(BaseQueryRequest form);
        (ResultCode, int?) Answer_Create(AnswerCreateRequest form);
        (ResultCode, QueryModel) ListAnswerQuery(int fatherID);
    }
    public class ForumService : BaseService, IForumService
    {
        public (ResultCode, int?) Question_Create(QuestionCreateRequest form)
        {
            ResultDTO result = _procedureHelper.GetData<ResultDTO>(
                "question_create", new
                {
                    Question = form.Question,
                    Topic = form.Topic,
                    Detail = form.Detail,
                    IDaccount = form.IDaccount,
                }).FirstOrDefault();
            int ID = result.Result;
            if (0 > ID)
                return ((ResultCode)Math.Abs(ID), null);

            return (ResultCode.SUCCESS, ID);
        }

        public (ResultCode, QueryModel) ListQuestionQuery(BaseQueryRequest form)
        {
            QueryModel queryResult = new QueryModel();

            List<ForumQuestionModel> responseQuestion = new List<ForumQuestionModel>();
            List<ForumQuestionQueryDTO> questionDTOs = _procedureHelper.GetData<ForumQuestionQueryDTO>(
            "question_query", form);

            foreach (ForumQuestionQueryDTO content in questionDTOs)
            {
                ForumQuestionModel tempfullquestion = new ForumQuestionModel();
                tempfullquestion.question = content;

                List<ProfileQueryDTO> infoDTOs = _procedureHelper.GetData<ProfileQueryDTO>(
                    "user_info_query", new { ID = content.ID_account });
                tempfullquestion.profile = infoDTOs[0];
                responseQuestion.Add(tempfullquestion);
            }


            if (0 != questionDTOs.Count)
                queryResult.TotalRows = questionDTOs[0].TotalRows;
            queryResult.Items = responseQuestion;
            return (ResultCode.SUCCESS, queryResult);
        }

        public (ResultCode, int?) Answer_Create(AnswerCreateRequest form)
        {
            ResultDTO result = _procedureHelper.GetData<ResultDTO>(
                "answer_create", new
                {
                    IDquestion = form.IDquestion,
                    Detail = form.Detail,
                    IDaccount = form.IDaccount,
                }).FirstOrDefault();
            int ID = result.Result;
            if (0 > ID)
                return ((ResultCode)Math.Abs(ID), null);

            return (ResultCode.SUCCESS, ID);
        }


        public (ResultCode, QueryModel) ListAnswerQuery(int fatherID)
        {

            QueryModel queryResult = new QueryModel();

            List<ForumAnswerModel> responseAnswer = new List<ForumAnswerModel>();
            List<ForumAnswerQueryDTO> answerDTOs = _procedureHelper.GetData<ForumAnswerQueryDTO>(
            "answer_query", new { IDquestion = fatherID });

            foreach (ForumAnswerQueryDTO content in answerDTOs)
            {
                ForumAnswerModel tempfullanswer = new ForumAnswerModel();
                tempfullanswer.answer = content;

                List<ProfileQueryDTO> infoDTOs = _procedureHelper.GetData<ProfileQueryDTO>(
                    "user_info_query", new { ID = content.ID_account });
                tempfullanswer.profile = infoDTOs[0];
                responseAnswer.Add(tempfullanswer);
            }

            if (0 != answerDTOs.Count)
                queryResult.TotalRows = answerDTOs[0].TotalRows;
            queryResult.Items = responseAnswer;
            return (ResultCode.SUCCESS, queryResult);
        }

    }

}