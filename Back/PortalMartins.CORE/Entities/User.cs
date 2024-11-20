
using PortalMartins.CORE.Interfaces.IUtilities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Runtime.InteropServices;

namespace PortalMartins.CORE.Entities
{
    public class User : IUser
    {
        public User()
        {
            Name = string.Empty;
            Email = string.Empty;
            Password = string.Empty;
            CameFrom = "";
            WhatIsIt = "";
        }
        public User(string? name, string? email, string? password, string? cameFrom, string? whatIsIt, IEncryptor encryptor)
        {
            if (string.IsNullOrWhiteSpace(name) || name.Length > 100) throw new ArgumentException("Name cannot be longer than 100 characters and cannot be null");
            if (string.IsNullOrWhiteSpace(email) || email.Length > 150) throw new ArgumentException("Email cannot be longer than 150 characters and cannot be null");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Password cannot be null");

            Name = name.Trim();
            Email = email.Trim();
            Password = encryptor.Encrypt(password.Trim());
            CameFrom = cameFrom is not null ? cameFrom : "";
            WhatIsIt = whatIsIt is not null ? whatIsIt : "";
            DateTime now = DateTime.Now;
            CreatedAt = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, now.Second, DateTimeKind.Utc);
        }

        public Guid Id { get; set; }
        public string Name { get; set; } 
        public string Email { get; set; } 
        public string Password { get; set; }
        public bool Active { get; set; } = true;
        public ICollection<Post> Posts { get; set; } = [];
        public string CameFrom { get; set; }
        public string WhatIsIt { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }

        public (bool, string) Update(string? name, string? email, string? password, IEncryptor encryptor)
        {
            if (name is not null && (string.IsNullOrWhiteSpace(name) || name.Length > 100)) return(true,"Name cannot be longer than 100 characters and cannot be null");
            if (email is not null && (string.IsNullOrWhiteSpace(email) || email.Length > 150)) return(true,"Email cannot be longer than 150 characters and cannot be null");
            if (password is not null && string.IsNullOrWhiteSpace(password)) return(true,"Password cannot be null");
            if (name is null && email is null && password is null) return(true,"At least one field must be filled");

            Name = name is not null ? name.Trim() : Name;
            Email = email is not null ? email.Trim() : Email;
            Password = password is not null ? encryptor.Encrypt(password.Trim()) : Password;
            DateTime now = DateTime.Now;
            UpdatedAt = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, now.Second, DateTimeKind.Utc);

            return (false, string.Empty);
        }

        public void AddPost(Post post)
        {
            Posts.Add(post);
            DateTime now = DateTime.Now;
            UpdatedAt = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, now.Second, DateTimeKind.Utc);
        }

        public (bool, string) Delete(string password, IEncryptor encryptor)
        {
            if (!encryptor.Compare(password, Password)) return (true, "Invalid password");

            List<Post> posts = [.. Posts];
            posts.ForEach(p => p.Active = false);
            Posts = posts;

            Active = false;
            DateTime now = DateTime.Now;
            DeletedAt = new DateTime(now.Year, now.Month, now.Day, now.Hour, now.Minute, now.Second, DateTimeKind.Utc);

            return (false, string.Empty);
        }
    }

    public interface IUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Id")]
        Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        [Column("Name")]
        string Name { get; set; }

        [Required]
        [StringLength(150)]
        [Column("Email")]
        string Email { get; set; }

        [Required]
        [Column("Password")]
        string Password { get; set; }

        [DefaultValue("true")]
        [Column("Active")]
        public bool Active { get; set; } 

        [Column("Posts")]
        ICollection<Post> Posts { get; set; }

        [DefaultValue("")]
        [StringLength(100)]
        [Column("CameFrom")]
        string CameFrom { get; set; }

        [DefaultValue("")]
        [StringLength(100)]
        [Column("WhatIsIt")]
        string WhatIsIt { get; set; }

        [Required]
        [DefaultValue(typeof(DateTime))]
        [Column("CreatedAt")]
        DateTime CreatedAt { get; set; }

        [Column("UpdatedAt")]
        DateTime UpdatedAt { get; set; }

        [Column("DeletedAt")]
        DateTime DeletedAt { get; set; }
    }
}
