import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'myuser',
    password: 'myuser',
    database: 'test',
    entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    migrations: [
        'dist/src/migrations/*{.ts,.js}'
    ],
    cli: {
        migrationsDir: 'src/migrations'
    }
}

export default config