type TMethodArgumentBase = string | number | boolean;
type TMethodArgumentWithRecord = TMethodArgumentBase | Record<string, TMethodArgumentBase>;
export type TMethodArgument = TMethodArgumentWithRecord | Array<TMethodArgumentWithRecord>;

export type TInjectFunction = (value: unknown) => ((...args: TMethodArgument[]) => unknown );

export type TInjectFunctions = Record<string, TInjectFunction>;

export interface IMethodOptions {
    name: string;
    args?: TMethodArgument[];
}

export interface IFormattingOptions {
    item: unknown;
    methods: IMethodOptions[];
    injectFunctions?: TInjectFunctions;
}

export interface StackItem {
    result: unknown;
    method: string;
}
