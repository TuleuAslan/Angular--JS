export class Utils {
    static getItem<TValue>(
        key: string,
        defaultValue: TValue = null,
        storage = localStorage
    ): TValue {
        const item = storage.getItem(key);
        if (item == null) {
            return defaultValue;
        }
        return JSON.parse(item) as TValue;
    }

    static saveItem(key: string, item: any, storage = localStorage): void {
        storage.setItem(key, JSON.stringify(item));
    }
}
