import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'test',
    entities: ['dist/src/**/*.entity{.ts,.js}'],
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