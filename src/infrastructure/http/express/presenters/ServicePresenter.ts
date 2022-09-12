import jsontoxml from 'jsontoxml';
import ServiceOrderOutputDto from '@application/useCases/ServiceOrder/ServiceOrderOutputDto';

export default class ServicePresenter {
  static convertJsonToXml(data: ServiceOrderOutputDto): string {
    return jsontoxml({ services: data });
  }
}
