namespace aspnetcore.Repositories.DTOs
{
    public class VocabularyQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Level { get; set; }
        public string ImageURL { get; set; }
        public string Description { get; set; }
        public bool RecordStatus { get; set; }
    }


    public class VocabularyByTopicQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public string ID_topic { get; set; }
        public string En { get; set; }
        public string IPA { get; set; }
        public string SoundURL { get; set; }
        public string Type { get; set; }
        public string Vn { get; set; }
        public string Example1 { get; set; }        
        public string Example2 { get; set; }
        public string ImageURL { get; set; }
        public bool RecordStatus { get; set; }
    }

    
}