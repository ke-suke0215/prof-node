import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('register', 'routes/register.tsx'),
  route(':nanoId', 'routes/profile.tsx'),
] satisfies RouteConfig;
