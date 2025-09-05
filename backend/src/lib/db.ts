import { SQL , S3Client, RedisClient } from 'bun';
import logger from "@/lib/logger";
class database {
    public sql: SQL;
    public redis: RedisClient;
    public ovhRedis : RedisClient;
    public s3: S3Client;
    constructor(){
        this.sql = new SQL({
            url: 'postgres://postgres:postgres@localhost:5432/realestate',
            port: 5432,
            max: 1,
            idleTimeout : 0,
            maxLifetime : 0,
            connectionTimeout : 30,
            tls: false,
            adapter: 'postgres',
            bigint: false,
            onconnect: () => {
                logger.info(`Connected to PostgreSQL server`);
            },
            onclose: () => {
                logger.info(`Disconnected from PostgreSQL server`);
            }
        })
        this.sql.connect();
        this.redis = new RedisClient("redis://127.0.0.1:6379");
        this.redis.onconnect = () => {
          console.log(`Connected to Redis server`);
        }
        this.ovhRedis = new RedisClient("redis://:1455c3cdb83f3ef0@162.19.154.225:6379");
        this.ovhRedis.onconnect = () => {
          console.log(`Connected to Redis server ovh`);
        }
        this.s3 = new S3Client({
            accessKeyId: "417cbe7ce5543c08ef9ba8b3a92fb157" ,
            secretAccessKey: "81340165810cab9010806ed9bdf2a0ba9e8519f649d074bf76e065a5adff41ac",
            bucket :"hotel",
            endpoint: "https://954aff282ed63d0cdc7b2f4f7fb3b8eb.r2.cloudflarestorage.com",
        });
    }
}
// Export an instance of the Database class
const Database: database = new database();
export { Database };