using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortalMartins.CORE.Entities
{
    public class Feeding : Post
    {
        public Feeding() : base()
        {
            Type =  string.Empty;
            Wifi =  false;
            Delivery =  false;
            Parking =  false;
        }
        public Feeding(Guid id, string title,
            string location, string? phone, 
            string? instagram, string? description, char category,
            string type, bool wifi, bool delivery,
            bool parking) : base(id, title, location, phone, instagram, description, category)
        {
            Type = string.IsNullOrWhiteSpace(type) ? type.Trim() : string.Empty;
            Wifi = wifi ;
            Delivery = delivery;
            Parking = parking;
        }

        [StringLength(100)]
        [Column("Type")]
        public string Type { get; set; }

        [DefaultValue(false)]
        [Column("Wifi")]
        public bool Wifi { get; set; }

        [DefaultValue(false)]
        [Column("Delivery")]
        public bool Delivery { get; set; }

        [DefaultValue(false)]
        [Column("Parking")]
        public bool Parking { get; set; }

        public (bool, string) Update(
            string? title,
            string? location,
            string? phone,
            string? instagram,
            string? description,
            string? type,
            bool? wifi,
            bool? delivery,
            bool? parking
            )
        {
            (bool error, string msg) = base.Update(title, location, phone, instagram, description);

            if (error) return (error, msg);
            if (title is null && location is null &&
                phone is null && instagram is null &&
                description is null && type is null &&
                wifi is null && delivery is null &&
                parking is null) return (true, "At least one field must be filled");

            Type = type is not null ? type.Trim() : Type;
            Wifi = wifi is not null ? wifi.Value : Wifi;
            Delivery = delivery is not null ? delivery.Value : Delivery;
            Parking = parking is not null ? parking.Value : Parking;

            return (false, string.Empty);
        }

        public void Delete()
        {
            base.Delete();
        }
    }
}