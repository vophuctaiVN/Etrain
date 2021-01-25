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
    public interface IVocabularyService
    {
        (ResultCode, QueryModel) Query(VocabularyQueryRequest filter);
        (ResultCode, QueryModel) VocabByTopicQuery(int ID_topic);
    }
    public class VocabularyService : BaseService, IVocabularyService
    {       
        public (ResultCode, QueryModel) Query(VocabularyQueryRequest filter)
        {
            QueryModel queryResult = new QueryModel();
            List<VocabularyQueryDTO> VocabularyDTOs = _procedureHelper.GetData<VocabularyQueryDTO>(
                "vocab_topics_table_query", filter);
            if (0 != VocabularyDTOs.Count)
                queryResult.TotalRows = VocabularyDTOs[0].TotalRows;
            queryResult.Items = VocabularyDTOs;
            return (ResultCode.SUCCESS, queryResult);
        }
        public (ResultCode, QueryModel) VocabByTopicQuery(int ID_topic)
        {
            QueryModel queryResult = new QueryModel();
            fatherIDModel.Instance.fatherID = ID_topic;
            List<VocabularyByTopicQueryDTO> VocabularyDTOs = _procedureHelper.GetData<VocabularyByTopicQueryDTO>(
                "vocab_by_topic", fatherIDModel.Instance);
            if (0 != VocabularyDTOs.Count)
                queryResult.TotalRows = VocabularyDTOs[0].TotalRows;
            queryResult.Items = VocabularyDTOs;
            return (ResultCode.SUCCESS, queryResult);
        }

        
    }
}