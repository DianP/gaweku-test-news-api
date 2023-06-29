import { z } from 'zod';

export const newsParamsSchema = z
  .object({
    provider: z.enum(['nytimes', 'newsapi', 'all']).default('all'),
    filter: z.enum(['popular', 'all']).default('all'),
    search: z.string().max(150).optional(),
    page: z.number().int().min(1).default(1),
  })
  .strict()
  .superRefine((value, ctx) => {
    if ((value.provider === 'nytimes' || value.provider === 'all') && value.page > 200) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: 200,
        type: 'number',
        inclusive: true,
        exact: false,
        message: 'Page must be less than or equal to 200',
        path: ['page'],
      });
    }
    if (value.provider === 'newsapi' && value.page > 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: 10,
        type: 'number',
        inclusive: true,
        exact: false,
        message: 'Page must be less than or equal to 10',
        path: ['page'],
      });
    }
    if (value.provider === 'all' && value.page > 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: 10,
        type: 'number',
        inclusive: true,
        exact: false,
        message: 'Page must be less than or equal to 10. Please use provider nytimes or newsapi for more pages',
        path: ['page'],
      });
    }
    if (value.filter === 'popular' && value.page > 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: 10,
        type: 'number',
        inclusive: true,
        exact: false,
        message: 'Page must be less than or equal to 10',
        path: ['page'],
      });
    }
    if (value.filter === 'popular' && value.search) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Popular filter does not support search query',
        path: ['search'],
      });
    }
  });
