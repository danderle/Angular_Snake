using MongoDbDataAccess;

namespace SnakeApi;

public static class Api
{
    public static void ConfigureApi(this WebApplication app)
    {
        app.MapGet("/topScores", GetAllScoresAsync);
        app.MapPost("/topScores", AddHighScoreAsync);
    }

    private static async Task<IResult> GetAllScoresAsync(IDataAccess data)
    {
        try
        {
            var list = await data.GetAllHighScoresAsync();
            return Results.Ok(list);
        }
        catch(Exception ex)
        {
            return Results.Problem(ex.Message, ex.StackTrace);
        }
    }

    private static async Task<IResult> AddHighScoreAsync(IDataAccess data, HighScoreModel model)
    {
        try
        {
            await data.AddHighScoreAsync(model);
            return Results.Ok();
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message, ex.StackTrace);
        }
    }
}
