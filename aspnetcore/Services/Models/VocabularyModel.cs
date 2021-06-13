namespace aspnetcore.Services.Models
{
    public class CreateVocabularyModel
    {
        public string En { get; set; }

        public string IPA { get; set; }

        public string Type { get; set; }

        public string Vn { get; set; }

        public string Example1 { get; set; }

        public string Example2 { get; set; }

        public string ImageURL { get; set; }

        public CreateVocabularyModel()
        {
        }
    }
}
