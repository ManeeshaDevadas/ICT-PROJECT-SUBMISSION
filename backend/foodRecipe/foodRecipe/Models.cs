using System.Text.Json.Serialization;

namespace foodRecipe
{
    public class User
    {
        [JsonIgnore]
        public int userid { get; set; }
        public string usertype { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }


    public class LoginRequest
    {
        public string usertype { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }

    public class Recipe
    {
        public int recipeid { get; set; }
        public int userid { get; set; }
        public string name { get; set; }
        public string ingrediants { get; set; }

        public string explanation { get; set; }
        public string imagebase64 { get; set; } // Store the image as a base64 string
    }

    public class RecipeCreateRequest
    {
        public int userid { get; set; }
        public string name { get; set; }
        public string ingrediants { get; set; }

        public string explanation { get; set; }
        public string imagebase64 { get; set; } // Base64 encoded image string }


    }

    public class Review
    {
        [JsonIgnore]
        public int reviewid { get; set; } // Primary key, auto-increment
        public int userid { get; set; }
        public int recipeid { get; set; }
        public string comment { get; set; }
    }




}