import { GenericObject } from './generic-object';

export type RecursiveKeyOfWithType<TObj extends object, T> = {
    [K in RecursiveKeyOf<TObj>]: TypeOfRecursiveKey<TObj, K> extends T ? K : never;
}[RecursiveKeyOf<TObj>];

export type TypeOfRecursiveKey<TObj extends object, Path extends RecursiveKeyOf<TObj> | string> = {
    [K in Path]: K extends keyof TObj
        ? TObj[K]
        : K extends `${infer P}.${infer S}`
          ? P extends keyof TObj
              ? TObj[P] extends GenericObject
                  ? TypeOfRecursiveKey<TObj[P], S>
                  : never
              : never
          : never;
}[Path];

export type RecursiveKeyOf<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `.${TKey}`>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
    ? Text
    : TValue extends object
      ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
      : Text;
