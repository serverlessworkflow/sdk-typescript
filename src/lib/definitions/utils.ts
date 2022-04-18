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
export function overwriteSchedule(object: { schedule: string | Specification.Schedule }): void {
  if (isObject(object.schedule)) {
    object.schedule = new Specification.Schedule(object.schedule);
  }
}

/**
 * Modify the provided object, set the value to 'start' property as an instance of Specification.Startdef class, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteStart(object: { start?: string | Specification.Startdef }): void {
  if (isObject(object.start)) {
    object.start = new Specification.Startdef(object.start);
  }
}

/**
 * Modify the provided object, set the value to 'end' property as an instance of Specification.End class, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteEnd(object: { end?: boolean | Specification.End }): void {
  if (isObject(object.end)) {
    object.end = new Specification.End(object.end);
  }
}

/**
 * Modify the provided object, set the value to 'cron' property as an instance of Specification.Crondef class, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteCron(object: { cron?: string | Specification.Crondef }): void {
  if (isObject(object.cron)) {
    object.cron = new Specification.Crondef(object.cron);
  }
}

/**
 * Modify the provided object, set the value to 'transition' property as an instance of Specification.Transition class, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteTransition(object: { transition?: string | Specification.Transition }): void {
  if (isObject(object.transition)) {
    object.transition = new Specification.Transition(object.transition);
  }
}

/**
 * Modify the provided object, set the value to 'defaultCondition' property as an instance of Specification.Defaultconditiondef class
 * @param object to set/overwrite the property
 */
export function overwriteDefaultCondition(object: { defaultCondition?: Specification.Defaultconditiondef }): void {
  object.defaultCondition = object.defaultCondition && new Specification.Defaultconditiondef(object.defaultCondition);
}

/**
 * Modify the provided object, set the value to 'eventConditions' property as an instance of Specification.Eventcondition[] class
 * Throws an error if provided value is neither a Transitioneventcondition nor a Enddeventcondition
 * @param object to set/overwrite the property
 */
