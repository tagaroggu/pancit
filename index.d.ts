declare interface Signal<T> {
    (): T,
    (T): void
};

declare interface Effect {
    (): void
};

declare interface Computed<T> {
    (): T,
    stop: Effect
};

declare const stop: unique symbol;



declare function signal<T>(initial: T | undefined = undefined): Signal<T>;
declare function effect(callback: () => void): Effect;
declare function computed<T>(callback: () => T): Computed<T>;