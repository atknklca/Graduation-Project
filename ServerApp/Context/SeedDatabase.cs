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
            if(!context.Foods.Any()){
                var foods = File.ReadAllText("Context/data.json");
                var listOfFoods = JsonConvert.DeserializeObject<List<Food>>(foods);

                foreach (var food in listOfFoods)
               {
                                 await context.Foods.AddAsync(food);  
                                 await context.SaveChangesAsync();
                }
                         }
        }
    }
}