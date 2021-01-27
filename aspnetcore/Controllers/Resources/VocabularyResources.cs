using Microsoft.AspNetCore.Http;

namespace aspnetcore.Controllers.Resources
{
    public class VocabularyQueryRequest : BaseQueryRequest
    {
        public int? ID { get; set; }
        public string Title { get; set; }        
        public string Level { get; set; }
        public string ImageURL { get; set; }
        public string Description { get; set; }
        public bool? RecordStatus { get; set; }
        public VocabularyQueryRequest()
        {
            ID = null;
            RecordStatus = null;
        }
    }

}