using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

namespace ServerApp.Context
{
        public class DataContext : IdentityDbContext<User,Role,int> {
            public DataContext(DbContextOptions<DataContext> options) : base (options) { }
            public DbSet<Restaurant> Restaurants { get; set; }
            public DbSet<City> Cities { get; set; }
            public DbSet<Reservation> Reservations { get; set; }
            public DbSet<Food> Foods { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Food>().HasOne(b=> b.Restaurant).WithOne(i =>i.Food).HasForeignKey<Restaurant>(b => b.RestaurantID);
            builder.Entity<Food>().HasOne(c => c.City).WithMany(f => f.Foods);
        }

        } 
}