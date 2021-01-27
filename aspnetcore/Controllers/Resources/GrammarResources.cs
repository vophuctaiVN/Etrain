using Microsoft.AspNetCore.Http;

namespace aspnetcore.Controllers.Resources
{
    public class GrammarQueryRequest : BaseQueryRequest
    {
        public int? ID { get; set; }
        public string Title { get; set; }        
        public string Level { get; set; }
        public string ImageURL { get; set; }
        public string Description { get; set; }
        public bool? RecordStatus { get; set; }
        public GrammarQueryRequest()
        {
            ID = null;
            RecordStatus = null;
        }
    }

}