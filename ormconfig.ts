import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as dotenv from 'dotenv'

dotenv.config({path: 'src/.env'})

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    migrations: [
        'dist/src/migrations/*{.ts,.js}'
    ],
    cli: {
        migrationsDir: 'src/migrations',
        // entitiesDir: 'src/**/entities/*.entity{.ts,.js}'
    }
}

export default config