namespace NguyenTruongSinh_2122110236.Model
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Price { get; set; }

        public string Image { get;set; }

        public int CategoryId { get; set; }   // Khóa ngoại liên kết với Category

        public Category Category { get; set; } // Liên kết với Category
    }
}
