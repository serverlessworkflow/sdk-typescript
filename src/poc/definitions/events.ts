import { Eventdef } from './eventdef';

export type Events = string /* uri */ | [Eventdef, ...Eventdef[]];
