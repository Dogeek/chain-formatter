export * from './interfaces';
import { IFormattingOptions, IMethodOptions, StackItem, TInjectFunctions } from './interfaces';
import methodInjector from './injector';

function makeMethodName(method: IMethodOptions): string {
    const args = method.args ?? [];
    const argsString = args.map((a) => JSON.stringify(a)).join(', ');
    return `${method.name}(${argsString})`;
}

function reduceCallbackFactory(injectFunctions: TInjectFunctions): (value: any, method: IMethodOptions) => any {
    const stack: StackItem[] = [];
    return (value: any, method: IMethodOptions) => {
        const args = method.args ?? [];
        methodInjector(value, injectFunctions);
        const methodName = makeMethodName(method);
        try {
            const newValue = value[method.name](...args) as unknown;
            stack.push({ result: newValue, method: methodName });
            return newValue;
        } catch (e) {
            const stackString = `value.${stack.map(s => s.method).join('.')} === ${value}`
            throw new Error(`Unable to format ${value as string} with ${methodName}. Stack: ${stackString}`);
        }
    };
}

export default function format(options: IFormattingOptions) {
    return options.methods.reduce(reduceCallbackFactory(options.injectFunctions ?? {}));
}
