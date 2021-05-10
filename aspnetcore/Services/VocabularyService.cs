using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using aspnetcore.Controllers.Resources;
using aspnetcore.Helpers;
using aspnetcore.Repositories.DTOs;
using aspnetcore.Services.Models;

namespace aspnetcore.Services
{
    public interface IVocabularyService
    {
        (ResultCode, QueryModel) Query(VocabularyQueryRequest filter);

        (ResultCode, QueryModel) VocabByTopicQuery(int ID_topic);

        (ResultCode, QueryModel) MyVocabularyQuery(int accountID);
    }

    public class VocabularyService : BaseService, IVocabularyService
    {
        public (ResultCode, QueryModel) Query(VocabularyQueryRequest filter)
        {
            QueryModel queryResult = new QueryModel();
            List<VocabularyQueryDTO> VocabularyDTOs =
                _procedureHelper
                    .GetData<VocabularyQueryDTO>("vocab_topics_table_query",
                    filter);
            if (0 != VocabularyDTOs.Count)
                queryResult.TotalRows = VocabularyDTOs[0].TotalRows;
            queryResult.Items = VocabularyDTOs;
            return (ResultCode.SUCCESS, queryResult);
        }

        public (ResultCode, QueryModel) VocabByTopicQuery(int ID_topic)
        {
            QueryModel queryResult = new QueryModel();
            fatherIDModel.Instance.fatherID = ID_topic;
            List<VocabularyByTopicQueryDTO> VocabularyDTOs =
                _procedureHelper
                    .GetData<VocabularyByTopicQueryDTO>("vocab_by_topic",
                    fatherIDModel.Instance);
            if (0 != VocabularyDTOs.Count)
                queryResult.TotalRows = VocabularyDTOs[0].TotalRows;
            queryResult.Items = VocabularyDTOs;
            return (ResultCode.SUCCESS, queryResult);
        }

        public (ResultCode, QueryModel) MyVocabularyQuery(int accountID)
        {
            QueryModel queryResult = new QueryModel();
            List<int> myVocabularyIDs =
                _procedureHelper
                    .GetData<int>("getMyWords", new { IDaccount = accountID });
            queryResult.TotalRows = myVocabularyIDs.Count;
            queryResult.Items = myVocabularyIDs;
            return (ResultCode.SUCCESS, queryResult);
        }
    }
}
