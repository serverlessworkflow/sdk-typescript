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
import { Specification } from './index';
import { isObject } from '../utils';

/**
 * Modify the provided object, set the value to 'schedule' property as an instance of Specification.Schedule class, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteScheduleValueIfObject(object: { schedule: string | Specification.Schedule }): void {
  if (isObject(object.schedule)) {
    object.schedule = new Specification.Schedule(object.schedule);
  }
}

/**
 * Modify the provided object, set the value to 'repeat' property as an instance of Specification.Repeat class
 * @param object to set/overwrite the property
 */
export function overwriteRepeatValue(object: { repeat?: Specification.Repeat }): void {
  object.repeat = object.repeat && new Specification.Repeat(object.repeat);
}

/**
 * Modify the provided object, set the value to 'end' property as an instance of Specification.End class, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteEndValueIfObject(object: { end?: boolean | Specification.End }): void {
  if (isObject(object.end)) {
    object.end = new Specification.End(object.end);
  }
}

/**
 * Modify the provided object, set the value to 'cron' property as an instance of Specification.Crondef class, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteCronValueIfObject(object: { cron?: string | Specification.Crondef }): void {
  if (isObject(object.cron)) {
    object.cron = new Specification.Crondef(object.cron);
  }
}

/**
 * Modify the provided object, set the value to 'transition' property as an instance of Specification.Transition class, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteTransitionValueIfObject(object: { transition?: string | Specification.Transition }): void {
  if (isObject(object.transition)) {
    object.transition = new Specification.Transition(object.transition);
  }
}

/**
 * Modify the provided object, set the value to 'default' property as an instance of Specification.Defaultdef class
 * @param object to set/overwrite the property
 */
export function overwriteDefaultValue(object: { default?: Specification.Defaultdef }): void {
  object.default = object.default && new Specification.Defaultdef(object.default);
}

/**
 * Modify the provided object, set the value to 'eventConditions' property as an instance of Specification.Eventcondition[] class
 * Throws an error if provided value is neither a Transitioneventcondition nor a Enddeventcondition
 * @param object to set/overwrite the property
 */
export function overwriteEventConditionsValue(object: { eventConditions: Specification.Eventcondition[] }): void {
  if (Array.isArray(object.eventConditions)) {
    object.eventConditions = object.eventConditions.map((eventCondition: any) => {
      if (eventCondition.transition) {
        return new Specification.Transitioneventcondition(eventCondition);
      }

      if (eventCondition.end) {
        return new Specification.Enddeventcondition(eventCondition);
      }

      throw new Error(
        `Provided value is neither Transitioneventcondition nor Enddeventcondition \n data= ${eventCondition} `
      );
    });
  }
}

/**
 * Modify the provided object, set the value to 'dataConditions' property as an instance of Specification.Datacondition[] class
 * Throws an error if provided value is neither a Transitiondatacondition nor a Enddatacondition
 * @param object to set/overwrite the property
 */
export function overwriteDataConditionsValue(object: { dataConditions: Specification.Datacondition[] }): void {
  if (Array.isArray(object.dataConditions)) {
    object.dataConditions = object.dataConditions.map((dataCondition: any) => {
      if (dataCondition.transition) {
        return new Specification.Transitiondatacondition(dataCondition);
      }

      if (dataCondition.end) {
        return new Specification.Enddatacondition(dataCondition);
      }

      throw new Error(
        `Provided value is neither Transitiondatacondition nor Enddatacondition \n data= ${dataCondition} `
      );
    });
  }
}

/**
 * Modify the provided object, set the value to 'actions' property as an instance of Specification.Action[] class
 * @param object to set/overwrite the property
 */
export function overwriteActionsValue(object: { actions?: Specification.Action[] }): void {
  if (Array.isArray(object.actions)) {
    object.actions = object.actions.map((v) => new Specification.Action(v));
  }
}

/**
 * Modify the provided object, set the value to 'onEvents' property as an instance of Specification.Onevents[] class
 * @param object to set/overwrite the property
 */
export function overwriteOnEventsValue(object: { onEvents: Specification.Onevents[] }): void {
  object.onEvents = object.onEvents.map((event) => new Specification.Onevents(event));
}

/**
 * Modify the provided object, set the value to 'stateDataFilter' property as an instance of Specification.Statedatafilter class
 * @param object to set/overwrite the property
 */
export function overwriteStateDataFilterValue(object: { stateDataFilter?: Specification.Statedatafilter }): void {
  object.stateDataFilter = object.stateDataFilter && new Specification.Statedatafilter(object.stateDataFilter);
}

/**
 * Modify the provided object, set the value to 'metadata' property as an instance of Specification.Metadata class
 * @param object to set/overwrite the property
 */
