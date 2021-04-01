using System.Collections.Generic;

namespace ServerApp.Models
{
    public class City
    {
        public int CityID{get; set;}
        public string cityName{get; set;}
        public string cityDescription{get; set;}
        public string imageUrl { get; set; }
        public List<Food> Foods{get; set;}
    }
}