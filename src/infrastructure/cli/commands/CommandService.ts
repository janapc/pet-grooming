import ServiceOrder from '@application/useCases/ServiceOrder/ServiceOrder';
import ServiceOrderInputDto from '@application/useCases/ServiceOrder/ServiceOrderInputDto';
import ServiceOrderOutputDto from '@application/useCases/ServiceOrder/ServiceOrderOutputDto';
import PostgresDbConnection from '@infrastructure/databases/PostgresDbConnection';
import PostgresDbRepository from '@infrastructure/repositories/PostgresDbRepository';

const PARAMS = ['id', 'typeService', 'sizePet', 'cpf', 'date'];

export default class CommandService {
  private data: ServiceOrderInputDto | {};

  constructor() {
    this.data = {};
  }

  async build(): Promise<ServiceOrderOutputDto> {
    this.formatValues();
    const postgresDbConnection = await PostgresDbConnection.getInstance();
    const postgresDbRepository = new PostgresDbRepository(postgresDbConnection);
    const serviceOrderUseCase = new ServiceOrder(postgresDbRepository);
    const output = await serviceOrderUseCase.execute(
      this.data as ServiceOrderInputDto
    );
    return output;
  }

  private formatValues(): void {
    const data: { [key: string]: string | number | Date } = {};
    process.argv.forEach((arg) => {
      const param = PARAMS.find((param) => arg.includes(param));
      if (param !== undefined) {
        const value = arg.split('=');
        data[param] = value[1] ?? '';
      }
    });
    data.date = new Date(data.date);
    this.data = data;
  }
}
