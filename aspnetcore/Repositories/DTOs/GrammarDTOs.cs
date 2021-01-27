namespace aspnetcore.Repositories.DTOs
{
    public class GrammarQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Level { get; set; }
        public string ImageURL { get; set; }
        public string Description { get; set; }
        public bool RecordStatus { get; set; }
    }

    public class SectionContentQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public string ID_topic { get; set; }
        public string Title { get; set; }
        public string Formular { get; set; }
        public string Usage { get; set; }
        public string Note { get; set; }
        public bool RecordStatus { get; set; }
    }

    public class SectionExampleQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public string ID_section { get; set; }
        public string ImageURL { get; set; }
        public string Example { get; set; }
        public bool RecordStatus { get; set; }
    }
}