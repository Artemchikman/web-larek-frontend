// Базовый компонент
export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	// Переключить класс
	toggleClass(element: HTMLElement, className: string, force?: boolean): void {
		element.classList.toggle(className, force);
	}

	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}
	// Установить текстовое содержимое
	protected setText(element: HTMLElement, value: string): void {
		element.textContent = String(value);
	}

	// Установить изображение с алтернативным текстом
	protected setImage(
		element: HTMLImageElement,
		src: string,
		alt?: string
	): void {
		element.src = src;
		if (alt) {
			element.alt = alt;
		}
	}

	// Вернуть корневой DOM-элемент
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
