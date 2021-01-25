using Microsoft.AspNetCore.Mvc;
using aspnetcore.Controllers.Resources;
using aspnetcore.Helpers;
using System.Collections.Generic;
using aspnetcore.Services.Models;
using aspnetcore.Services;
using Microsoft.AspNetCore.Authorization;
using aspnetcore.Repositories.DTOs;

namespace aspnetcore.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AccountsController : ControllerBase
    {
        private IAccountsService _service = null;
        public AccountsController(IAccountsService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(typeof(List<AccountModel>), 200)]
        [ProducesResponseType(500)]
        public IActionResult Query([FromQuery] AccountQueryRequest filter)
        {
            ResultCode resultCode; QueryModel queryResult;
            (resultCode, queryResult) = _service.Query(filter);

            Result error; int statusCode;
            (statusCode, error) = ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response = new GeneralResponse
            {
                Result = queryResult,
                Error = error,
            };
            return StatusCode(statusCode, response);
        }

        [HttpPost]
        [ProducesResponseType(typeof(AccountModel), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Authenticate([FromBody] AccountAuthenticateRequest body)
        {
            ResultCode resultCode; AccountModel account;
            (resultCode, account) = _service.Authenticate(body);

            Result error; int statusCode;
            (statusCode, error) = ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response = new GeneralResponse
            {
                Result = account,
                Error = error,
            };
            return StatusCode(statusCode, response);
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public IActionResult CheckAuth()
        { 
            return StatusCode(200);
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Create([FromForm] AccountCreateRequest form)
        {
            ResultCode resultCode; int? productID;
            (resultCode, productID) = _service.Create(form);

            Result error; int statusCode;
            (statusCode, error) = ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response = new GeneralResponse
            {
                Result = productID,
                Error = error,
            };
            return StatusCode(statusCode, response);
        }

        [HttpGet]
        //[Authorize]
        [ProducesResponseType(typeof(List<ProfileQueryDTO>), 200)]
        [ProducesResponseType(500)]
        public IActionResult UserInfo_Query([FromQuery] int userid)
        {
            ResultCode resultCode; QueryModel queryResult;
            (resultCode, queryResult) = _service.UserInfo_Query(userid);

            Result error; int statusCode;
            (statusCode, error) = ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response = new GeneralResponse
            {
                Result = queryResult,
                Error = error,
            };
            return StatusCode(statusCode, response);
        }

        [HttpPut]
        //[Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult Update_Info([FromForm] UserInfoUpdateRequest form)
        {
            ResultCode resultCode; int? ID;
            (resultCode, ID) = _service.Update_UserInfo(form);

            Result error; int statusCode;
            (statusCode, error) = ResultHandler.GetStatusCodeAndResult(resultCode);

            GeneralResponse response = new GeneralResponse
            {
                Result = ID,
                Error = error,
            };
            return StatusCode(statusCode, response);
        }
    }
}