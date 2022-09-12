import { Request, Response, Router } from 'express';

import ServiceOrder from '@application/useCases/ServiceOrder/ServiceOrder';
import MongoDbRepository from '@infrastructure/repositories/MongoDbRepository';
import MongoDbConnection from '@infrastructure/databases/MongoDbConnection';
import ServiceOrderInputDto from '@application/useCases/ServiceOrder/ServiceOrderInputDto';
import ServicePresenter from './presenters/ServicePresenter';

const route: Router = Router();

route.post('/', async (req: Request, res: Response) => {
  try {
    const mongoDbConnection = await MongoDbConnection.getInstance();
    const mongoDbRepository = new MongoDbRepository(mongoDbConnection);
    const serviceOrderUseCase = new ServiceOrder(mongoDbRepository);
    const input: ServiceOrderInputDto = {
      id: req.body.id,
      typeService: req.body.typeService,
      sizePet: req.body.sizePet,
      cpf: req.body.cpf,
      date: new Date(req.body.date)
    };
    const output = await serviceOrderUseCase.execute(input);
    const formatedRequest = req.header('Accept') as string;
    res.setHeader('Content-Type', formatedRequest);
    res.format({
      json: () => res.json(output),
      xml: () => res.send(ServicePresenter.convertJsonToXml(output))
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Error internal'
    });
  }
});

export default route;
