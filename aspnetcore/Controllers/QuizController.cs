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
    public class QuizController : ControllerBase
    {
        private IQuizService _service = null;
        public QuizController(IQuizService service)
        {
            _service = service;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<QuizListQueryDTO>), 200)]
        [ProducesResponseType(500)]
        public IActionResult Query([FromQuery] BaseQueryRequest filter)
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
        [ProducesResponseType(typeof(List<SectionModel>), 200)]
        [ProducesResponseType(500)]
        public IActionResult Quiz_byID_Query([FromQuery] int fatherID)
        {
            ResultCode resultCode; QueryModel queryResult;
            (resultCode, queryResult) = _service.QuizQuery(fatherID);

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