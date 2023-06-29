import { Router } from 'express';
import { IndexController } from '@controllers/v1/index.controller';
import { NewsController } from '@controllers/v1/news.controller';

const router: Router = Router();

// endpoint: /api/v1
router.get('/', IndexController.index);

// endpoint: /api/v1/news
router.get('/news', NewsController.getNews);

export { router as apiRouterV1 };
