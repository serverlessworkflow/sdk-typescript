import { Retrydef } from './retrydef';

export type Retries = string /* uri */ | [Retrydef, ...Retrydef[]];
