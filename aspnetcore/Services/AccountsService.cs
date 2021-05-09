//using Internal;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using aspnetcore.Controllers.Resources;
using aspnetcore.Helpers;
using aspnetcore.Repositories.DTOs;
using aspnetcore.Services.Models;
using Microsoft.IdentityModel.Tokens;

namespace aspnetcore.Services
{
    public interface IAccountsService
    {
        (ResultCode, QueryModel) Query(AccountQueryRequest filter);
        (ResultCode, AccountModel) Authenticate(AccountAuthenticateRequest requestBody);
        (ResultCode, int?) Create(AccountCreateRequest form);
        (ResultCode, QueryModel) UserInfo_Query(int account_ID);

        (ResultCode, int?) Update_UserInfo(UserInfoUpdateRequest form);

        (ResultCode, int?) Update_ScoreInfo(ScoreInfoUpdateRequest form);
    }
    public class AccountsService : BaseService, IAccountsService
    {
        public static string AuthKey { get; set; }
        public (ResultCode, AccountModel) Authenticate(AccountAuthenticateRequest body)
        {
            AccountQueryDTO accountDTO = _procedureHelper.GetData<AccountQueryDTO>(
                "account_table_get_account", new { Username = body.Username })
                .FirstOrDefault();
            if (null == accountDTO)
                return (ResultCode.ACCOUNT_NOT_FOUND, null);
            AccountModel account = new AccountModel(accountDTO);
            if (account.Password.ToLower() != body.Sha1Pass.ToLower())
                return (ResultCode.ACCOUNT_PASS_INVALID, null);

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AuthKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, account.ID.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            account.Token = tokenHandler.WriteToken(token);

            return (ResultCode.SUCCESS, account);
        }

        public (ResultCode, QueryModel) Query(AccountQueryRequest filter)
        {
            QueryModel queryResult = new QueryModel();
            List<AccountQueryDTO> accountDTOs = _procedureHelper.GetData<AccountQueryDTO>(
                "account_table_query", filter);
            if (0 != accountDTOs.Count)
                queryResult.TotalRows = accountDTOs[0].TotalRows;
            List<AccountModel> accounts = new List<AccountModel>();
            foreach (var item in accountDTOs)
            {
                AccountModel account = new AccountModel(item);
                accounts.Add(account);
            }
            queryResult.Items = accounts;
            return (ResultCode.SUCCESS, queryResult);
        }

        public (ResultCode, int?) Create(AccountCreateRequest form)
        {
            ResultDTO result = _procedureHelper.GetData<ResultDTO>(
                "account_table_create", new
                {
                    Username = form.Username,
                    Password = form.Password,
                    Name = form.Name,
                    Email = form.Email,
                }).FirstOrDefault();
            int ID = result.Result;
            if (0 > ID)
                return ((ResultCode)Math.Abs(ID), null); //result code là enum nên đếm thứ tự như array khi error 15 thì đếm từ 0-15 là ra.

            return (ResultCode.SUCCESS, ID);
        }


        public (ResultCode, QueryModel) UserInfo_Query(int account_ID)
        {

            QueryModel queryResult = new QueryModel();
            List<ProfileQueryDTO> infoDTOs = _procedureHelper.GetData<ProfileQueryDTO>(
                "user_info_query", new { ID = account_ID });

            if (0 != infoDTOs.Count)
                queryResult.TotalRows = infoDTOs[0].TotalRows;
            queryResult.Items = infoDTOs;
            return (ResultCode.SUCCESS, queryResult);
        }

        public (ResultCode, int?) Update_UserInfo(UserInfoUpdateRequest form)
        {
            if (
                null != form.Image &&
                Path.GetExtension(form.Image.FileName).ToLower() != ".jpg" &&
                Path.GetExtension(form.Image.FileName).ToLower() != ".png"
            )
                return (ResultCode.PRODUCT_INFO_INVALID, null);

            //ProductQueryRequest filter = new ProductQueryRequest { ID = form.ID };
            ProfileQueryDTO infoDTOs = _procedureHelper.GetData<ProfileQueryDTO>(
                "user_info_query", new { ID = form.IDaccount }).FirstOrDefault();
            /* ProductQueryDTO productDTO = _procedureHelper.GetData<ProductQueryDTO>(
                "product_table_query", filter).FirstOrDefault(); */
            if (null == infoDTOs)
                return (ResultCode.PRODUCT_NOT_FOUND, null);

            string oldFileName = Path.GetFileName(infoDTOs.Image);
            string fileName;
            if (null != form.Image)
                fileName = string.Format("{0}_1{1}", form.IDaccount, Path.GetExtension(form.Image.FileName));
            else  // trường hợp không đổi ảnh thì là undefine
                fileName = string.Format("{0}_1{1}", form.IDaccount, Path.GetExtension(oldFileName));
            ResultDTO result = _procedureHelper.GetData<ResultDTO>(
                "user_info_update", new
                {
                    IDaccount = form.IDaccount,
                    Name = form.Name,
                    Email = form.Email,
                    Address = form.Address,
                    Phone = form.Phone,
                    About = form.About,
                    Image = fileName,
                    //ImageURL = "appdata/products/" + fileName,
                }).FirstOrDefault();
            int productID = result.Result;

            if (0 > productID)
                return ((ResultCode)Math.Abs(productID), null);


            MyFileStream fileStream = new MyFileStream();
            fileStream.ConvertFromIFormFile(form.Image);
            fileStream.FileName = fileName;
            fileStream.UpdateUserImage(oldFileName);

            return (ResultCode.SUCCESS, productID);
        }

        public (ResultCode, int?) Update_ScoreInfo(ScoreInfoUpdateRequest form)
        {
            ResultDTO result = _procedureHelper.GetData<ResultDTO>(
                "user_scoreInfo_update", new
                {
                    IDaccount = form.IDaccount,
                    Score = form.Score,
                    PostLeft = form.PostLeft,
                    Level = form.Level
                }).FirstOrDefault();

            return (ResultCode.SUCCESS, 0);
        }
    }
}