using System.Collections.Generic;
using System.Threading.Tasks;
using ServerApp.Models;

namespace ServerApp.Repository
{
    public interface ICityRepository
    {
         Task<List<City>> GetCities();
         Task<City> GetCity(int id);
    }
}