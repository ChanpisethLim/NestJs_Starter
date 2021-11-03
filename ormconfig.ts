import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config:SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
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