export function overwriteMetadataValue(object: { metadata?: Specification.Metadata }): void {
  object.metadata = object.metadata && new Specification.Metadata(object.metadata);
}

/**
 * Modify the provided object, set the value to 'execTimeout' property as an instance of Specification.Exectimeout class
 * @param object to set/overwrite the property
 */
export function overwriteExecTimeoutValue(object: { execTimeout?: Specification.Exectimeout }): void {
  object.execTimeout = object.execTimeout && new Specification.Exectimeout(object.execTimeout);
}

/**
 * Modify the provided object, set the value to 'retries' property as an instance of Specification.Retries class
 * @param object to set/overwrite the property
 */
export function overwriteRetriesValue(object: { retries?: Specification.Retries }) {
  if (Array.isArray(object.retries)) {
    object.retries = (object.retries as Specification.Retrydef[]).map(
      (f) => new Specification.Retrydef(f)
    ) as Specification.Retries;
  }
}

/**
 * Modify the provided object, set the value to 'events' property as an instance of Specification.Events class
 * @param object to set/overwrite the property
 */
export function overwriteEventsValue(object: { events?: Specification.Events }) {
  if (Array.isArray(object.events)) {
    object.events = (object.events as Specification.Eventdef[]).map(
      (f) => new Specification.Eventdef(f)
    ) as Specification.Events;
  }
}

/**
 * Modify the provided object, set the value to 'functions' property as an instance of Specification.Functions class
 * @param object to set/overwrite the property
 */
export function overwriteFunctionsValue(object: { functions?: Specification.Functions }) {
  if (Array.isArray(object.functions)) {
    object.functions = (object.functions as Specification.Function[]).map(
      (f) => new Specification.Function(f)
    ) as Specification.Functions;
  }
}

/**
 * Modify the provided object, set the value to 'states' property as an instance of Specification.States class
 * Throws an error if the value of the property type is not handler
 * @param object to set/overwrite the property
 */
export function overwriteStatesValue(object: { states: Specification.States }) {
  object.states =
    object.states &&
    ((object.states as Specification.States).map((v) => {
      switch (v.type) {
        case 'inject':
          return new Specification.Injectstate(v);
        case 'subflow':
          return new Specification.Subflowstate(v);
        case 'switch':
          const switchState: any = v;
          if (switchState.dataConditions) {
            return new Specification.Databasedswitch(v);
          }
          if (switchState.eventConditions) {
            return new Specification.Eventbasedswitch(v);
          }
          throw new Error(`Unexpected switch type; \n state value= ${JSON.stringify(v, null, 4)}`);
        case 'operation':
          return new Specification.Operationstate(v);
        case 'event':
          return new Specification.Eventstate(v);
        case 'parallel':
          return new Specification.Parallelstate(v);
        case 'foreach':
          return new Specification.Foreachstate(v);
        case 'delay':
          return new Specification.Delaystate(v);
        case 'callback':
          return new Specification.Callbackstate(v);
        default:
          throw new Error(`Unexpected type= ${v.type}; \n state value= ${JSON.stringify(v, null, 4)}`);
      }
    }) as Specification.States);
}

/**
 * Modify the provided object, set the value to 'correlation' property as an instance of Specification.CorrelationDefs class
 * @param object to set/overwrite the property
 */
export function overwriteCorrelationValue(object: { correlation?: Specification.CorrelationDefs }): void {
  if (Array.isArray(object.correlation)) {
    object.correlation = object.correlation.map(
      (correlation) => new Specification.CorrelationDef(correlation)
    ) as Specification.CorrelationDefs;
  }
}

/**
 * Modify the provided object, set the value to 'action' property as an instance of Specification.Action class
 * @param object to set/overwrite the property
 */
export function overwriteActionValue(object: { action?: Specification.Action }): void {
  object.action = object.action && new Specification.Action(object.action);
}

/**
 * Modify the provided object, set the value to 'eventDataFilter' property as an instance of Specification.Eventdatafilter class
 * @param object to set/overwrite the property
 */
export function overwriteEventDataFilterValue(object: { eventDataFilter?: Specification.Eventdatafilter }): void {
  object.eventDataFilter = object.eventDataFilter && new Specification.Eventdatafilter(object.eventDataFilter);
}

/**
 * Modify the provided object, set the value to 'onErrors' property as an instance of Specification.Error[] class
 * @param object to set/overwrite the property
 */
export function overwriteOnErrorsValue(object: { onErrors?: Specification.Error[] }): void {
  if (Array.isArray(object.onErrors)) {
    object.onErrors = object.onErrors.map((error) => new Specification.Error(error));
  }
}

/**
 * Modify the provided object, set the value to 'branches' property as an instance of Specification.Branch[] class
 * @param object to set/overwrite the property
 */
