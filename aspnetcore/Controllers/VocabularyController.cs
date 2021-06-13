using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using RestSharp.Authenticators;
using aspnetcore.Controllers.Resources;
using aspnetcore.Helpers;
using aspnetcore.Repositories.DTOs;
using aspnetcore.Services;
using aspnetcore.Services.Models;

namespace aspnetcore.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class VocabularyController : ControllerBase
    {
        private IVocabularyService _service = null;

        public VocabularyController(IVocabularyService service)
        {
            _service = service;
        }

        [HttpGet]
        [ProducesResponseType(typeof (List<VocabularyQueryDTO>), 200)]
        [ProducesResponseType(500)]
        public IActionResult Query([FromQuery] VocabularyQueryRequest filter)
        {
            ResultCode resultCode;
            QueryModel queryResult;
            (resultCode, queryResult) = _service.Query(filter);

            Result error;
            int statusCode = 0;
            (statusCode, error) =
                ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response =
                new GeneralResponse { Result = queryResult, Error = error };
            return StatusCode(statusCode, response);
        }

        [HttpGet]
        [ProducesResponseType(typeof (List<VocabularyByTopicQueryDTO>), 200)]
        [ProducesResponseType(500)]
        public IActionResult VocabByTopicQuery([FromQuery] int fatherID)
        {
            ResultCode resultCode;
            QueryModel queryResult;
            (resultCode, queryResult) = _service.VocabByTopicQuery(fatherID);

            Result error;
            int statusCode = 0;
            (statusCode, error) =
                ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response =
                new GeneralResponse { Result = queryResult, Error = error };
            return StatusCode(statusCode, response);
        }

        [HttpGet]
        [ProducesResponseType(typeof (List<int>), 200)]
        [ProducesResponseType(500)]
        public IActionResult
        MyVocabularyQuery([FromQuery] int accountID, Boolean showDetail = false)
        {
            ResultCode resultCode;
            QueryModel queryResult;
            (resultCode, queryResult) =
                _service.MyVocabularyQuery(accountID, showDetail);

            Result error;
            int statusCode = 0;
            (statusCode, error) =
                ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response =
                new GeneralResponse { Result = queryResult, Error = error };
            return StatusCode(statusCode, response);
        }

        [HttpPost]
        [ProducesResponseType(typeof (List<int>), 200)]
        [ProducesResponseType(500)]
        public IActionResult RememberForgetWord(int accountID, int wordID)
        {
            ResultCode resultCode;
            QueryModel queryResult;
            (resultCode, queryResult) =
                _service.RememberForgetWord(accountID, wordID);

            Result error;
            int statusCode = 0;
            (statusCode, error) =
                ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response =
                new GeneralResponse { Result = queryResult, Error = error };
            return StatusCode(statusCode, response);
        }

        [HttpGet]
        public string RelatedWordsQuery(string word)
        {
            RestClient client =
                new RestClient("https://relatedwords.org/api/related?term=" +
                    word);

            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            return response.Content;
        }

        [HttpGet]
        public string GoogleWordsQuery(string word)
        {
            RestClient client =
                new RestClient("https://api.dictionaryapi.dev/api/v2/entries/en/" +
                    word);

            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            return response.Content;
        }

        [HttpPost]
        [ProducesResponseType(typeof (List<int>), 200)]
        [ProducesResponseType(500)]
        public IActionResult
        AddDicWord(int accountID, [FromBody] CreateVocabularyModel form)
        {
            ResultCode resultCode;
            int? queryResult;
            (resultCode, queryResult) = _service.AddDicWord(accountID, form);

            Result error;
            int statusCode = 0;
            (statusCode, error) =
                ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response = new GeneralResponse { Error = error };
            return StatusCode(statusCode, response);
        }
    }
}
