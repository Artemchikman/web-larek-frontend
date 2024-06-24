export enum Events {
    DATA_LOADED = 'dataLoaded',
    // другие события
  }
  
  export interface EventBroker {
    on(event: Events, listener: Function): void;
    off(event: Events, listener: Function): void;
    emit(event: Events, data?: any): void;
  }
  