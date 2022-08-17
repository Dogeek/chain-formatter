import { TInjectFunctions } from './interfaces';

export default function methodInjector(item: any, methods: TInjectFunctions): void {
    const prototype = Object.getPrototypeOf(item);
    for (const [name, method] of Object.entries(methods)) {
        const methodToInject = method(item);
        prototype[name] = methodToInject;
    }
    return;
}