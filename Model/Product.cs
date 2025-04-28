using LamWebNe.Model;

public class Product : BaseEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;     // ✅ đã có
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; } = null!;        // ✅ đã có
    public int StockQuantity { get; set; }               // ✅ có luôn
    public bool Published { get; set; }                  // ✅ có luôn

    public int CategoryId { get; set; }
    public Category? Category { get; set; }
}
