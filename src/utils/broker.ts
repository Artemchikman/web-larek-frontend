type EventHandler = (...args: any[]) => void;

export class EventEmitter {
  private events: Record<string, EventHandler[]> = {};

  on(event: string, listener: EventHandler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event: string, listener: EventHandler) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;

    this.events[event].forEach(listener => listener(...args));
  }
}
