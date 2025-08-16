import handle from 'hono-react-router-adapter/cloudflare-workers';
import * as build from 'virtual:react-router/server-build';
import server from '../server';

declare module 'react-router' {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

export default handle(build, server) satisfies ExportedHandler<Env>;
