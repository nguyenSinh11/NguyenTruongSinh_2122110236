using System.Text.Json.Serialization;

namespace LamWebNe.Model
{
    public class Category : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        [JsonIgnore] // ⬅️ THÊM DÒNG NÀY
        public ICollection<Product> Products { get; set; } = new List<Product>();
    }

}
