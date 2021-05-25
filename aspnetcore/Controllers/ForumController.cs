using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using aspnetcore.Controllers.Resources;
using aspnetcore.Helpers;
using aspnetcore.Repositories.DTOs;
using aspnetcore.Services;
using aspnetcore.Services.Models;

namespace aspnetcore.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ForumController : ControllerBase
    {
        private IForumService _service = null;

        public ForumController(IForumService service)
        {
            _service = service;
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult
        Question_Create([FromForm] QuestionCreateRequest form)
        {
            ResultCode resultCode;
            int? productID;
            (resultCode, productID) = _service.Question_Create(form);

            Result error;
            int statusCode;
            (statusCode, error) =
                ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response =
                new GeneralResponse { Result = productID, Error = error };
            return StatusCode(statusCode, response);
        }

        [HttpGet]
        [ProducesResponseType(typeof (List<SectionModel>), 200)]
        [ProducesResponseType(500)]
        public IActionResult
        ListQuestionQuery([FromQuery] QuestionQueryRequest form)
        {
            ResultCode resultCode;
            QueryModel queryResult;
            (resultCode, queryResult) = _service.ListQuestionQuery(form);

            Result error;
            int statusCode = 0;
            (statusCode, error) =
                ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response =
                new GeneralResponse { Result = queryResult, Error = error };
            return StatusCode(statusCode, response);
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Answer_Create([FromForm] AnswerCreateRequest form)
        {
            ResultCode resultCode;
            int? productID;
            (resultCode, productID) = _service.Answer_Create(form);

            Result error;
            int statusCode;
            (statusCode, error) =
                ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response =
                new GeneralResponse { Result = productID, Error = error };
            return StatusCode(statusCode, response);
        }

        [HttpGet]
        [ProducesResponseType(typeof (List<SectionModel>), 200)]
        [ProducesResponseType(500)]
        public IActionResult ListAnswerQuery([FromQuery] int fatherID)
        {
            ResultCode resultCode;
            QueryModel queryResult;
            (resultCode, queryResult) = _service.ListAnswerQuery(fatherID);

            Result error;
            int statusCode = 0;
            (statusCode, error) =
                ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response =
                new GeneralResponse { Result = queryResult, Error = error };
            return StatusCode(statusCode, response);
        }
    }
}
