import { ApiController } from './lib/api';

export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: ApiController,
    $toast: any,
  }
}
