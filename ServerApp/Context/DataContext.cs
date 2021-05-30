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
            builder.Entity<Restaurant>().HasOne(r=> r.Food).WithOne(f =>f.Restaurant).HasForeignKey<Food>(f => f.RestaurantID);
            builder.Entity<City>().HasMany(c => c.Foods).WithOne(f => f.City);
            builder.Entity<Restaurant>().HasMany(r=>r.Reservations).WithOne(r=>r.Restaurant);
            builder.Entity<User>().HasMany(r=>r.Reservations).WithOne(u=> u.User);
        }
        } 
}