export function overwriteBranchesValue(object: { branches?: Specification.Branch[] }): void {
  if (Array.isArray(object.branches)) {
    object.branches = object.branches.map((v) => new Specification.Branch(v));
  }
}

/**
 * Modify the provided object, set the value to 'produceEvents' property as an instance of Specification.Produceeventdef[] class
 * @param object to set/overwrite the property
 */
export function overwriteProduceEventsValue(object: { produceEvents?: Specification.Produceeventdef[] }): void {
  if (Array.isArray(object.produceEvents)) {
    object.produceEvents = object.produceEvents.map((produceEvent) => new Specification.Produceeventdef(produceEvent));
  }
}

/**
 * Modify the provided object, set the value to 'functionRef' property as an instance of Specification.Functionref class
 * @param object to set/overwrite the property
 */
export function overwriteFunctionRefValue(object: { functionRef: string | Specification.Functionref }): void {
  if (isObject(object.functionRef)) {
    object.functionRef = new Specification.Functionref(object.functionRef);
  }
}

/**
 * Modify the provided object, set the value to 'eventRef' property as an instance of Specification.Eventref class
 * @param object to set/overwrite the property
 */
export function overwriteEventRefValue(object: { eventRef?: Specification.Eventref }): void {
  object.eventRef = object.eventRef && new Specification.Eventref(object.eventRef);
}

/**
 * Modify the provided object, set the value to 'actionDataFilter' property as an instance of Specification.Actiondatafilter class
 * @param object to set/overwrite the property
 */
export function overwriteActionDataFilterValue(object: { actionDataFilter?: Specification.Actiondatafilter }): void {
  object.actionDataFilter = object.actionDataFilter && new Specification.Actiondatafilter(object.actionDataFilter);
}

/**
 * Set end to true if neither nor transition properties are defined
 * @param object to modify
 */
export function setEndValueIfNoTransition(object: {
  transition?: string | Specification.Transition;
  end?: boolean | Specification.End;
}): void {
  if (!object.end && !object.transition) {
    object.end = true;
  }
}

/**
 * Modify the provided object by normalizing the 'end' property.
 * @param object to be modified
 */
export function normalizeEndProperty(object: { end?: boolean | Specification.End }) {
  if (isObject(object.end)) {
    object.end = (object.end as Specification.End).normalize();
  }
}
/**
 * Modify the provided object by normalizing the 'actionMode' property, where the default value is 'parallel'.
 * @param object to be modified
 */
export function normalizeActionModeParallelProperty(object: { actionMode?: string }) {
  if (object.actionMode === 'parallel') {
    delete object.actionMode;
  }
}

/**
 * Modify the provided object by normalizing the 'actionMode' property, where the default value is 'sequential'.
 * @param object to be modified
 */
export function normalizeActionModeSequentialProperty(object: { actionMode?: string }) {
  if (object.actionMode === 'sequential') {
    delete object.actionMode;
  }
}

/**
 * Modify the provided object by normalizing the 'completionType' property, where the default value is 'and'.
 * @param object to be modified
 */
export function normalizeCompletionTypeProperty(object: { completionType?: string }) {
  if (object.completionType === 'and') {
    delete object.completionType;
  }
}

/**
 * Modify the provided object by normalizing the 'continueOnError' property, where the default value is 'false'.
 * @param object to be modified
 */
export function normalizeContinueOnErrorProperty(object: { continueOnError?: boolean }) {
  if (!object.continueOnError) {
    delete object.continueOnError;
  }
}

/**
 * Modify the provided object by normalizing the 'checkBefore' property, where the default value is 'false'.
 * @param object to be modified
 */
export function normalizeCheckBeforeProperty(object: { checkBefore?: boolean }) {
  if (!object.checkBefore) {
    delete object.checkBefore;
  }
}

/**
 * Modify the provided object by normalizing the 'repeat' property.
 * @param object to be modified
 */
export function normalizeRepeatProperty(object: { repeat?: Specification.Repeat }) {
  object.repeat = object.repeat && object.repeat.normalize();
}

/**
 * Modify the provided object by normalizing the 'usedForCompensation' property, where the default value is 'false'.
 * @param object to be modified
 */
export function normalizeUsedForCompensationProperty(object: { usedForCompensation?: boolean }) {
  if (!object.usedForCompensation) {
    delete object.usedForCompensation;
  }
}

/**
 * Modify the provided object by normalizing the 'onEvents' property.
 * @param object to be modified
 */
export function normalizeOnEventsProperty(object: { onEvents: Specification.Onevents[] }) {
  object.onEvents = object.onEvents && object.onEvents.map((onEvent) => onEvent.normalize());
}

