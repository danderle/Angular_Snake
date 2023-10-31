using MongoDB.Driver;

namespace MongoDbDataAccess;
public class DataAccess : IDataAccess
{
    private const string ConnectionString = "mongodb+srv://danderle86:xG57SYEaeqp0PaBX@snakecluster.inqp1fa.mongodb.net/";
    private const string DbName = "SnakeDb";
    private const string CollectionName = "HighScores";
    private IMongoCollection<T> ConnectToMongo<T>()
    {
        var client = new MongoClient(ConnectionString);
        var db = client.GetDatabase(DbName);
        return db.GetCollection<T>(CollectionName);
    }
    public Task AddHighScoreAsync(HighScoreModel highScore)
    {
        var collection = ConnectToMongo<HighScoreModel>();
        return collection.InsertOneAsync(highScore);
    }

    public async Task<List<HighScoreModel>> GetAllHighScoresAsync()
    {
        var collection = ConnectToMongo<HighScoreModel>();
        var filter = Builders<HighScoreModel>.Filter.Empty;
        var sort = Builders<HighScoreModel>.Sort.Descending("Score");
        var result = await collection.FindAsync(filter, new FindOptions<HighScoreModel, HighScoreModel>
        {
            Sort = sort,
        });

        return result.ToList();
    }
}
