namespace aspnetcore.Repositories.DTOs
{
    public class AccountQueryDTO : BaseQueryDTO
    {
        public int ID { get; set; }
        public string Username { get; set; }
        public byte[] Password { get; set; }
        public int Role { get; set; }
    }

    public class ProfileQueryDTO : BaseQueryDTO
    {
        public string Level { get; set; }
        public string Score { get; set; }
        public string PostLeft { get; set; }
        public int Score_Rank { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }
        public string Address { get; set; }
        public string About { get; set; }
    }
}