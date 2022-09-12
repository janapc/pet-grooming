export default interface ServiceRepository {
  insert: (
    serviceId: string,
    total: number,
    cpf: string,
    date: Date
  ) => Promise<void>;
}
