import { router } from '../trpc';
import { contactRouter } from './contact';
import { leadRouter } from './lead';
import { blogRouter } from './blog';
import { newsletterRouter } from './newsletter';
import { socialRouter } from './social';

export const appRouter = router({
  contact: contactRouter,
  lead: leadRouter,
  blog: blogRouter,
  newsletter: newsletterRouter,
  social: socialRouter,
});

export type AppRouter = typeof appRouter;