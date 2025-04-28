namespace LamWebNe.Model
{
    public class User : BaseEntity
    {
        public int Id { get; set; }

        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Gmail { get; set; } = null!;
        public string Role { get; set; } = "User";
    }
}
