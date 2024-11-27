using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace PortalMartins.CORE.Entities
{
    public abstract class Post : IPost
    {
        public Post()
        {
            UserId = Guid.Empty;
            Title = string.Empty;
            Phone = string.Empty;
            Instagram = string.Empty;
            Description = string.Empty;
            Location = string.Empty;
        }
        public Post(Guid id, string title, string location, string? phone, string? instagram, string? description, char category)
        {
            if (string.IsNullOrWhiteSpace(title) || title.Length > 100) throw new ArgumentException("Title cannot be longer than 100 characters and cannot be null");
            if (string.IsNullOrWhiteSpace(location) || location.Length > 250) throw new ArgumentException("Local cannot be longer than 250 characters and cannot be null");
            if (phone != null && phone.Length > 11) throw new ArgumentException("Phone cannot be longer than 11 characters and cannot be null");
            if (instagram != null && instagram.Length > 100) throw new ArgumentException("Instagram cannot be longer than 100 characters and cannot be null");

            UserId = id;
            Title = title.Trim();
            Phone = phone is not null ? phone.Trim() : string.Empty;
            Instagram = instagram is not null ? instagram.Trim() : string.Empty;
            Description = description is not null ? description.Trim() : string.Empty;
            Location = location.Trim();
            Active = true;
            Category = category;
            DateTime now = DateTime.Now;
            CreatedAt = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, now.Second, DateTimeKind.Utc);
        }

        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Phone { get; set; }
        public string Instagram { get; set; }
        public float Classification { get; set; }
        public char Category { get; set; }
        public string Description { get; set; }
        public string[] Images { get; set; } = [];
        public bool Active { get; set; }
        public string Location { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }

        public void AddImage(string path)
        {
            Images = [.. Images, path];
        }
        public void DeleteImage(string path)
        {
            Images = Images.Where(i => i != path).ToArray();
        }
        protected (bool, string) Update(
            string? title,
            string? location,
            string? phone,
            string? instagram,
            string? description
        )
        {
            if (title is not null && (string.IsNullOrWhiteSpace(title) || title.Length > 100))
                return (true, "Title cannot be longer than 100 characters and cannot be null");

            if (location is not null && (string.IsNullOrWhiteSpace(location) || location.Length > 250))
                return (true, "Location cannot be longer than 250 characters and cannot be null");

            if (phone is not null && (string.IsNullOrWhiteSpace(phone) || phone.Length > 100))
                return (true, "Phone cannot be longer than 100 characters and cannot be null");

            if (instagram is not null && (string.IsNullOrWhiteSpace(instagram) || instagram.Length > 100))
                return (true, "Instagram cannot be longer than 100 characters and cannot be null");

            if (description is not null && string.IsNullOrWhiteSpace(description))
                return (true, "Description cannot be null");

            Title = title is not null ? title.Trim() : Title;
            Location = location is not null ? location.Trim() : Location;
            Phone = phone is not null ? phone.Trim() : Phone;
            Instagram = instagram is not null ? instagram.Trim() : Instagram;
            Description = description is not null ? description.Trim() : Description;
            DateTime now = DateTime.Now;
            UpdatedAt = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, now.Second, DateTimeKind.Utc);

            return (false, string.Empty);
        }
        protected void Delete()
        {
            Active = false;
            DateTime now = DateTime.Now;
            DeletedAt = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, now.Second, DateTimeKind.Utc);
        }
    }

    public interface IPost
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Id")]
        int Id { get; set; }

        [ForeignKey("UserId")]
        [Column("UserId")]
        Guid UserId { get; set; }

        [Required]
        [StringLength(100)]
        [Column("Title")]
        string Title { get; set; }
        
        [StringLength(100)]
        [Column("Phone")]
        string Phone { get; set; }

        [StringLength(100)]
        [Column("Instagram")]
        string Instagram { get; set; }

        [DefaultValue(0)]
        [Column("Classification")]
        float Classification { get; set; }

        [Column("Category")]
        char Category { get; set; }

        [Column("Description")]
        string Description { get; set; }

        [Column("Images")]
        string[] Images { get; set; }

        [DefaultValue(true)]
        [Column("Active")]
        bool Active { get; set; }

        [StringLength(250)]
        [Column("Local")]
        string Location { get; set; }

        [DefaultValue(typeof(DateTime), "NOW")]
        [Column("CreatedAt")]
        DateTime CreatedAt { get; set; }

        [Column("UpdatedAt")]
        DateTime UpdatedAt { get; set; }

        [Column("DeletedAt")]
        DateTime DeletedAt { get; set; }
    }
}
