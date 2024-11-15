
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace PortalMartins.CORE.Entities
{
    public class Events: Post
    {
        public Events(): base()
        {
            EventDate = DateTime.Now;
            EventLocation = string.Empty;
        }
        public Events(Guid id, string title,
            string location, string? phone, 
            string? instagram, string? description, char category, 
            DateTime? eventDate, string? eventLocation) : base(id, title, location, phone, instagram, description, category)
        {
            EventDate = eventDate ?? DateTime.Now;
            EventLocation = eventLocation is not null ? eventLocation.Trim() : string.Empty;
        }
   

        [DefaultValue(typeof(DateTime))]
        [Column("EventDate")]
        public DateTime EventDate { get; set; } 

        [StringLength(250)]
        [Column("EventLocation")]
        public string EventLocation { get; set; } 

        public void Update(
            string? title,
            string? location,
            string? phone,
            string? instagram,
            string? description,
            DateTime? eventDate,
            string? eventLocation
            )
        {
            base.Update(title, location, phone, instagram, description);

            if (title is null && location is null &&
                phone is null && instagram is null &&
                description is null && eventDate is null &&
                eventLocation is null) throw new ArgumentException("At least one field must be filled");

            EventDate = eventDate ?? EventDate;
            EventLocation = eventLocation is not null ? eventLocation.Trim() : EventLocation;
        }
        public void Delete()
        {
            base.Delete();
        }
    }
}
