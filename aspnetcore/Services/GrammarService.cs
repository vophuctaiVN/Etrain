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
    public interface IGrammarService
    {
        (ResultCode, QueryModel) Query(GrammarQueryRequest filter);
        (ResultCode, QueryModel) SectionQuery(int ID_topic);
    }
    public class GrammarService : BaseService, IGrammarService
    {       
        public (ResultCode, QueryModel) Query(GrammarQueryRequest filter)
        {
            QueryModel queryResult = new QueryModel();
            List<GrammarQueryDTO> grammarDTOs = _procedureHelper.GetData<GrammarQueryDTO>(
                "gram_topic_table_query", filter);
            if (0 != grammarDTOs.Count)
                queryResult.TotalRows = grammarDTOs[0].TotalRows;
            queryResult.Items = grammarDTOs;
            return (ResultCode.SUCCESS, queryResult);
        }

        public (ResultCode, QueryModel) SectionQuery(int ID_topic)
        {
            List<SectionModel> sections = new List<SectionModel>();
            QueryModel queryResult = new QueryModel();
                fatherIDModel.Instance.fatherID = ID_topic;
            List<SectionContentQueryDTO> section_contentDTOs = _procedureHelper.GetData<SectionContentQueryDTO>(
                "gram_post_section_query", fatherIDModel.Instance);                

            foreach(SectionContentQueryDTO content in section_contentDTOs){
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