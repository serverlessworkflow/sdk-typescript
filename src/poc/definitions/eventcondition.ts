import { Transitioneventcondition } from './transitioneventcondition';
import { Enddeventcondition } from './enddeventcondition';

export type Eventcondition /* Switch state data event condition */ =
  | Transitioneventcondition
  | /* Switch state data event condition */ Enddeventcondition;
