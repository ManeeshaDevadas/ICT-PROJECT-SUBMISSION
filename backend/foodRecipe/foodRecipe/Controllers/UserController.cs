using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace foodRecipe.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _context.Users.AnyAsync(u => u.email == user.email))
            {
                return BadRequest("User with this email already exists.");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { UserId = user.userid });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginRequest)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.email == loginRequest.email && u.password == loginRequest.password && u.usertype==loginRequest.usertype);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { UserId = user.userid });
        }

        [HttpGet("users")] 
        public async Task<IActionResult> GetAllUsers() 
        {
            var users = await _context.Users.ToListAsync(); 
            return Ok(users);
        }


        [HttpPost("addRecipe")] public async Task<IActionResult> AddRecipe([FromBody] RecipeCreateRequest request)
        { 
            var userExists = await _context.Users.AnyAsync(
                u => u.userid == request.userid); 
            if (!userExists) { 
                return BadRequest("User does not exist.");
            } 
            var recipe = new Recipe 
            { 
                userid = request.userid,
                name = request.name, 
                explanation = request.explanation,
                ingrediants=request.ingrediants,
                imagebase64 = request.imagebase64
            }; 
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
            return Ok(new { RecipeId = recipe.recipeid }); 
        }


        [HttpGet("recipes/user/{userid}")]
        public async Task<IActionResult> GetRecipesByUserId(int userid)
        {
            var userExists = await _context.Users.AnyAsync(u => u.userid == userid);
            if (!userExists)
            {
                return BadRequest("User does not exist.");
            }

            var recipes = await _context.Recipes.Where(r => r.userid == userid).ToListAsync();
            if (recipes == null || recipes.Count == 0)
            {
                return NotFound("No recipes found for this user.");
            }

            return Ok(recipes);
        }



        [HttpGet("recipe/{id}")] 
        public async Task<IActionResult> GetRecipeById(int id) 
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null) 
            {
                return NotFound("Recipe not found.");
            }
            return Ok(recipe);
        }

        [HttpGet("recipes")] public async Task<IActionResult> GetAllRecipes()
        { 
            var recipes = await _context.Recipes.ToListAsync(); 
            return Ok(recipes);
        }



        [HttpDelete("recipe/{id}")] public async Task<IActionResult> DeleteRecipeById(int id) 
        {
            var recipe = await _context.Recipes.FindAsync(id); 
            if (recipe == null)
            { 
                return NotFound("Recipe not found.");
            } 
            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync(); 
            return Ok("Recipe deleted successfully."); 
        }

        [HttpPost("addReview")] public async Task<IActionResult> AddReview([FromBody] Review review) 
        {
            var userExists = await _context.Users.AnyAsync(u => u.userid == review.userid); 
            var recipeExists = await _context.Recipes.AnyAsync(r => r.recipeid == review.recipeid); 
            if (!userExists) 
            {
                return BadRequest("User does not exist.");
            } 
            if (!recipeExists)
            { 
                return BadRequest("Recipe does not exist.");
            } 
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync(); 
            return Ok(new { ReviewId = review.reviewid });
        }


        [HttpGet("reviews/{recipeId}")] public async Task<IActionResult> GetReviewsByRecipeId(int recipeId)
        { 
            var reviews = await _context.Reviews.Where(r => r.recipeid == recipeId).ToListAsync(); 
            if (!reviews.Any()) 
            { 
                return NotFound("No reviews found for this recipe.");
            } 
            return Ok(reviews);
        }


    }

    

}