/**
 * Modify the provided object by normalizing the 'onErrors' property.
 * @param object to be modified
 */
export function normalizeOnErrorsProperty(object: { onErrors?: Specification.Error[] }): void {
  if (Array.isArray(object.onErrors)) {
    object.onErrors = object.onErrors.map((error) => error.normalize());
  }
}

/**
 * Modify the provided object by normalizing the 'dataConditions' property.
 * @param object to be modified
 */
export function normalizeDataConditionsProperty(object: { dataConditions?: Specification.Datacondition[] }): void {
  if (Array.isArray(object.dataConditions)) {
    object.dataConditions = object.dataConditions.map((dc) => dc.normalize());
  }
}

/**
 * Modify the provided object by normalizing the 'eventConditions' property.
 * @param object to be modified
 */
export function normalizeEventConditionsProperty(object: { eventConditions?: Specification.Eventcondition[] }): void {
  if (Array.isArray(object.eventConditions)) {
    object.eventConditions = object.eventConditions.map((event) => event.normalize());
  }
}

/**
 * Modify the provided object by normalizing the 'transition' property if property type is Specification.Transition.
 * @param object to be modified
 */
export function normalizeTransitionProperty(object: { transition?: string | Specification.Transition }) {
  if (isObject(object.transition)) {
    object.transition = (object.transition as Specification.Transition).normalize();
  }
}

/**
 * Modify the provided object by normalizing the 'compensate' property, where the default value is 'false'.
 * @param object to be modified
 */
export function normalizeCompensateProperty(object: { compensate?: boolean }) {
  if (!object.compensate) {
    delete object.compensate;
  }
}

/**
 * Modify the provided object by normalizing the 'terminate' property, where the default value is 'false'.
 * @param object to be modified
 */
export function normalizeTerminateProperty(object: { terminate?: boolean }) {
  if (!object.terminate) {
    delete object.terminate;
  }
}

/**
 * Modify the provided object by normalizing the 'exclusive' property, where the default value is 'true'.
 * @param object to be modified
 */
export function normalizeExclusiveProperty(object: { exclusive?: boolean }) {
  if (object.exclusive) {
    delete object.exclusive;
  }
}

/**
 * Modify the provided object by normalizing the 'keepActive' property, where the default value is 'true'.
 * @param object to be modified
 */
export function normalizeKeepActiveProperty(object: { keepActive?: boolean }) {
  if (object.keepActive) {
    delete object.keepActive;
  }
}

/**
 * Modify the provided object by normalizing the 'expressionLang' property, where the default value is 'jq'.
 * @param object to be modified
 */
export function normalizeExpressionLangProperty(object: { expressionLang?: string }) {
  if (object.expressionLang === 'jq') {
    delete object.expressionLang;
  }
}

/**
 * Modify the provided object by normalizing the 'interrupt' property, where the default value is 'false'.
 * @param object to be modified
 */
export function normalizeInterruptProperty(object: { interrupt?: boolean }) {
  if (!object.interrupt) {
    delete object.interrupt;
  }
}

/**
 * Modify the provided object by normalizing the 'type' property, where the default value is 'rest'.
 * @param object to be modified
 */
export function normalizeTypeRestProperty(object: { type?: string }) {
  if (object.type === 'rest') {
    delete object.type;
  }
}

/**
 * Modify the provided object by normalizing the 'kind' property, where the default value is 'consumed'.
 * @param object to be modified
 */
export function normalizeKindProperty(object: { kind?: string }) {
  if (object.kind === 'consumed') {
    delete object.kind;
  }
}

/**
 * Modify the provided object by normalizing the 'states' property.
 * @param object to be modified
 */
export function normalizeStates(object: { states: Specification.States }) {
  object.states = object.states.map((state) => {
    return state.normalize();
  }) as Specification.States;
}

/**
 * Modify the provided object by normalizing the 'functions' property.
 * @param object to be modified
 */
export function normalizeFunctions(object: { functions?: Specification.Functions }) {
  if (Array.isArray(object.functions)) {
    object.functions = (object.functions as Specification.Function[]).map((f) =>
      f.normalize()
    ) as Specification.Functions;
  }
}

/**
 * Modify the provided object by normalizing the 'events' property.
 * @param object to be modified
 */
export function normalizeEvents(object: { events?: Specification.Events }) {
  if (Array.isArray(object.events)) {
    object.events = (object.events as Specification.Eventdef[]).map((event) =>
      event.normalize()
    ) as Specification.Events;
  }
}

/**
 * Modify the provided object by normalizing the 'execTimeout' property.
 * @param object to be modified
 */
export function normalizeExecTimeout(object: { execTimeout?: Specification.Exectimeout }) {
  object.execTimeout = object.execTimeout && object.execTimeout.normalize();
}
