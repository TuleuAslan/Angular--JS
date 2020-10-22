export class BaseClass<T> {
    constructor(...parts: Partial<T>[]) {
        Object.assign(this, ...parts);
    }
}