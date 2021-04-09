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
    public interface ILessonJourneyService
    {
        (ResultCode, int?) FirstLesson_Create(int IDaccount, string Level);
        (ResultCode, QueryModel) StudyQuery(int IDaccount);

    }

    public class LessonJourneyService : BaseService, ILessonJourneyService
    {
        public (ResultCode, int?) FirstLesson_Create(int IDaccount, string Level)
        {
            ResultDTO result = _procedureHelper.GetData<ResultDTO>(
                "firstLesson_create", new
                {
                    IDaccount = IDaccount,
                    Level = Level,
                }).FirstOrDefault();
            int ID = result.Result;
            if (0 > ID)
                return ((ResultCode)Math.Abs(ID), null);

            return (ResultCode.SUCCESS, ID);
        }

        public (ResultCode, QueryModel) StudyQuery(int IDaccount)
        {
            List<SectionModel> sections = new List<SectionModel>();
            QueryModel queryResult = new QueryModel();
            fatherIDModel.Instance.fatherID = ID_topic;
            List<SectionContentQueryDTO> section_contentDTOs = _procedureHelper.GetData<SectionContentQueryDTO>(
                "gram_post_section_query", fatherIDModel.Instance);

            foreach (SectionContentQueryDTO content in section_contentDTOs)
            {
                SectionModel tempsec = new SectionModel();
                tempsec.sectionContent = content;
                fatherIDModel.Instance.fatherID = tempsec.sectionContent.ID;
                tempsec.examples = _procedureHelper.GetData<SectionExampleQueryDTO>(
                "gram_post_section_example", fatherIDModel.Instance);
                sections.Add(tempsec);
            }
            if (0 != section_contentDTOs.Count)
                queryResult.TotalRows = section_contentDTOs[0].TotalRows;

            queryResult.Items = sections;
            return (ResultCode.SUCCESS, queryResult);
        }

    }
}