export class DiContainer {
    private static injectables = new Map<any, any>();

    static register(type: any, value: any) {
        this.injectables.set(type, value);
    }

    static inject<T>(type: { new (...args: any[]): T } | string) {
        if (this.injectables.has(type)) {
            return this.injectables.get(type) as T;
        } else {
            throw new Error("Not something can inject");
        }
    }
}
