using System.Collections.Generic;
using System.Linq;
using aspnetcore.Controllers.Resources;
using aspnetcore.Repositories;
using aspnetcore.Repositories.DTOs;

namespace aspnetcore.Services.Models
{
    public class fatherIDModel{
        private static fatherIDModel _instance;    

    private fatherIDModel() { }

    public static fatherIDModel Instance
    {
        get
        {
            if(_instance == null)
                _instance = new fatherIDModel();

            return _instance;
        }
    }
        public int fatherID { get; set; }
    }
}
