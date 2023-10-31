namespace MongoDbDataAccess;
public interface IDataAccess
{
    Task<List<HighScoreModel>> GetAllHighScoresAsync();
    Task AddHighScoreAsync(HighScoreModel highScore);
}
