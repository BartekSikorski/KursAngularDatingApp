using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _datacontext;
        public AuthRepository(DataContext datacontext)
        {
            _datacontext = datacontext;

        }
        public async Task<User> Login(string username, string password)
        {
           var user = await _datacontext.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == username);
           if (user == null)
           {
               return null;
           }


           if (!VerifyPaswordHash(password, user.PasswordHash, user.PaswordSalt))
           {
               return null;
           }

            return user;

        }

        private bool VerifyPaswordHash(string password, byte[] passwordHash, byte[] paswordSalt)
        {
            using (var hmas = new System.Security.Cryptography.HMACSHA512(paswordSalt))
            {
                var computedHash =  hmas.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }

                return true;
            };
        }

        public async Task<User> Regiser(User user, string password)
        {
            byte[] passwordHash, paswordSalt;
            CreatePasswordHash(password, out passwordHash, out paswordSalt);
            user.PasswordHash = passwordHash;
            user.PaswordSalt = paswordSalt;
            await _datacontext.AddAsync(user);
            await _datacontext.SaveChangesAsync();

            return user;

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] paswordSalt)
        {
            using (var hmas = new System.Security.Cryptography.HMACSHA512())
            {
                paswordSalt = hmas.Key;
                passwordHash = hmas.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            };
        }

        public async  Task<bool> UserExist(string username)
        {
            if (await _datacontext.Users.AnyAsync(x => x.UserName == username))
            {
                return true;

            }

            return false;
        }
    }
}