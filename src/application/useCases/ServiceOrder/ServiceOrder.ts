import Service from '@domain/entities/Service';
import ServiceRepository from '@domain/repositories/ServiceRepository';
import ServiceOrderInputDto from './ServiceOrderInputDto';
import ServiceOrderOutputDto from './ServiceOrderOutputDto';

export default class ServiceOrder {
  constructor(readonly serviceRepository: ServiceRepository) {}

  async execute(input: ServiceOrderInputDto): Promise<ServiceOrderOutputDto> {
    const service = new Service(
      input.id,
      input.typeService,
      input.sizePet,
      input.cpf,
      input.date
    );
    const total = service.getTotal();
    const serviceId = service.serviceId;
    await this.serviceRepository.insert(
      serviceId,
      total,
      service.cpf,
      service.date
    );
    return {
      serviceId,
      total
    };
  }
}