export function overwriteEventConditions(object: { eventConditions: Specification.Eventcondition[] }): void {
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
export function overwriteDataConditions(object: { dataConditions: Specification.Datacondition[] }): void {
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
export function overwriteActions(object: { actions?: Specification.Action[] }): void {
  if (Array.isArray(object.actions)) {
    object.actions = object.actions.map((v) => new Specification.Action(v));
  }
}

/**
 * Modify the provided object, set the value to 'onEvents' property as an instance of Specification.Onevents[] class
 * @param object to set/overwrite the property
 */
export function overwriteOnEvents(object: { onEvents: Specification.Onevents[] }): void {
  object.onEvents = object.onEvents.map((event) => new Specification.Onevents(event));
}

/**
 * Modify the provided object, set the value to 'stateDataFilter' property as an instance of Specification.Statedatafilter class
 * @param object to set/overwrite the property
 */
export function overwriteStateDataFilter(object: { stateDataFilter?: Specification.Statedatafilter }): void {
  object.stateDataFilter = object.stateDataFilter && new Specification.Statedatafilter(object.stateDataFilter);
}

/**
 * Modify the provided object, set the value to 'metadata' property as an instance of Specification.Metadata class
 * @param object to set/overwrite the property
 */
export function overwriteMetadata(object: { metadata?: Specification.Metadata }): void {
  object.metadata = object.metadata && new Specification.Metadata(object.metadata);
}

/**
 * Modify the provided object, set the value to 'retries' property as an instance of Specification.Retries class
 * @param object to set/overwrite the property
 */
export function overwriteRetries(object: { retries?: Specification.Retries }) {
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
export function overwriteEvents(object: { events?: Specification.Events }) {
  if (Array.isArray(object.events)) {
    object.events = (object.events as Specification.Eventdef[]).map(
      (f) => new Specification.Eventdef(f)
    ) as Specification.Events;
  }
}

/**
 * Modify the provided object, set the value to 'errors' property as an instance of Specification.Errors class
 * @param object to set/overwrite the property
 */
export function overwriteErrors(object: { errors?: Specification.Errors }) {
  if (Array.isArray(object.errors)) {
    object.errors = (object.errors as Specification.Errordef[]).map(
      (f) => new Specification.Errordef(f)
    ) as Specification.Errors;
  }
}

/**
 * Modify the provided object, set the value to 'auth' property as an instance of Specification.Auth class
 * @param object to set/overwrite the property
 */
export function overwriteAuth(object: { auth?: Specification.Auth }) {
  if (Array.isArray(object.auth)) {
    object.auth = (object.auth as Specification.Authdef[]).map(
      (f) => new Specification.Authdef(f)
    ) as Specification.Auth;
  }
}

/**
 * Modify the provided object, set the value to 'functions' property as an instance of Specification.Functions class
 * @param object to set/overwrite the property
 */
export function overwriteFunctions(object: { functions?: Specification.Functions }) {
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
export function overwriteStates(object: { states: Specification.States }) {
  object.states =
    object.states &&
    ((object.states as Specification.States).map((v) => {
      switch (v.type) {
        case 'sleep':
          return new Specification.Sleepstate(v);
        case 'event':
          return new Specification.Eventstate(v);
        case 'operation':
          return new Specification.Operationstate(v);
        case 'parallel':
          return new Specification.Parallelstate(v);
        case 'switch':
          const switchState: any = v;
          if (switchState.dataConditions) {
            return new Specification.Databasedswitchstate(v);
          }
          if (switchState.eventConditions) {
            return new Specification.Eventbasedswitchstate(v);
          }
          throw new Error(`Unexpected switch type; \n state value= ${JSON.stringify(v, null, 4)}`);
        case 'inject':
          return new Specification.Injectstate(v);
        case 'foreach':
          return new Specification.Foreachstate(v);
        case 'callback':
          return new Specification.Callbackstate(v);
        default:
          throw new Error(`Unexpected type= ${v.type}; \n state value= ${JSON.stringify(v, null, 4)}`);
      }
    }) as Specification.States);
}

/**
 * Modify the provided object, set the value to 'properties' property as an instance of Specification.Properties class, if the provided value is an object
 * Throws an error if the value of the property type is not handler
 * @param object to set/overwrite the property
 */
export function overwriteProperties(object: { properties: string | Specification.Properties }) {
  if (isObject(object.properties)) {
    const properties: any = object.properties;

    if (properties.username && properties.password) {
      object.properties = new Specification.Basicpropsdef(object);
    }

    if (properties.token) {
      object.properties = new Specification.Bearerpropsdef(object);
    }

    if (properties.grantType) {
      object.properties = new Specification.Oauth2propsdef(object);
    }
  }
}

/**
 * Modify the provided object, set the value to 'correlation' property as an instance of Specification.CorrelationDefs class
 * @param object to set/overwrite the property
 */
export function overwriteCorrelation(object: { correlation?: Specification.CorrelationDefs }): void {
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
export function overwriteAction(object: { action?: Specification.Action }): void {
  object.action = object.action && new Specification.Action(object.action);
}

/**
 * Modify the provided object, set the value to 'workflowExecTimeout' property as an instance of Specification.WorkflowExecTimeout class
 * @param object to set/overwrite the property
 */
export function overwriteWorkflowExecTimeout(object: {
  workflowExecTimeout?: Specification.WorkflowExecTimeout;
}): void {
  object.workflowExecTimeout =
    object.workflowExecTimeout && new Specification.WorkflowExecTimeout(object.workflowExecTimeout);
}

/**
 * Modify the provided object, set the value to 'stateExecTimeout' property as an instance of Specification.StateExecTimeout class
 * @param object to set/overwrite the property
 */
export function overwriteStateExecTimeout(object: { stateExecTimeout?: Specification.StateExecTimeout }): void {
  object.stateExecTimeout = object.stateExecTimeout && new Specification.StateExecTimeout(object.stateExecTimeout);
}

/**
 * Modify the provided object, set the value to 'eventDataFilter' property as an instance of Specification.Eventdatafilter class
 * @param object to set/overwrite the property
 */
export function overwriteEventDataFilter(object: { eventDataFilter?: Specification.Eventdatafilter }): void {
  object.eventDataFilter = object.eventDataFilter && new Specification.Eventdatafilter(object.eventDataFilter);
}

/**
 * Modify the provided object, set the value to 'onErrors' property as an instance of Specification.Error[] class
 * @param object to set/overwrite the property
 */
export function overwriteOnErrors(object: { onErrors?: Specification.Error[] }): void {
  if (Array.isArray(object.onErrors)) {
    object.onErrors = object.onErrors.map((error) => new Specification.Error(error));
  }
}

/**
 * Modify the provided object, set the value to 'branches' property as an instance of Specification.Branch[] class
 * @param object to set/overwrite the property
 */
export function overwriteBranches(object: { branches?: Specification.Branch[] }): void {
  if (Array.isArray(object.branches)) {
    object.branches = object.branches.map((v) => new Specification.Branch(v));
  }
}

/**
 * Modify the provided object, set the value to 'produceEvents' property as an instance of Specification.Produceeventdef[] class
 * @param object to set/overwrite the property
 */
export function overwriteProduceEvents(object: { produceEvents?: Specification.Produceeventdef[] }): void {
  if (Array.isArray(object.produceEvents)) {
    object.produceEvents = object.produceEvents.map((produceEvent) => new Specification.Produceeventdef(produceEvent));
  }
}

/**
 * Modify the provided object, set the value to 'functionRef' property as an instance of Specification.Functionref class, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteFunctionRef(object: { functionRef?: string | Specification.Functionref }): void {
  if (isObject(object.functionRef)) {
    object.functionRef = new Specification.Functionref(object.functionRef);
  }
}

/**
 * Modify the provided object, set the value to 'continueAs' property as an instance of Specification. Continueasdef, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteContinueAs(object: { continueAs?: string | Specification.Continueasdef }): void {
  if (isObject(object.continueAs)) {
    object.continueAs = new Specification.Continueasdef(object.continueAs);
  }
}

/**
 * Modify the provided object, set the value to 'subFlowRef' property as an instance of Specification.Subflowref class, if the provided value is an object
 * @param object to set/overwrite the property
 */
export function overwriteSubFlowRef(object: { subFlowRef?: string | Specification.Subflowref }): void {
  if (isObject(object.subFlowRef)) {
    object.subFlowRef = new Specification.Subflowref(object.subFlowRef);
  }
}

/**
 * Modify the provided object, set the value to 'eventRef' property as an instance of Specification.Eventref class
 * @param object to set/overwrite the property
 */
export function overwriteEventRef(object: { eventRef?: Specification.Eventref }): void {
  object.eventRef = object.eventRef && new Specification.Eventref(object.eventRef);
}

/**
 * Modify the provided object, set the value to 'sleep' property as an instance of Specification.Sleep class
 * @param object to set/overwrite the property
 */
export function overwriteSleep(object: { sleep?: Specification.Sleep }): void {
  object.sleep = object.sleep && new Specification.Sleep(object.sleep);
}

/**
 * Modify the provided object, set the value to 'actionDataFilter' property as an instance of Specification.Actiondatafilter class
 * @param object to set/overwrite the property
 */
export function overwriteActionDataFilter(object: { actionDataFilter?: Specification.Actiondatafilter }): void {
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
export function normalizeEnd(object: { end?: boolean | Specification.End }) {
  if (isObject(object.end)) {
    object.end = (object.end as Specification.End).normalize();
  }
}

/**
 * Modify the provided object, deep cloning the value of the provided property
 * @param property to be cloned
 * @param object to set/overwrite the property
 */
export function overwritePropertyAsPlainType(property: string, object: any): void {
  if (isObject(object[property])) {
    Object.assign(object, { [property]: JSON.parse(JSON.stringify(object[property])) });
  }
}

/**
 * Modify the provided object, set the value to 'timeouts.stateExecTimeout' property as an instance of Specification.StateExecTimeout class,
 * for the rest of the properties the value is cloned
 * @param object to set/overwrite the property
 */
export function overwriteTimeoutWithStateExecTimeout(object: {
  timeouts?: {
    stateExecTimeout?: Specification.StateExecTimeout;
  };
}): void {
  overwritePropertyAsPlainType('timeouts', object);

  const timeouts = object.timeouts!;
  if (timeouts && isObject(timeouts.stateExecTimeout)) {
    timeouts.stateExecTimeout = new Specification.StateExecTimeout(timeouts.stateExecTimeout);
  }
}

/**
 * Modify the provided object, set the value to 'timeouts' property as an instance of Specification.Timeouts class
 * @param object to set/overwrite the property
 */
export function overwriteTimeouts(object: { timeouts?: string | Specification.Timeouts }): void {
  if (isObject(object.timeouts)) {
    object.timeouts = object.timeouts && new Specification.Timeouts(object.timeouts);
  }
}

/**
 * Modify the provided object by normalizing the 'subFlowRef' property.
 * @param object to be modified
 */
export function normalizeSubFlowRef(object: { subFlowRef?: string | Specification.Subflowref }) {
  if (isObject(object.subFlowRef)) {
    object.subFlowRef = (object.subFlowRef as Specification.Subflowref).normalize();
  }
}

/**
 * Modify the provided object by normalizing the 'continueAs' property.
 * @param object to be modified
 */
export function normalizeContinueAs(object: { continueAs?: string | Specification.Continueasdef }) {
  if (isObject(object.continueAs)) {
    object.continueAs = (object.continueAs as Specification.Continueasdef).normalize();
  }
}

/**
 * Modify the provided object by normalizing the 'defaultCondition' property.
 * @param object to be modified
 */
export function normalizeDefaultCondition(object: { defaultCondition?: Specification.Defaultconditiondef }) {
  object.defaultCondition = object.defaultCondition && object.defaultCondition.normalize();
}

/**
 * Modify the provided object by normalizing the 'workflowExecTimeout' property.
 * @param object to be modified
 */
export function normalizeWorkflowExecTimeout(object: { workflowExecTimeout?: Specification.WorkflowExecTimeout }) {
  object.workflowExecTimeout = object.workflowExecTimeout && object.workflowExecTimeout.normalize();
}

/**
 * Modify the provided object by normalizing the 'onEvents' property.
 * @param object to be modified
 */
export function normalizeOnEvents(object: { onEvents: Specification.Onevents[] }) {
  object.onEvents = object.onEvents && object.onEvents.map((onEvent) => onEvent.normalize());
}

/**
 * Modify the provided object by normalizing the 'onErrors' property.
 * @param object to be modified
 */
export function normalizeOnErrors(object: { onErrors?: Specification.Error[] }): void {
  if (Array.isArray(object.onErrors)) {
    object.onErrors = object.onErrors.map((error) => error.normalize());
  }
}

/**
 * Modify the provided object by normalizing the 'branches' property.
 * @param object to be modified
 */
export function normalizeBranches(object: { branches?: Specification.Branch[] }): void {
  if (Array.isArray(object.branches)) {
    object.branches = object.branches.map((branch) => branch.normalize());
  }
}

/**
 * Modify the provided object by normalizing the 'actions' property.
 * @param object to be modified
 */
export function normalizeActions(object: { actions?: Specification.Action[] }): void {
  if (Array.isArray(object.actions)) {
    object.actions = object.actions.map((action) => action.normalize());
  }
}

/**
 * Modify the provided object by normalizing the 'action' property.
 * @param object to be modified
 */
export function normalizeAction(object: { action?: Specification.Action }): void {
  object.action = object.action && object.action.normalize();
}

/**
 * Modify the provided object by normalizing the 'dataConditions' property.
 * @param object to be modified
 */
export function normalizeDataConditions(object: { dataConditions?: Specification.Datacondition[] }): void {
  if (Array.isArray(object.dataConditions)) {
    object.dataConditions = object.dataConditions.map((dc) => dc.normalize());
  }
}

/**
 * Modify the provided object by normalizing the 'eventConditions' property.
 * @param object to be modified
 */
export function normalizeEventConditions(object: { eventConditions?: Specification.Eventcondition[] }): void {
  if (Array.isArray(object.eventConditions)) {
    object.eventConditions = object.eventConditions.map((event) => event.normalize());
  }
}

/**
 * Modify the provided object by normalizing the 'transition' property if property type is Specification.Transition.
 * @param object to be modified
 */
export function normalizeTransition(object: { transition?: string | Specification.Transition }) {
  if (isObject(object.transition)) {
    object.transition = (object.transition as Specification.Transition).normalize();
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
 * Modify the provided object by normalizing the 'auth' property.
 * @param object to be modified
 */
export function normalizeAuth(object: { auth?: Specification.Auth }) {
  if (Array.isArray(object.auth)) {
    object.auth = object.auth.map((auth) => {
      return auth.normalize();
    }) as Specification.Auth;
  }
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
 * Modify the provided object by normalizing the 'timeouts' property.
 * @param object to be modified
 */
export function normalizeTimeouts(object: { timeouts?: string | Specification.Timeouts }) {
  if (isObject(object.timeouts)) {
    object.timeouts = object.timeouts && object.timeouts.normalize();
  }
}

/**
 * Modify the provided object by normalizing the 'eventRef' property.
 * @param object to be modified
 */
export function normalizeEventRef(object: { eventRef?: Specification.Eventref }) {
  if (isObject(object.eventRef)) {
    object.eventRef = object.eventRef && object.eventRef.normalize();
  }
}

/**
 * Modify the provided object by normalizing the 'functionRef' property.
 * @param object to be modified
 */
export function normalizeFunctionRef(object: { functionRef?: string | Specification.Functionref }) {
  if (isObject(object.functionRef)) {
    object.functionRef = object.functionRef && object.functionRef.normalize();
  }
}

/**
 * Modify the provided object by normalizing the 'actionMode' property.
 * @param object to be modified
 */
export function normalizeActionMode(target: { actionMode?: string }, source?: { actionMode?: string }) {
  if (!source?.actionMode) {
    delete target.actionMode;
  }
}

/**
 * Modify the provided object by normalizing the 'completionType' property.
 * @param object to be modified
 */
export function normalizeCompletionType(object: { completionType?: string }, source?: { completionType?: string }) {
  if (!source?.completionType) {
    delete object.completionType;
  }
}

/**
 * Modify the provided object by normalizing the 'usedForCompensation' property.
 * @param object to be modified
 */
export function normalizeUsedForCompensation(
  object: { usedForCompensation?: boolean },
  source?: { usedForCompensation?: boolean }
) {
  if (source?.usedForCompensation === undefined) {
    delete object.usedForCompensation;
  }
}

/**
 * Modify the provided object by normalizing the 'mode' property.
 * @param object to be modified
 */
export function normalizeMode(object: { mode?: string }, source?: { mode?: string }) {
  if (!source?.mode) {
    delete object.mode;
  }
}

/**
 * Modify the provided object by normalizing the 'compensate' property.
 * @param object to be modified
 */
export function normalizeCompensate(object: { compensate?: boolean }, source?: { compensate?: boolean }) {
  if (source?.compensate === undefined) {
    delete object.compensate;
  }
}

/**
 * Modify the provided object by normalizing the 'scheme' property.
 * @param object to be modified
 */
export function normalizeScheme(object: { scheme?: string }, source?: { scheme?: string }) {
  if (!source?.scheme) {
    delete object.scheme;
  }
}

/**
 * Modify the provided object by normalizing the 'terminate' property.
 * @param object to be modified
 */
export function normalizeTerminate(object: { terminate?: boolean }, source?: { terminate?: boolean }) {
  if (source?.terminate === undefined) {
    delete object.terminate;
  }
}

/**
 * Modify the provided object by normalizing the 'exclusive' property.
 * @param object to be modified
 */
export function normalizeExclusive(object: { exclusive?: boolean }, source?: { exclusive?: boolean }) {
  if (source?.exclusive === undefined) {
    delete object.exclusive;
  }
}

/**
 * Modify the provided object by normalizing the 'keepActive' property.
 * @param object to be modified
 */
export function normalizeKeepActive(object: { keepActive?: boolean }, source?: { keepActive?: boolean }) {
  if (source?.keepActive === undefined) {
    delete object.keepActive;
  }
}

/**
 * Modify the provided object by normalizing the 'expressionLang' property.
 * @param object to be modified
 */
export function normalizeExpressionLang(object: { expressionLang?: string }, source?: { expressionLang?: string }) {
  if (!source?.expressionLang) {
    delete object.expressionLang;
  }
}

/**
 * Modify the provided object by normalizing the 'interrupt' property.
 * @param object to be modified
 */
export function normalizeInterrupt(object: { interrupt?: boolean }, source?: { interrupt?: boolean }) {
  if (source?.interrupt === undefined) {
    delete object.interrupt;
  }
}

/**
 * Modify the provided object by normalizing the 'type' property.
 * @param object to be modified
 */
export function normalizeType(object: { type?: string }, source?: { type?: string }) {
  if (!source?.type) {
    delete object.type;
  }
}

/**
 * Modify the provided object by normalizing the 'invoke' property.
 * @param object to be modified
 */
export function normalizeInvoke(object: { invoke?: string }, source?: { invoke?: string }) {
  if (!source?.invoke) {
    delete object.invoke;
  }
}

/**
 * Modify the provided object by normalizing the 'onParentComplete' property.
 * @param object to be modified
 */
export function normalizeOnParentComplete(
  object: { onParentComplete?: 'continue' | 'terminate' },
  source?: { onParentComplete?: 'continue' | 'terminate' }
) {
  if (!source?.onParentComplete) {
    delete object.onParentComplete;
  }
}

/**
 * Modify the provided object by normalizing the 'kind' property.
 * @param object to be modified
 */
export function normalizeKind(object: { kind?: string }, source?: { kind?: string }) {
  if (!source?.kind) {
    delete object.kind;
  }
}

/**
 * Modify the provided object by normalizing the 'dataOnly' property.
 * @param object to be modified
 */
export function normalizeDataOnly(object: { dataOnly?: boolean }, source?: { dataOnly?: boolean }) {
  if (source?.dataOnly === undefined) {
    delete object.dataOnly;
  }
}

/**
 * Modify the provided object by deleting the 'source' property
 * @param object
 */
export function cleanSourceModelProperty(object?: { sourceModel?: any }): void {
  delete object?.sourceModel;
}
