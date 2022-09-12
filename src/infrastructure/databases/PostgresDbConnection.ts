import postgres from 'postgres';

export default class PostgresDbConnection {
  private static instance: postgres.Sql<{}> | null = null;

  private constructor() {}

  static async getInstance(): Promise<postgres.Sql<{}>> {
    if (PostgresDbConnection.instance === null) {
      const postgresDbConnection = new PostgresDbConnection();
      PostgresDbConnection.instance =
        await postgresDbConnection.connectToDatabase();
    }
    return PostgresDbConnection.instance;
  }

  private async connectToDatabase(): Promise<postgres.Sql<{}>> {
    const sql = postgres(process.env.POSTGRESDBURL as string);
    await sql`CREATE TABLE IF NOT EXISTS services (serviceId TEXT NOT NULL, total NUMERIC(10,2) NOT NULL, cpf CHARACTER(14) NOT NULL, date DATE NOT NULL)`;
    return sql;
  }
}
