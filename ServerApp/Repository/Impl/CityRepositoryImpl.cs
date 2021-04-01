using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using ServerApp.Context;
using ServerApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ServerApp.Repository.Impl
{
    public class CityRepositoryImpl : ICityRepository
    {
        private readonly DataContext context;
        public CityRepositoryImpl(DataContext context)
        {
            this.context = context;
        }
        async Task<List<City>> ICityRepository.GetCities()
        {
            var cities = await context.Cities.Include(c => c.Foods).ToListAsync();
            return cities;
        }

        async Task<City> ICityRepository.GetCity(int id)
        {
            var city = await context.Cities.FindAsync(id);
            if(city == null)
            return null;
            return city;
        }
    }
}