import { Router } from 'express';
import { IndexController } from '@controllers/api/v1/index.controller';

const router: Router = Router();

router.get('/', IndexController.getIndex);

export default router;
