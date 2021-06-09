import { Function } from './function';

export type Functions =
  | string /* uri */
  | [
      // eslint-disable-next-line @typescript-eslint/ban-types
      Function,
      ...Function[]
    ];
