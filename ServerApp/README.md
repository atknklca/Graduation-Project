# Ne Nerede Yenir?

ServerApp ASP.NET projesini çalıştırabilmek için izlenecek adımlar:

.Net SDK'ın bilgisayara yüklenmesi gerekmektedir.


### Terminal Komutları

1. Terminali açınız.
2. Proje dosya yoluna gidiniz. Örn(C://..../..../ServerApp)
3. İlk olarak gerekli kurulumları yapınız. ```dotnet tool install --glabol dotnet-ef```
5. Veritabanını güncelleyiniz.```dotnet ef database update```
6. Proje build edilir ve çalıştırılır. ```dotnet run```
7. Tarayıcıda url bölümüne "[localhost:5000/api](localhost:5000/api)" yazdığınızda API'ye erişim sağlamış olursunuz.

Dipnot: Controllers klasörü içerisindeki sınıflardan, kullanılacak sınıfın içerisindeki http metodlarına, üzerinde belirtilen url kullanılarak erişilebilir. 
