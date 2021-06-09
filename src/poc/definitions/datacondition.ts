import { Transitiondatacondition } from './transitiondatacondition';
import { Enddatacondition } from './enddatacondition';

export type Datacondition /* Switch state data based condition */ =
  | Transitiondatacondition
  | /* Switch state data based condition */ Enddatacondition;
