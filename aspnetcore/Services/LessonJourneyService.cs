using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using aspnetcore.Controllers.Resources;
using aspnetcore.Helpers;
using aspnetcore.Repositories.DTOs;
using aspnetcore.Services.Models;

namespace aspnetcore.Services
{
    public interface ILessonJourneyService
    {
        (ResultCode, int?) FirstLesson_Create(int IDaccount, string Level);

        (ResultCode, QueryModel) StudyQuery(int IDaccount);

        (ResultCode, QueryModel) ReviewQuery(int IDaccount);

        (ResultCode, int?) StudyOrReviewDone(int IDrow, string typeDone);
    }

    public class LessonJourneyService : BaseService, ILessonJourneyService
    {
        public (ResultCode, int?)
        FirstLesson_Create(int IDaccount, string Level)
        {
            ResultDTO result =
                _procedureHelper
                    .GetData<ResultDTO>("firstLesson_create",
                    new { IDaccount = IDaccount, Level = Level })
                    .FirstOrDefault();
            int ID = result.Result;
            if (0 > ID) return ((ResultCode) Math.Abs(ID), null);

            return (ResultCode.SUCCESS, ID);
        }

        public (ResultCode, QueryModel) StudyQuery(int IDaccount)
        {
            QueryModel queryResult = new QueryModel();
            List<LessonQueryDTO> lessonQueryDTOs =
                _procedureHelper
                    .GetData<LessonQueryDTO>("todayless_query",
                    new { IDaccount = IDaccount });

            List<LessonJourneyModel> lessons = new List<LessonJourneyModel>();
            foreach (var item in lessonQueryDTOs)
            {
                LessonJourneyModel lesson = new LessonJourneyModel(item);

                List<ExpandoObject> ArrayGramVocab = new List<ExpandoObject>();
                foreach (var obj in ((dynamic) lesson).ArrayLesson)
                {
                    Console.WriteLine(obj.key);
                    if (obj.key.Equals("g"))
                    {
                        QueryModel queryGramResult = new QueryModel();
                        GrammarQueryRequest filter = new GrammarQueryRequest();
                        filter.ID = Int32.Parse(obj.value);
                        Console.WriteLine(filter.ID);
                        List<GrammarQueryDTO> grammarDTOs =
                            _procedureHelper
                                .GetData
                                <GrammarQueryDTO>("gram_topic_table_query",
                                filter);

                        dynamic dynObject = new ExpandoObject();
                        dynObject.content = grammarDTOs[0];
                        dynObject.type = obj.key;
                        ArrayGramVocab.Add (dynObject);
                    }
                    else if (obj.key.Equals("v"))
                    {
                        QueryModel queryGramResult = new QueryModel();
                        VocabularyQueryRequest filter =
                            new VocabularyQueryRequest();
                        filter.ID = Int32.Parse(obj.value);
                        Console.WriteLine(filter.ID);
                        List<GrammarQueryDTO> grammarDTOs =
                            _procedureHelper
                                .GetData
                                <GrammarQueryDTO>("vocab_topics_table_query",
                                filter);

                        dynamic dynObject = new ExpandoObject();
                        dynObject.content = grammarDTOs[0];
                        dynObject.type = obj.key;
                        ArrayGramVocab.Add (dynObject);
                    }
                }
                ((dynamic) lesson).ArrayLesson = ArrayGramVocab;
                lessons.Add (lesson);
            }
            queryResult.Items = lessons;
            return (ResultCode.SUCCESS, queryResult);
        }

        public (ResultCode, QueryModel) ReviewQuery(int IDaccount)
        {
            QueryModel queryResult = new QueryModel();
            List<LessonQueryDTO> lessonQueryDTOs =
                _procedureHelper
                    .GetData<LessonQueryDTO>("reviewLessons_query",
                    new { IDaccount = IDaccount });

            List<LessonJourneyModel> lessons = new List<LessonJourneyModel>();
            foreach (var item in lessonQueryDTOs)
            {
                LessonJourneyModel lesson = new LessonJourneyModel(item);

                List<ExpandoObject> ArrayGramVocab = new List<ExpandoObject>();
                foreach (var obj in ((dynamic) lesson).ArrayLesson)
                {
                    Console.WriteLine(obj.key);
                    if (obj.key.Equals("g"))
                    {
                        QueryModel queryGramResult = new QueryModel();
                        GrammarQueryRequest filter = new GrammarQueryRequest();
                        filter.ID = Int32.Parse(obj.value);
                        Console.WriteLine(filter.ID);
                        List<GrammarQueryDTO> grammarDTOs =
                            _procedureHelper
                                .GetData
                                <GrammarQueryDTO>("gram_topic_table_query",
                                filter);

                        dynamic dynObject = new ExpandoObject();
                        dynObject.content = grammarDTOs[0];
                        dynObject.type = obj.key;
                        ArrayGramVocab.Add (dynObject);
                    }
                    else if (obj.key.Equals("v"))
                    {
                        QueryModel queryGramResult = new QueryModel();
                        VocabularyQueryRequest filter =
                            new VocabularyQueryRequest();
                        filter.ID = Int32.Parse(obj.value);
                        Console.WriteLine(filter.ID);
                        List<GrammarQueryDTO> grammarDTOs =
                            _procedureHelper
                                .GetData
                                <GrammarQueryDTO>("vocab_topics_table_query",
                                filter);

                        dynamic dynObject = new ExpandoObject();
                        dynObject.content = grammarDTOs[0];
                        dynObject.type = obj.key;
                        ArrayGramVocab.Add (dynObject);
                    }
                }
                ((dynamic) lesson).ArrayLesson = ArrayGramVocab;
                lessons.Add (lesson);
            }
            queryResult.Items = lessons;
            return (ResultCode.SUCCESS, queryResult);
        }

        public (ResultCode, int?) StudyOrReviewDone(int IDrow, string typeDone)
        {
            string url = "";
            if (typeDone == "study")
                url = "studyDone";
            else if (typeDone == "review") url = "reviewDone";

            ResultDTO result =
                _procedureHelper
                    .GetData<ResultDTO>(url, new { IDreviewRow = IDrow })
                    .FirstOrDefault();
            int ID = result.Result;
            if (0 > ID) return ((ResultCode) Math.Abs(ID), null);

            return (ResultCode.SUCCESS, ID);
        }
    }
}
