// Types for getting the return type of an asynchronous function
type PromiseType<T> = T extends Promise<infer U> ? U : never;

export type ErrorType = { error: string };

/**
 * Represents the return type of an asynchronous function.
 * It extracts the resolved value from a Promise and excludes any potential error type.
 * Used primarily to get supabase action return types.
 */
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = Exclude<
  PromiseType<ReturnType<T>>,
  ErrorType
>;
