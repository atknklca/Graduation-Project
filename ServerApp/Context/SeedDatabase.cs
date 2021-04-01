using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using ServerApp.Models;

namespace ServerApp.Context
{
    public class SeedDatabase
    {
        public static async Task Seed(DataContext context){
            if(!context.Cities.Any()){
                var cities = File.ReadAllText("Context/data.json");
                var listOfCities = JsonConvert.DeserializeObject<List<City>>(cities);

                foreach (var city in listOfCities)
               {
                                 await context.Cities.AddAsync(city);  
                }
                         }
        }
    }
}