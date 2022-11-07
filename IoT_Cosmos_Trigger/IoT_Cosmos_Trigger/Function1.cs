using IoTHubTrigger = Microsoft.Azure.WebJobs.EventHubTriggerAttribute;

using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Azure.EventHubs;
using System.Text;
using System.Net.Http;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Security.Authentication;
using Newtonsoft.Json.Linq;
using System;
using Newtonsoft.Json;

namespace IoT_Cosmos_Trigger
{
    public static class Function1
    {
        private static HttpClient client = new HttpClient();

        [FunctionName("IoT_Cosmos_Trigger")]
        public static void Run([IoTHubTrigger("messages/events", Connection = "IoTHubConnectionStringSetting")]EventData message, ILogger log)
        {
            const string dbName = "StreetLamp";
            const string collectionName = "alerts";

            string connectionString = Environment.GetEnvironmentVariable("CosmosDBConnectionString");
            MongoClientSettings settings = MongoClientSettings.FromUrl(
                new MongoUrl(connectionString)
            );

            settings.SslSettings =
                new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };
                var mongoClient = new MongoClient(settings);

            string payload = Encoding.UTF8.GetString(message.Body);

            Alert alert = JsonConvert.DeserializeObject<Alert>(payload);

            var doc = new BsonDocument
            {
                {"deviceID", alert.deviceID},
                {"alertType", alert.alertType},
                {"lat", alert.lat},
                {"lng", alert.lng},
                {"isActive", alert.isActive},
                {"createdAt", (DateTime.Now).ToString()}
            };

            MongoClient dbClient = new MongoClient(connectionString);

            var database = dbClient.GetDatabase(dbName);
            var collection = database.GetCollection<BsonDocument>(collectionName);

            if(doc != null)
            {
                collection.InsertOne(doc);
                Console.WriteLine("Alert sended to the DB");
            }

            if (alert.alertType == "Street Lamp touched")
            {
                string flexIoUri = Environment.GetEnvironmentVariable("FlexIOKey");
                System.Diagnostics.Process.Start(flexIoUri);
            }
        }
    }
}