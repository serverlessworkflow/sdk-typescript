/*
 * Copyright 2021-Present The Serverless Workflow Specification Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Specification } from '../definitions';
import { isObject } from '../utils';

export class MermaidState {
  constructor(
    private state: {
      name?: string;
      type?: string;
      transition?: string | Specification.Transition;
      end?: boolean | Specification.End;
      onErrors?: Specification.Error[];
    },
    private isFirstState: boolean = false
  ) {}

  sourceCode() {
    return this.definitions() + '\n' + this.transitions();
  }

  private definitions(): string {
    return (
      this.definitionName() +
      '\n' +
      this.definitionType() +
      (this.definitionDetails() !== undefined ? '\n' + this.definitionDetails() : '')
    );
  }

  private transitions(): string {
    const transitions: string[] = [];

    transitions.push(...this.startTransition());
    transitions.push(...this.dataConditionsTransitions());
    transitions.push(...this.eventConditionsTransition());
    transitions.push(...this.errorTransitions());
    transitions.push(...this.naturalTransition(this.stateName(), this.state.transition));
    transitions.push(...this.endTransition());

    return transitions.reduce((p, c) => {
      return p + '\n' + c;
    });
  }

  private stateName() {
    return this.state.name?.replace(' ', '_');
  }

  private startTransition() {
    const transitions: string[] = [];
    if (this.isFirstState) {
      const stateName = this.stateName();
      transitions.push(this.transitionDescription('[*]', stateName));
    }
    return transitions;
  }

  private dataConditionsTransitions() {
    const transitions: string[] = [];

    const dataBasedSwitchState = this.state as Specification.Databasedswitch;
    if (dataBasedSwitchState.dataConditions) {
      const stateName = this.stateName();
      dataBasedSwitchState.dataConditions.forEach((dataCondition) => {
        const transitionDataCondition = dataCondition as Specification.Transitiondatacondition;

        transitions.push(
          ...this.naturalTransition(stateName, transitionDataCondition.transition, transitionDataCondition.condition)
        );

        const endDataCondition = dataCondition as Specification.Enddatacondition;
        if (endDataCondition.end) {
          transitions.push(this.transitionDescription(stateName, '[*]', transitionDataCondition.condition));
        }
      });

      transitions.push(...this.defaultConditionTransition(dataBasedSwitchState));
    }
    return transitions;
  }

  private eventConditionsTransition() {
    const transitions: string[] = [];

    const eventBasedSwitchState = this.state as Specification.Eventbasedswitch;
    if (eventBasedSwitchState.eventConditions) {
      const stateName = this.stateName();
      eventBasedSwitchState.eventConditions.forEach((eventCondition) => {
        const transitionEventCondition = eventCondition as Specification.Transitioneventcondition;

        transitions.push(...this.naturalTransition(stateName, transitionEventCondition.transition));

        const endEventCondition = eventCondition as Specification.Enddeventcondition;
        if (endEventCondition.end) {
          transitions.push(this.transitionDescription(stateName, '[*]'));
        }
      });

      transitions.push(...this.defaultConditionTransition(eventBasedSwitchState));
    }
    return transitions;
  }

  private defaultConditionTransition(state: { defaultCondition?: Specification.Defaultconditiondef }) {
    const transitions: string[] = [];

    if (state.defaultCondition) {
      transitions.push(...this.naturalTransition(this.stateName(), state.defaultCondition.transition, 'default'));
    }
    return transitions;
  }

  private endTransition() {
    const transitions: string[] = [];

    if (this.state.end) {
      const stateName = this.stateName();
      let transitionLabel = undefined;

      if (isObject(this.state.end)) {
        const end = this.state.end as Specification.End;

        if (end.produceEvents!.length > 0) {
          transitionLabel = 'Produced event = [' + end.produceEvents!.map((pe) => pe.eventRef).join(',') + ']';
        }
      }

      transitions.push(this.transitionDescription(stateName, '[*]', transitionLabel));
    }
    return transitions;
  }

  private naturalTransition(
    start?: string,
    end?: string | Specification.Transition,
    label: string | undefined = undefined
  ) {
    const transitions: string[] = [];

    if (end) {
      let descTransition = '';
      if (isObject(end)) {
        descTransition = (end as Specification.Transition).nextState;
      } else if (typeof end === 'string') {
        descTransition = end;
      }
      transitions.push(this.transitionDescription(start, descTransition, label ? label : undefined));
    }
    return transitions;
  }

  private errorTransitions() {
    const transitions: string[] = [];

    if (this.state.onErrors) {
      this.state.onErrors.forEach((error) => {
        transitions.push(...this.naturalTransition(this.stateName(), error.transition, error.errorRef));
      });
    }
    return transitions;
  }

  private definitionDetails() {
    switch (this.state.type) {
      case 'sleep':
        return this.sleepStateDetails();
      case 'event':
        return undefined; //NOTHING
      case 'operation':
        return this.operationStateDetails();
      case 'parallel':
        return this.parallelStateDetails();
      case 'switch':
        const switchState: any = this.state;
        if (switchState.dataConditions) {
          return this.dataBasedSwitchStateDetails();
        }
        if (switchState.eventConditions) {
          return this.eventBasedSwitchStateDetails();
        }
        throw new Error(`Unexpected switch type; \n state value= ${JSON.stringify(this.state, null, 4)}`);
      case 'inject':
        return undefined; // NOTHING
      case 'foreach':
        return this.foreachStateDetails();
      case 'callback':
        return this.callbackStateDetails();
      default:
        throw new Error(`Unexpected type= ${this.state.type}; \n state value= ${JSON.stringify(this.state, null, 4)}`);
    }
  }

  private definitionType() {
    const type = this.state.type;
    return this.stateDescription(this.stateName(), 'type', type!.charAt(0).toUpperCase() + type!.slice(1) + ' State');
  }

  private parallelStateDetails(): string | undefined {
    const parallelState = this.state as Specification.Parallelstate;

    const descriptions: string[] = [];

    if (parallelState.completionType) {
      descriptions.push(this.stateDescription(this.stateName(), 'Completion type', parallelState.completionType));
    }

    if (parallelState.branches) {
      descriptions.push(
        this.stateDescription(this.stateName(), 'Num. of branches', parallelState.branches?.length + '')
      );
    }

    return descriptions.length > 0
      ? descriptions.reduce((p, c) => {
          return p + '\n' + c;
        })
      : undefined;
  }

  private eventBasedSwitchStateDetails() {
    return this.stateDescription(this.stateName(), `Condition type`, `event-based`);
  }

  private dataBasedSwitchStateDetails() {
    return this.stateDescription(this.stateName(), `Condition type`, `data-based`);
  }

  private operationStateDetails() {
    const state = this.state as Specification.Operationstate;

    const descriptions: string[] = [];

    if (state.actionMode) {
      descriptions.push(this.stateDescription(this.stateName(), 'Action mode', state.actionMode));
    }

    if (state.actions) {
      descriptions.push(this.stateDescription(this.stateName(), 'Num. of actions', state.actions?.length + ''));
    }

    return descriptions.length > 0
      ? descriptions.reduce((p, c) => {
          return p + '\n' + c;
        })
      : undefined;
  }

  private sleepStateDetails() {
    const state = this.state as Specification.Sleepstate;
    if (state.duration) {
      return this.stateDescription(this.stateName(), 'Duration', state.duration);
    }

    return undefined;
  }

  private foreachStateDetails() {
    const state = this.state as Specification.Foreachstate;

    const descriptions: string[] = [];

    if (state.inputCollection) {
      descriptions.push(this.stateDescription(this.stateName(), 'Input collection', state.inputCollection));
    }

    if (state.actions) {
      descriptions.push(this.stateDescription(this.stateName(), 'Num. of actions', state.actions?.length + ''));
    }

    return descriptions.length > 0
      ? descriptions.reduce((p, c) => {
          return p + '\n' + c;
        })
      : undefined;
  }

  private callbackStateDetails() {
    const state = this.state as Specification.Callbackstate;

    const descriptions: string[] = [];

    if (state.action && state.action.functionRef) {
      const functionRef = state.action.functionRef;
      let functionRefDescription = '';
      if (isObject(functionRef)) {
        functionRefDescription = (functionRef as Specification.Functionref).refName;
      } else if (typeof functionRef === 'string') {
        functionRefDescription = functionRef as string;
      }
      descriptions.push(this.stateDescription(this.stateName(), 'Callback function', functionRefDescription));
    }

    if (state.eventRef) {
      descriptions.push(this.stateDescription(this.stateName(), 'Callback event', state.eventRef));
    }

    return descriptions.length > 0
      ? descriptions.reduce((p, c) => {
          return p + '\n' + c;
        })
      : undefined;
  }

  private definitionName() {
    return this.stateName() + ' : ' + this.stateName();
  }

  private transitionDescription(
    start: string | undefined,
    end: string | undefined,
    label: string | undefined = undefined
  ) {
    return start + ' --> ' + end + (label ? ' : ' + label : '');
  }

  private stateDescription(stateName: string | undefined, description: string, value: string) {
    return stateName + ` : ${description} = ${value}`;
  }
}
