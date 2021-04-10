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
    public class LessonJourneyController : ControllerBase
    {
        private ILessonJourneyService _service = null;

        public LessonJourneyController(ILessonJourneyService service)
        {
            _service = service;
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult FirstLesson_Create(int IDaccount, string Level)
        {
            ResultCode resultCode;
            int? productID;
            (resultCode, productID) =
                _service.FirstLesson_Create(IDaccount, Level);

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
        public IActionResult StudyQuery(int IDaccount)
        {
            ResultCode resultCode;
            QueryModel queryResult;
            (resultCode, queryResult) = _service.StudyQuery(IDaccount);

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
