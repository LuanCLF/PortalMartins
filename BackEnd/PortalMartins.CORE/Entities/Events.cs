
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PortalMartins.CORE.Entities
{
    public class Events: Post
    {
        public Events(): base()
        {
            EventDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            EventLocation = string.Empty;
        }
        public Events(Guid id, string title,
            string location, string? phone, 
            string? instagram, string? description, char category, 
            string? eventDate, string? eventLocation) : base(id, title, location, phone, instagram, description, category)
        {
            DateTime e  = !string.IsNullOrEmpty(eventDate) ? DateTime.Parse(eventDate) : DateTime.Now;
            EventDate = e.ToString("yyyy-MM-dd HH:mm:ss");
            EventLocation = eventLocation is not null ? eventLocation.Trim() : string.Empty;
        }
   

        [Column("EventDate")]
        public string EventDate { get; set; } 

        [StringLength(250)]
        [Column("EventLocation")]
        public string EventLocation { get; set; }

        public (bool, string) Update(
                 string? title,
                 string? location,
                 string? phone,
                 string? instagram,
                 string? description,
                 string? eventDate,
                 string? eventLocation
                 )
        {
            (bool error, string msg) = base.Update(title, location, phone, instagram, description);

            if (error) return (error, msg);
            if (title is null && location is null &&
                phone is null && instagram is null &&
                description is null && eventDate is null &&
                eventLocation is null) return (true, "At least one field must be filled");

            EventDate = string.IsNullOrWhiteSpace(eventDate) ? EventDate : eventDate;
            EventLocation = eventLocation is not null ? eventLocation.Trim() : EventLocation;

            return (false, string.Empty);
        }
        public void Delete()
        {
            base.Delete();
        }
    }
}
