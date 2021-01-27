using Microsoft.AspNetCore.Mvc;
using aspnetcore.Controllers.Resources;
using aspnetcore.Helpers;
using System.Collections.Generic;
using aspnetcore.Services.Models;
using aspnetcore.Services;
using aspnetcore.Repositories.DTOs;
using Microsoft.AspNetCore.Authorization;

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
        [ProducesResponseType(typeof(List<VocabularyQueryDTO>), 200)]
        [ProducesResponseType(500)]
        public IActionResult Query([FromQuery] VocabularyQueryRequest filter)
        {
            ResultCode resultCode; QueryModel queryResult;
            (resultCode, queryResult) = _service.Query(filter);

            Result error; int statusCode=0;
            (statusCode, error) = ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response = new GeneralResponse
            {
                Result = queryResult,
                Error = error,
            };
            return StatusCode(statusCode, response);
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<VocabularyByTopicQueryDTO>), 200)]
        [ProducesResponseType(500)]
        public IActionResult VocabByTopicQuery([FromQuery] int fatherID)
        {
            ResultCode resultCode; QueryModel queryResult;
            (resultCode, queryResult) = _service.VocabByTopicQuery(fatherID);

            Result error; int statusCode=0;
            (statusCode, error) = ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response = new GeneralResponse
            {
                Result = queryResult,
                Error = error,
            };
            return StatusCode(statusCode, response);
        }

    }
}