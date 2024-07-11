// Тип для имени события, которое может быть строкой или регулярным выражением
type EventName = string | RegExp;

// Тип для подписчика на событие, который является функцией
type Subscriber = Function;

// Интерфейс для описания методов управления событиями
export interface IEvents {
  // Метод подписки на событие
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  // Метод для вызова события
  emit<T extends object>(event: string, data?: T): void;
}

// Класс для реализации интерфейса IEvents
export class EventEmitter implements IEvents {
  // Хранение событий в виде карты, где ключом является имя события, а значением множество подписчиков
  _events: Map<EventName, Set<Subscriber>>;

  constructor() {
    // Инициализация пустой карты событий при создании экземпляра класса
    this._events = new Map<EventName, Set<Subscriber>>();
  }

  // Метод подписки на событие
  on<T extends object>(eventName: EventName, callback: (event: T) => void) {
    // Если события с данным именем еще нет в карте, создаем новое множество для подписчиков
    if (!this._events.has(eventName)) {
      this._events.set(eventName, new Set<Subscriber>());
    }
    // Добавляем подписчика в множество для данного события
    this._events.get(eventName)?.add(callback);
  }

  // Метод отписки от события
  off(eventName: EventName, callback: Subscriber) {
    // Проверяем, есть ли такое событие в карте
    if (this._events.has(eventName)) {
      // Удаляем подписчика из множества для данного события
      this._events.get(eventName)?.delete(callback);
      // Если множество подписчиков стало пустым, удаляем событие из карты
      if (this._events.get(eventName)?.size === 0) {
        this._events.delete(eventName);
      }
    }
  }

  // Метод вызова события
  emit<T extends object>(eventName: string, data?: T) {
    // Перебираем все события в карте
    this._events.forEach((subscribers, name) => {
      // Если имя события является '*' (любое событие), вызываем всех подписчиков с данными о событии и его данных
      if (name === '*') {
        subscribers.forEach(callback => callback({
          eventName,
          data
        }));
      }
      // Если имя события является регулярным выражением и событие соответствует этому выражению, вызываем подписчиков с данными
      if (name instanceof RegExp && name.test(eventName) || name === eventName) {
        subscribers.forEach(callback => callback(data));
      }
    });
  }
}
