import { Router } from 'express';
import { IndexController } from '@controllers/v1/index.controller';

const router: Router = Router();

// endpoint: /api/v1
router.get('/', IndexController.index);

export { router as apiRouterV1 };
