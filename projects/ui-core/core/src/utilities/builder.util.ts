export abstract class Builder<T extends Builder<any> = any>{
    set<K = Exclude<keyof T, keyof Builder>>(field: K, value: K[keyof K]): T {
        let parent = this as any;
        parent[field] = value;
        return parent as T;
    }

    get<K = Exclude<keyof T, keyof Builder>>(field: K): K[keyof K] {
        let parent = this as any;
        return parent[field];
    }

    static init<T>(type: { new(): T},params: Partial<T>): T {
        let instance = new type();
        Object.getOwnPropertyNames(params).forEach( f => {
            const descriptor = Object.getOwnPropertyDescriptor(params, f);
            if(descriptor?.writable == true && descriptor.value) {
                Object.defineProperty(instance, f, { value: descriptor?.value, writable: true });
            }
        });
        return instance;
    }
    
} 