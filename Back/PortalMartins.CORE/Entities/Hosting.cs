

using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortalMartins.CORE.Entities
{
    public class Hosting : Post
    {
        public Hosting() : base()
        {
            Bedrooms = 0;
            Bathroom =  0;
            Vacancy =  0;
            ServiceArea = false;
            Kitchen = false;
            Garden = false;
        }
        public Hosting(
            Guid id,string title,
            string location, string? phone,
            string? instagram, string? description, char category,
            int bedrooms, int bathroom,
            int vacancy, bool serviceArea, 
            bool kitchen, bool garden
            ) : base(id, title, location, phone, instagram, description, category)
        {
            Bedrooms = bedrooms;
            Bathroom = bathroom;
            Vacancy = vacancy;
            ServiceArea = serviceArea ;
            Kitchen = kitchen ;
            Garden = garden ;
        }

        [DefaultValue(0)]
        [Column("Bedrooms")]
        public int Bedrooms { get; set; }

        [DefaultValue(0)]
        [Column("Bathroom")]
        public int Bathroom { get; set; }

        [DefaultValue(0)]
        [Column("Vacancy")]
        public int Vacancy { get; set; }

        [DefaultValue(false)]
        [Column("ServiceArea")]
        public bool ServiceArea { get; set; }

        [DefaultValue(false)]
        [Column("Kitchen")]
        public bool Kitchen { get; set; }

        [DefaultValue(false)]
        [Column("Garden")]
        public bool Garden { get; set; }

        public (bool, string) Update(
            string? title,
            string? location,
            string? phone,
            string? instagram,
            string? description,
            int? bedrooms,
            int? bathroom,
            int? vacancy,
            bool? serviceArea,
            bool? kitchen,
            bool? garden
            )
        {
            (bool error, string msg) = base.Update(title, location, phone, instagram, description);

            if (error) return (error, msg);
            if (title is null && location is null &&
                phone is null && instagram is null &&
                description is null && bedrooms is null &&
                bathroom is null && vacancy is null &&
                serviceArea is null && kitchen is null &&
                garden is null) return (true, "At least one field must be filled");

            Bedrooms = bedrooms is not null ? bedrooms.Value : Bedrooms;
            Bathroom = bathroom is not null ? bathroom.Value : Bathroom;
            Vacancy = vacancy is not null ? vacancy.Value : Vacancy;
            ServiceArea = serviceArea is not null ? serviceArea.Value : ServiceArea;
            Kitchen = kitchen is not null ? kitchen.Value : Kitchen;
            Garden = garden is not null ? garden.Value : Garden;

            return (false, string.Empty);
        }

        public void Delete()
        {
            base.Delete();
        }

    }

}
