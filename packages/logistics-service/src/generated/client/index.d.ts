
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model FactoryStats
 * 
 */
export type FactoryStats = $Result.DefaultSelection<Prisma.$FactoryStatsPayload>
/**
 * Model Child
 * 
 */
export type Child = $Result.DefaultSelection<Prisma.$ChildPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model Elf
 * 
 */
export type Elf = $Result.DefaultSelection<Prisma.$ElfPayload>
/**
 * Model WorkLog
 * 
 */
export type WorkLog = $Result.DefaultSelection<Prisma.$WorkLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more FactoryStats
 * const factoryStats = await prisma.factoryStats.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more FactoryStats
   * const factoryStats = await prisma.factoryStats.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.factoryStats`: Exposes CRUD operations for the **FactoryStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FactoryStats
    * const factoryStats = await prisma.factoryStats.findMany()
    * ```
    */
  get factoryStats(): Prisma.FactoryStatsDelegate<ExtArgs>;

  /**
   * `prisma.child`: Exposes CRUD operations for the **Child** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Children
    * const children = await prisma.child.findMany()
    * ```
    */
  get child(): Prisma.ChildDelegate<ExtArgs>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs>;

  /**
   * `prisma.elf`: Exposes CRUD operations for the **Elf** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Elves
    * const elves = await prisma.elf.findMany()
    * ```
    */
  get elf(): Prisma.ElfDelegate<ExtArgs>;

  /**
   * `prisma.workLog`: Exposes CRUD operations for the **WorkLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkLogs
    * const workLogs = await prisma.workLog.findMany()
    * ```
    */
  get workLog(): Prisma.WorkLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.10.0
   * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    FactoryStats: 'FactoryStats',
    Child: 'Child',
    Report: 'Report',
    Elf: 'Elf',
    WorkLog: 'WorkLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'factoryStats' | 'child' | 'report' | 'elf' | 'workLog'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      FactoryStats: {
        payload: Prisma.$FactoryStatsPayload<ExtArgs>
        fields: Prisma.FactoryStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FactoryStatsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FactoryStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FactoryStatsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FactoryStatsPayload>
          }
          findFirst: {
            args: Prisma.FactoryStatsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FactoryStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FactoryStatsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FactoryStatsPayload>
          }
          findMany: {
            args: Prisma.FactoryStatsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FactoryStatsPayload>[]
          }
          create: {
            args: Prisma.FactoryStatsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FactoryStatsPayload>
          }
          createMany: {
            args: Prisma.FactoryStatsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.FactoryStatsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FactoryStatsPayload>
          }
          update: {
            args: Prisma.FactoryStatsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FactoryStatsPayload>
          }
          deleteMany: {
            args: Prisma.FactoryStatsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.FactoryStatsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.FactoryStatsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FactoryStatsPayload>
          }
          aggregate: {
            args: Prisma.FactoryStatsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateFactoryStats>
          }
          groupBy: {
            args: Prisma.FactoryStatsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<FactoryStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.FactoryStatsCountArgs<ExtArgs>,
            result: $Utils.Optional<FactoryStatsCountAggregateOutputType> | number
          }
        }
      }
      Child: {
        payload: Prisma.$ChildPayload<ExtArgs>
        fields: Prisma.ChildFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChildFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChildPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChildFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          findFirst: {
            args: Prisma.ChildFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChildPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChildFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          findMany: {
            args: Prisma.ChildFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>[]
          }
          create: {
            args: Prisma.ChildCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          createMany: {
            args: Prisma.ChildCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ChildDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          update: {
            args: Prisma.ChildUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          deleteMany: {
            args: Prisma.ChildDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ChildUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ChildUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChildPayload>
          }
          aggregate: {
            args: Prisma.ChildAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateChild>
          }
          groupBy: {
            args: Prisma.ChildGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ChildGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChildCountArgs<ExtArgs>,
            result: $Utils.Optional<ChildCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>,
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      Elf: {
        payload: Prisma.$ElfPayload<ExtArgs>
        fields: Prisma.ElfFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElfFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ElfPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElfFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ElfPayload>
          }
          findFirst: {
            args: Prisma.ElfFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ElfPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElfFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ElfPayload>
          }
          findMany: {
            args: Prisma.ElfFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ElfPayload>[]
          }
          create: {
            args: Prisma.ElfCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ElfPayload>
          }
          createMany: {
            args: Prisma.ElfCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ElfDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ElfPayload>
          }
          update: {
            args: Prisma.ElfUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ElfPayload>
          }
          deleteMany: {
            args: Prisma.ElfDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ElfUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ElfUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ElfPayload>
          }
          aggregate: {
            args: Prisma.ElfAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateElf>
          }
          groupBy: {
            args: Prisma.ElfGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ElfGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElfCountArgs<ExtArgs>,
            result: $Utils.Optional<ElfCountAggregateOutputType> | number
          }
        }
      }
      WorkLog: {
        payload: Prisma.$WorkLogPayload<ExtArgs>
        fields: Prisma.WorkLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkLogFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkLogFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          findFirst: {
            args: Prisma.WorkLogFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkLogFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          findMany: {
            args: Prisma.WorkLogFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>[]
          }
          create: {
            args: Prisma.WorkLogCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          createMany: {
            args: Prisma.WorkLogCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.WorkLogDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          update: {
            args: Prisma.WorkLogUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          deleteMany: {
            args: Prisma.WorkLogDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.WorkLogUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.WorkLogUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WorkLogPayload>
          }
          aggregate: {
            args: Prisma.WorkLogAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateWorkLog>
          }
          groupBy: {
            args: Prisma.WorkLogGroupByArgs<ExtArgs>,
            result: $Utils.Optional<WorkLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkLogCountArgs<ExtArgs>,
            result: $Utils.Optional<WorkLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ChildCountOutputType
   */

  export type ChildCountOutputType = {
    reports: number
  }

  export type ChildCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | ChildCountOutputTypeCountReportsArgs
  }

  // Custom InputTypes

  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChildCountOutputType
     */
    select?: ChildCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ChildCountOutputType without action
   */
  export type ChildCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }



  /**
   * Count Type ElfCountOutputType
   */

  export type ElfCountOutputType = {
    reports: number
    workLogs: number
  }

  export type ElfCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | ElfCountOutputTypeCountReportsArgs
    workLogs?: boolean | ElfCountOutputTypeCountWorkLogsArgs
  }

  // Custom InputTypes

  /**
   * ElfCountOutputType without action
   */
  export type ElfCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElfCountOutputType
     */
    select?: ElfCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ElfCountOutputType without action
   */
  export type ElfCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }


  /**
   * ElfCountOutputType without action
   */
  export type ElfCountOutputTypeCountWorkLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkLogWhereInput
  }



  /**
   * Models
   */

  /**
   * Model FactoryStats
   */

  export type AggregateFactoryStats = {
    _count: FactoryStatsCountAggregateOutputType | null
    _avg: FactoryStatsAvgAggregateOutputType | null
    _sum: FactoryStatsSumAggregateOutputType | null
    _min: FactoryStatsMinAggregateOutputType | null
    _max: FactoryStatsMaxAggregateOutputType | null
  }

  export type FactoryStatsAvgAggregateOutputType = {
    toysProduced: number | null
    coalStockpiled: number | null
  }

  export type FactoryStatsSumAggregateOutputType = {
    toysProduced: number | null
    coalStockpiled: number | null
  }

  export type FactoryStatsMinAggregateOutputType = {
    id: string | null
    toysProduced: number | null
    coalStockpiled: number | null
    updatedAt: Date | null
  }

  export type FactoryStatsMaxAggregateOutputType = {
    id: string | null
    toysProduced: number | null
    coalStockpiled: number | null
    updatedAt: Date | null
  }

  export type FactoryStatsCountAggregateOutputType = {
    id: number
    toysProduced: number
    coalStockpiled: number
    updatedAt: number
    _all: number
  }


  export type FactoryStatsAvgAggregateInputType = {
    toysProduced?: true
    coalStockpiled?: true
  }

  export type FactoryStatsSumAggregateInputType = {
    toysProduced?: true
    coalStockpiled?: true
  }

  export type FactoryStatsMinAggregateInputType = {
    id?: true
    toysProduced?: true
    coalStockpiled?: true
    updatedAt?: true
  }

  export type FactoryStatsMaxAggregateInputType = {
    id?: true
    toysProduced?: true
    coalStockpiled?: true
    updatedAt?: true
  }

  export type FactoryStatsCountAggregateInputType = {
    id?: true
    toysProduced?: true
    coalStockpiled?: true
    updatedAt?: true
    _all?: true
  }

  export type FactoryStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FactoryStats to aggregate.
     */
    where?: FactoryStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FactoryStats to fetch.
     */
    orderBy?: FactoryStatsOrderByWithRelationInput | FactoryStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FactoryStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FactoryStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FactoryStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FactoryStats
    **/
    _count?: true | FactoryStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FactoryStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FactoryStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FactoryStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FactoryStatsMaxAggregateInputType
  }

  export type GetFactoryStatsAggregateType<T extends FactoryStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateFactoryStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFactoryStats[P]>
      : GetScalarType<T[P], AggregateFactoryStats[P]>
  }




  export type FactoryStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FactoryStatsWhereInput
    orderBy?: FactoryStatsOrderByWithAggregationInput | FactoryStatsOrderByWithAggregationInput[]
    by: FactoryStatsScalarFieldEnum[] | FactoryStatsScalarFieldEnum
    having?: FactoryStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FactoryStatsCountAggregateInputType | true
    _avg?: FactoryStatsAvgAggregateInputType
    _sum?: FactoryStatsSumAggregateInputType
    _min?: FactoryStatsMinAggregateInputType
    _max?: FactoryStatsMaxAggregateInputType
  }

  export type FactoryStatsGroupByOutputType = {
    id: string
    toysProduced: number
    coalStockpiled: number
    updatedAt: Date
    _count: FactoryStatsCountAggregateOutputType | null
    _avg: FactoryStatsAvgAggregateOutputType | null
    _sum: FactoryStatsSumAggregateOutputType | null
    _min: FactoryStatsMinAggregateOutputType | null
    _max: FactoryStatsMaxAggregateOutputType | null
  }

  type GetFactoryStatsGroupByPayload<T extends FactoryStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FactoryStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FactoryStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FactoryStatsGroupByOutputType[P]>
            : GetScalarType<T[P], FactoryStatsGroupByOutputType[P]>
        }
      >
    >


  export type FactoryStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    toysProduced?: boolean
    coalStockpiled?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["factoryStats"]>

  export type FactoryStatsSelectScalar = {
    id?: boolean
    toysProduced?: boolean
    coalStockpiled?: boolean
    updatedAt?: boolean
  }


  export type $FactoryStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FactoryStats"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      toysProduced: number
      coalStockpiled: number
      updatedAt: Date
    }, ExtArgs["result"]["factoryStats"]>
    composites: {}
  }


  type FactoryStatsGetPayload<S extends boolean | null | undefined | FactoryStatsDefaultArgs> = $Result.GetResult<Prisma.$FactoryStatsPayload, S>

  type FactoryStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FactoryStatsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FactoryStatsCountAggregateInputType | true
    }

  export interface FactoryStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FactoryStats'], meta: { name: 'FactoryStats' } }
    /**
     * Find zero or one FactoryStats that matches the filter.
     * @param {FactoryStatsFindUniqueArgs} args - Arguments to find a FactoryStats
     * @example
     * // Get one FactoryStats
     * const factoryStats = await prisma.factoryStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FactoryStatsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, FactoryStatsFindUniqueArgs<ExtArgs>>
    ): Prisma__FactoryStatsClient<$Result.GetResult<Prisma.$FactoryStatsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one FactoryStats that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {FactoryStatsFindUniqueOrThrowArgs} args - Arguments to find a FactoryStats
     * @example
     * // Get one FactoryStats
     * const factoryStats = await prisma.factoryStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FactoryStatsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FactoryStatsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__FactoryStatsClient<$Result.GetResult<Prisma.$FactoryStatsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first FactoryStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryStatsFindFirstArgs} args - Arguments to find a FactoryStats
     * @example
     * // Get one FactoryStats
     * const factoryStats = await prisma.factoryStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FactoryStatsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, FactoryStatsFindFirstArgs<ExtArgs>>
    ): Prisma__FactoryStatsClient<$Result.GetResult<Prisma.$FactoryStatsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first FactoryStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryStatsFindFirstOrThrowArgs} args - Arguments to find a FactoryStats
     * @example
     * // Get one FactoryStats
     * const factoryStats = await prisma.factoryStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FactoryStatsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FactoryStatsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__FactoryStatsClient<$Result.GetResult<Prisma.$FactoryStatsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more FactoryStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryStatsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FactoryStats
     * const factoryStats = await prisma.factoryStats.findMany()
     * 
     * // Get first 10 FactoryStats
     * const factoryStats = await prisma.factoryStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const factoryStatsWithIdOnly = await prisma.factoryStats.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FactoryStatsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FactoryStatsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FactoryStatsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a FactoryStats.
     * @param {FactoryStatsCreateArgs} args - Arguments to create a FactoryStats.
     * @example
     * // Create one FactoryStats
     * const FactoryStats = await prisma.factoryStats.create({
     *   data: {
     *     // ... data to create a FactoryStats
     *   }
     * })
     * 
    **/
    create<T extends FactoryStatsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, FactoryStatsCreateArgs<ExtArgs>>
    ): Prisma__FactoryStatsClient<$Result.GetResult<Prisma.$FactoryStatsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many FactoryStats.
     *     @param {FactoryStatsCreateManyArgs} args - Arguments to create many FactoryStats.
     *     @example
     *     // Create many FactoryStats
     *     const factoryStats = await prisma.factoryStats.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FactoryStatsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FactoryStatsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FactoryStats.
     * @param {FactoryStatsDeleteArgs} args - Arguments to delete one FactoryStats.
     * @example
     * // Delete one FactoryStats
     * const FactoryStats = await prisma.factoryStats.delete({
     *   where: {
     *     // ... filter to delete one FactoryStats
     *   }
     * })
     * 
    **/
    delete<T extends FactoryStatsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, FactoryStatsDeleteArgs<ExtArgs>>
    ): Prisma__FactoryStatsClient<$Result.GetResult<Prisma.$FactoryStatsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one FactoryStats.
     * @param {FactoryStatsUpdateArgs} args - Arguments to update one FactoryStats.
     * @example
     * // Update one FactoryStats
     * const factoryStats = await prisma.factoryStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FactoryStatsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, FactoryStatsUpdateArgs<ExtArgs>>
    ): Prisma__FactoryStatsClient<$Result.GetResult<Prisma.$FactoryStatsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more FactoryStats.
     * @param {FactoryStatsDeleteManyArgs} args - Arguments to filter FactoryStats to delete.
     * @example
     * // Delete a few FactoryStats
     * const { count } = await prisma.factoryStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FactoryStatsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FactoryStatsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FactoryStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FactoryStats
     * const factoryStats = await prisma.factoryStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FactoryStatsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, FactoryStatsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FactoryStats.
     * @param {FactoryStatsUpsertArgs} args - Arguments to update or create a FactoryStats.
     * @example
     * // Update or create a FactoryStats
     * const factoryStats = await prisma.factoryStats.upsert({
     *   create: {
     *     // ... data to create a FactoryStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FactoryStats we want to update
     *   }
     * })
    **/
    upsert<T extends FactoryStatsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, FactoryStatsUpsertArgs<ExtArgs>>
    ): Prisma__FactoryStatsClient<$Result.GetResult<Prisma.$FactoryStatsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of FactoryStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryStatsCountArgs} args - Arguments to filter FactoryStats to count.
     * @example
     * // Count the number of FactoryStats
     * const count = await prisma.factoryStats.count({
     *   where: {
     *     // ... the filter for the FactoryStats we want to count
     *   }
     * })
    **/
    count<T extends FactoryStatsCountArgs>(
      args?: Subset<T, FactoryStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FactoryStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FactoryStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FactoryStatsAggregateArgs>(args: Subset<T, FactoryStatsAggregateArgs>): Prisma.PrismaPromise<GetFactoryStatsAggregateType<T>>

    /**
     * Group by FactoryStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FactoryStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FactoryStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FactoryStatsGroupByArgs['orderBy'] }
        : { orderBy?: FactoryStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FactoryStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFactoryStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FactoryStats model
   */
  readonly fields: FactoryStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FactoryStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FactoryStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the FactoryStats model
   */ 
  interface FactoryStatsFieldRefs {
    readonly id: FieldRef<"FactoryStats", 'String'>
    readonly toysProduced: FieldRef<"FactoryStats", 'Int'>
    readonly coalStockpiled: FieldRef<"FactoryStats", 'Int'>
    readonly updatedAt: FieldRef<"FactoryStats", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * FactoryStats findUnique
   */
  export type FactoryStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryStats
     */
    select?: FactoryStatsSelect<ExtArgs> | null
    /**
     * Filter, which FactoryStats to fetch.
     */
    where: FactoryStatsWhereUniqueInput
  }


  /**
   * FactoryStats findUniqueOrThrow
   */
  export type FactoryStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryStats
     */
    select?: FactoryStatsSelect<ExtArgs> | null
    /**
     * Filter, which FactoryStats to fetch.
     */
    where: FactoryStatsWhereUniqueInput
  }


  /**
   * FactoryStats findFirst
   */
  export type FactoryStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryStats
     */
    select?: FactoryStatsSelect<ExtArgs> | null
    /**
     * Filter, which FactoryStats to fetch.
     */
    where?: FactoryStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FactoryStats to fetch.
     */
    orderBy?: FactoryStatsOrderByWithRelationInput | FactoryStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FactoryStats.
     */
    cursor?: FactoryStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FactoryStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FactoryStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FactoryStats.
     */
    distinct?: FactoryStatsScalarFieldEnum | FactoryStatsScalarFieldEnum[]
  }


  /**
   * FactoryStats findFirstOrThrow
   */
  export type FactoryStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryStats
     */
    select?: FactoryStatsSelect<ExtArgs> | null
    /**
     * Filter, which FactoryStats to fetch.
     */
    where?: FactoryStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FactoryStats to fetch.
     */
    orderBy?: FactoryStatsOrderByWithRelationInput | FactoryStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FactoryStats.
     */
    cursor?: FactoryStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FactoryStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FactoryStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FactoryStats.
     */
    distinct?: FactoryStatsScalarFieldEnum | FactoryStatsScalarFieldEnum[]
  }


  /**
   * FactoryStats findMany
   */
  export type FactoryStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryStats
     */
    select?: FactoryStatsSelect<ExtArgs> | null
    /**
     * Filter, which FactoryStats to fetch.
     */
    where?: FactoryStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FactoryStats to fetch.
     */
    orderBy?: FactoryStatsOrderByWithRelationInput | FactoryStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FactoryStats.
     */
    cursor?: FactoryStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FactoryStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FactoryStats.
     */
    skip?: number
    distinct?: FactoryStatsScalarFieldEnum | FactoryStatsScalarFieldEnum[]
  }


  /**
   * FactoryStats create
   */
  export type FactoryStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryStats
     */
    select?: FactoryStatsSelect<ExtArgs> | null
    /**
     * The data needed to create a FactoryStats.
     */
    data: XOR<FactoryStatsCreateInput, FactoryStatsUncheckedCreateInput>
  }


  /**
   * FactoryStats createMany
   */
  export type FactoryStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FactoryStats.
     */
    data: FactoryStatsCreateManyInput | FactoryStatsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * FactoryStats update
   */
  export type FactoryStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryStats
     */
    select?: FactoryStatsSelect<ExtArgs> | null
    /**
     * The data needed to update a FactoryStats.
     */
    data: XOR<FactoryStatsUpdateInput, FactoryStatsUncheckedUpdateInput>
    /**
     * Choose, which FactoryStats to update.
     */
    where: FactoryStatsWhereUniqueInput
  }


  /**
   * FactoryStats updateMany
   */
  export type FactoryStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FactoryStats.
     */
    data: XOR<FactoryStatsUpdateManyMutationInput, FactoryStatsUncheckedUpdateManyInput>
    /**
     * Filter which FactoryStats to update
     */
    where?: FactoryStatsWhereInput
  }


  /**
   * FactoryStats upsert
   */
  export type FactoryStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryStats
     */
    select?: FactoryStatsSelect<ExtArgs> | null
    /**
     * The filter to search for the FactoryStats to update in case it exists.
     */
    where: FactoryStatsWhereUniqueInput
    /**
     * In case the FactoryStats found by the `where` argument doesn't exist, create a new FactoryStats with this data.
     */
    create: XOR<FactoryStatsCreateInput, FactoryStatsUncheckedCreateInput>
    /**
     * In case the FactoryStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FactoryStatsUpdateInput, FactoryStatsUncheckedUpdateInput>
  }


  /**
   * FactoryStats delete
   */
  export type FactoryStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryStats
     */
    select?: FactoryStatsSelect<ExtArgs> | null
    /**
     * Filter which FactoryStats to delete.
     */
    where: FactoryStatsWhereUniqueInput
  }


  /**
   * FactoryStats deleteMany
   */
  export type FactoryStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FactoryStats to delete
     */
    where?: FactoryStatsWhereInput
  }


  /**
   * FactoryStats without action
   */
  export type FactoryStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FactoryStats
     */
    select?: FactoryStatsSelect<ExtArgs> | null
  }



  /**
   * Model Child
   */

  export type AggregateChild = {
    _count: ChildCountAggregateOutputType | null
    _avg: ChildAvgAggregateOutputType | null
    _sum: ChildSumAggregateOutputType | null
    _min: ChildMinAggregateOutputType | null
    _max: ChildMaxAggregateOutputType | null
  }

  export type ChildAvgAggregateOutputType = {
    age: number | null
    lat: number | null
    lng: number | null
    behaviorScore: number | null
  }

  export type ChildSumAggregateOutputType = {
    age: number | null
    lat: number | null
    lng: number | null
    behaviorScore: number | null
  }

  export type ChildMinAggregateOutputType = {
    id: string | null
    name: string | null
    age: number | null
    status: string | null
    location: string | null
    city: string | null
    country: string | null
    lat: number | null
    lng: number | null
    wishlist: string | null
    behaviorScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChildMaxAggregateOutputType = {
    id: string | null
    name: string | null
    age: number | null
    status: string | null
    location: string | null
    city: string | null
    country: string | null
    lat: number | null
    lng: number | null
    wishlist: string | null
    behaviorScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChildCountAggregateOutputType = {
    id: number
    name: number
    age: number
    status: number
    location: number
    city: number
    country: number
    lat: number
    lng: number
    wishlist: number
    behaviorScore: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChildAvgAggregateInputType = {
    age?: true
    lat?: true
    lng?: true
    behaviorScore?: true
  }

  export type ChildSumAggregateInputType = {
    age?: true
    lat?: true
    lng?: true
    behaviorScore?: true
  }

  export type ChildMinAggregateInputType = {
    id?: true
    name?: true
    age?: true
    status?: true
    location?: true
    city?: true
    country?: true
    lat?: true
    lng?: true
    wishlist?: true
    behaviorScore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChildMaxAggregateInputType = {
    id?: true
    name?: true
    age?: true
    status?: true
    location?: true
    city?: true
    country?: true
    lat?: true
    lng?: true
    wishlist?: true
    behaviorScore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChildCountAggregateInputType = {
    id?: true
    name?: true
    age?: true
    status?: true
    location?: true
    city?: true
    country?: true
    lat?: true
    lng?: true
    wishlist?: true
    behaviorScore?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChildAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Child to aggregate.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Children
    **/
    _count?: true | ChildCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChildAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChildSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChildMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChildMaxAggregateInputType
  }

  export type GetChildAggregateType<T extends ChildAggregateArgs> = {
        [P in keyof T & keyof AggregateChild]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChild[P]>
      : GetScalarType<T[P], AggregateChild[P]>
  }




  export type ChildGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChildWhereInput
    orderBy?: ChildOrderByWithAggregationInput | ChildOrderByWithAggregationInput[]
    by: ChildScalarFieldEnum[] | ChildScalarFieldEnum
    having?: ChildScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChildCountAggregateInputType | true
    _avg?: ChildAvgAggregateInputType
    _sum?: ChildSumAggregateInputType
    _min?: ChildMinAggregateInputType
    _max?: ChildMaxAggregateInputType
  }

  export type ChildGroupByOutputType = {
    id: string
    name: string
    age: number
    status: string
    location: string
    city: string
    country: string
    lat: number
    lng: number
    wishlist: string | null
    behaviorScore: number
    createdAt: Date
    updatedAt: Date
    _count: ChildCountAggregateOutputType | null
    _avg: ChildAvgAggregateOutputType | null
    _sum: ChildSumAggregateOutputType | null
    _min: ChildMinAggregateOutputType | null
    _max: ChildMaxAggregateOutputType | null
  }

  type GetChildGroupByPayload<T extends ChildGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChildGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChildGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChildGroupByOutputType[P]>
            : GetScalarType<T[P], ChildGroupByOutputType[P]>
        }
      >
    >


  export type ChildSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    age?: boolean
    status?: boolean
    location?: boolean
    city?: boolean
    country?: boolean
    lat?: boolean
    lng?: boolean
    wishlist?: boolean
    behaviorScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reports?: boolean | Child$reportsArgs<ExtArgs>
    _count?: boolean | ChildCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["child"]>

  export type ChildSelectScalar = {
    id?: boolean
    name?: boolean
    age?: boolean
    status?: boolean
    location?: boolean
    city?: boolean
    country?: boolean
    lat?: boolean
    lng?: boolean
    wishlist?: boolean
    behaviorScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChildInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | Child$reportsArgs<ExtArgs>
    _count?: boolean | ChildCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ChildPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Child"
    objects: {
      reports: Prisma.$ReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      age: number
      status: string
      location: string
      city: string
      country: string
      lat: number
      lng: number
      wishlist: string | null
      behaviorScore: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["child"]>
    composites: {}
  }


  type ChildGetPayload<S extends boolean | null | undefined | ChildDefaultArgs> = $Result.GetResult<Prisma.$ChildPayload, S>

  type ChildCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ChildFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ChildCountAggregateInputType | true
    }

  export interface ChildDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Child'], meta: { name: 'Child' } }
    /**
     * Find zero or one Child that matches the filter.
     * @param {ChildFindUniqueArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChildFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChildFindUniqueArgs<ExtArgs>>
    ): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Child that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ChildFindUniqueOrThrowArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ChildFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChildFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Child that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindFirstArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChildFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChildFindFirstArgs<ExtArgs>>
    ): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Child that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindFirstOrThrowArgs} args - Arguments to find a Child
     * @example
     * // Get one Child
     * const child = await prisma.child.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ChildFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChildFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Children that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Children
     * const children = await prisma.child.findMany()
     * 
     * // Get first 10 Children
     * const children = await prisma.child.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const childWithIdOnly = await prisma.child.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ChildFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChildFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Child.
     * @param {ChildCreateArgs} args - Arguments to create a Child.
     * @example
     * // Create one Child
     * const Child = await prisma.child.create({
     *   data: {
     *     // ... data to create a Child
     *   }
     * })
     * 
    **/
    create<T extends ChildCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChildCreateArgs<ExtArgs>>
    ): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Children.
     *     @param {ChildCreateManyArgs} args - Arguments to create many Children.
     *     @example
     *     // Create many Children
     *     const child = await prisma.child.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChildCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChildCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Child.
     * @param {ChildDeleteArgs} args - Arguments to delete one Child.
     * @example
     * // Delete one Child
     * const Child = await prisma.child.delete({
     *   where: {
     *     // ... filter to delete one Child
     *   }
     * })
     * 
    **/
    delete<T extends ChildDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChildDeleteArgs<ExtArgs>>
    ): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Child.
     * @param {ChildUpdateArgs} args - Arguments to update one Child.
     * @example
     * // Update one Child
     * const child = await prisma.child.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChildUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChildUpdateArgs<ExtArgs>>
    ): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Children.
     * @param {ChildDeleteManyArgs} args - Arguments to filter Children to delete.
     * @example
     * // Delete a few Children
     * const { count } = await prisma.child.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChildDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChildDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Children
     * const child = await prisma.child.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChildUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChildUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Child.
     * @param {ChildUpsertArgs} args - Arguments to update or create a Child.
     * @example
     * // Update or create a Child
     * const child = await prisma.child.upsert({
     *   create: {
     *     // ... data to create a Child
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Child we want to update
     *   }
     * })
    **/
    upsert<T extends ChildUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChildUpsertArgs<ExtArgs>>
    ): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Children.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildCountArgs} args - Arguments to filter Children to count.
     * @example
     * // Count the number of Children
     * const count = await prisma.child.count({
     *   where: {
     *     // ... the filter for the Children we want to count
     *   }
     * })
    **/
    count<T extends ChildCountArgs>(
      args?: Subset<T, ChildCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChildCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Child.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChildAggregateArgs>(args: Subset<T, ChildAggregateArgs>): Prisma.PrismaPromise<GetChildAggregateType<T>>

    /**
     * Group by Child.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChildGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChildGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChildGroupByArgs['orderBy'] }
        : { orderBy?: ChildGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChildGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChildGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Child model
   */
  readonly fields: ChildFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Child.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChildClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    reports<T extends Child$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Child$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Child model
   */ 
  interface ChildFieldRefs {
    readonly id: FieldRef<"Child", 'String'>
    readonly name: FieldRef<"Child", 'String'>
    readonly age: FieldRef<"Child", 'Int'>
    readonly status: FieldRef<"Child", 'String'>
    readonly location: FieldRef<"Child", 'String'>
    readonly city: FieldRef<"Child", 'String'>
    readonly country: FieldRef<"Child", 'String'>
    readonly lat: FieldRef<"Child", 'Float'>
    readonly lng: FieldRef<"Child", 'Float'>
    readonly wishlist: FieldRef<"Child", 'String'>
    readonly behaviorScore: FieldRef<"Child", 'Int'>
    readonly createdAt: FieldRef<"Child", 'DateTime'>
    readonly updatedAt: FieldRef<"Child", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Child findUnique
   */
  export type ChildFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where: ChildWhereUniqueInput
  }


  /**
   * Child findUniqueOrThrow
   */
  export type ChildFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where: ChildWhereUniqueInput
  }


  /**
   * Child findFirst
   */
  export type ChildFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Children.
     */
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }


  /**
   * Child findFirstOrThrow
   */
  export type ChildFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Child to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Children.
     */
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }


  /**
   * Child findMany
   */
  export type ChildFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter, which Children to fetch.
     */
    where?: ChildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Children to fetch.
     */
    orderBy?: ChildOrderByWithRelationInput | ChildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Children.
     */
    cursor?: ChildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Children from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Children.
     */
    skip?: number
    distinct?: ChildScalarFieldEnum | ChildScalarFieldEnum[]
  }


  /**
   * Child create
   */
  export type ChildCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The data needed to create a Child.
     */
    data: XOR<ChildCreateInput, ChildUncheckedCreateInput>
  }


  /**
   * Child createMany
   */
  export type ChildCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Children.
     */
    data: ChildCreateManyInput | ChildCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Child update
   */
  export type ChildUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The data needed to update a Child.
     */
    data: XOR<ChildUpdateInput, ChildUncheckedUpdateInput>
    /**
     * Choose, which Child to update.
     */
    where: ChildWhereUniqueInput
  }


  /**
   * Child updateMany
   */
  export type ChildUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Children.
     */
    data: XOR<ChildUpdateManyMutationInput, ChildUncheckedUpdateManyInput>
    /**
     * Filter which Children to update
     */
    where?: ChildWhereInput
  }


  /**
   * Child upsert
   */
  export type ChildUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * The filter to search for the Child to update in case it exists.
     */
    where: ChildWhereUniqueInput
    /**
     * In case the Child found by the `where` argument doesn't exist, create a new Child with this data.
     */
    create: XOR<ChildCreateInput, ChildUncheckedCreateInput>
    /**
     * In case the Child was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChildUpdateInput, ChildUncheckedUpdateInput>
  }


  /**
   * Child delete
   */
  export type ChildDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChildInclude<ExtArgs> | null
    /**
     * Filter which Child to delete.
     */
    where: ChildWhereUniqueInput
  }


  /**
   * Child deleteMany
   */
  export type ChildDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Children to delete
     */
    where?: ChildWhereInput
  }


  /**
   * Child.reports
   */
  export type Child$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }


  /**
   * Child without action
   */
  export type ChildDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Child
     */
    select?: ChildSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChildInclude<ExtArgs> | null
  }



  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type ReportSumAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    type: string | null
    description: string | null
    mediaUrl: string | null
    timestamp: Date | null
    childId: string | null
    lat: number | null
    lng: number | null
    locationName: string | null
    reporterId: string | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    type: string | null
    description: string | null
    mediaUrl: string | null
    timestamp: Date | null
    childId: string | null
    lat: number | null
    lng: number | null
    locationName: string | null
    reporterId: string | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    type: number
    description: number
    mediaUrl: number
    timestamp: number
    childId: number
    lat: number
    lng: number
    locationName: number
    reporterId: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type ReportSumAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    type?: true
    description?: true
    mediaUrl?: true
    timestamp?: true
    childId?: true
    lat?: true
    lng?: true
    locationName?: true
    reporterId?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    type?: true
    description?: true
    mediaUrl?: true
    timestamp?: true
    childId?: true
    lat?: true
    lng?: true
    locationName?: true
    reporterId?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    type?: true
    description?: true
    mediaUrl?: true
    timestamp?: true
    childId?: true
    lat?: true
    lng?: true
    locationName?: true
    reporterId?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    type: string
    description: string
    mediaUrl: string | null
    timestamp: Date
    childId: string
    lat: number | null
    lng: number | null
    locationName: string | null
    reporterId: string | null
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    description?: boolean
    mediaUrl?: boolean
    timestamp?: boolean
    childId?: boolean
    lat?: boolean
    lng?: boolean
    locationName?: boolean
    reporterId?: boolean
    child?: boolean | ChildDefaultArgs<ExtArgs>
    reporter?: boolean | Report$reporterArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    type?: boolean
    description?: boolean
    mediaUrl?: boolean
    timestamp?: boolean
    childId?: boolean
    lat?: boolean
    lng?: boolean
    locationName?: boolean
    reporterId?: boolean
  }

  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | ChildDefaultArgs<ExtArgs>
    reporter?: boolean | Report$reporterArgs<ExtArgs>
  }


  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      child: Prisma.$ChildPayload<ExtArgs>
      reporter: Prisma.$ElfPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      description: string
      mediaUrl: string | null
      timestamp: Date
      childId: string
      lat: number | null
      lng: number | null
      locationName: string | null
      reporterId: string | null
    }, ExtArgs["result"]["report"]>
    composites: {}
  }


  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReportFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>
    ): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Report that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReportFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>
    ): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReportFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
    **/
    create<T extends ReportCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ReportCreateArgs<ExtArgs>>
    ): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Reports.
     *     @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     *     @example
     *     // Create many Reports
     *     const report = await prisma.report.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReportCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
    **/
    delete<T extends ReportDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>
    ): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReportUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>
    ): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReportDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReportUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
    **/
    upsert<T extends ReportUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>
    ): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    child<T extends ChildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChildDefaultArgs<ExtArgs>>): Prisma__ChildClient<$Result.GetResult<Prisma.$ChildPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    reporter<T extends Report$reporterArgs<ExtArgs> = {}>(args?: Subset<T, Report$reporterArgs<ExtArgs>>): Prisma__ElfClient<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Report model
   */ 
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly type: FieldRef<"Report", 'String'>
    readonly description: FieldRef<"Report", 'String'>
    readonly mediaUrl: FieldRef<"Report", 'String'>
    readonly timestamp: FieldRef<"Report", 'DateTime'>
    readonly childId: FieldRef<"Report", 'String'>
    readonly lat: FieldRef<"Report", 'Float'>
    readonly lng: FieldRef<"Report", 'Float'>
    readonly locationName: FieldRef<"Report", 'String'>
    readonly reporterId: FieldRef<"Report", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }


  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }


  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }


  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }


  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
  }


  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }


  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
  }


  /**
   * Report.reporter
   */
  export type Report$reporterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
    where?: ElfWhereInput
  }


  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
  }



  /**
   * Model Elf
   */

  export type AggregateElf = {
    _count: ElfCountAggregateOutputType | null
    _avg: ElfAvgAggregateOutputType | null
    _sum: ElfSumAggregateOutputType | null
    _min: ElfMinAggregateOutputType | null
    _max: ElfMaxAggregateOutputType | null
  }

  export type ElfAvgAggregateOutputType = {
    points: number | null
    level: number | null
  }

  export type ElfSumAggregateOutputType = {
    points: number | null
    level: number | null
  }

  export type ElfMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    name: string | null
    password: string | null
    status: string | null
    points: number | null
    level: number | null
    title: string | null
    lastActive: Date | null
    createdAt: Date | null
    avatarUrl: string | null
    department: string | null
  }

  export type ElfMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    name: string | null
    password: string | null
    status: string | null
    points: number | null
    level: number | null
    title: string | null
    lastActive: Date | null
    createdAt: Date | null
    avatarUrl: string | null
    department: string | null
  }

  export type ElfCountAggregateOutputType = {
    id: number
    agentId: number
    name: number
    password: number
    status: number
    points: number
    level: number
    title: number
    lastActive: number
    createdAt: number
    avatarUrl: number
    badges: number
    department: number
    _all: number
  }


  export type ElfAvgAggregateInputType = {
    points?: true
    level?: true
  }

  export type ElfSumAggregateInputType = {
    points?: true
    level?: true
  }

  export type ElfMinAggregateInputType = {
    id?: true
    agentId?: true
    name?: true
    password?: true
    status?: true
    points?: true
    level?: true
    title?: true
    lastActive?: true
    createdAt?: true
    avatarUrl?: true
    department?: true
  }

  export type ElfMaxAggregateInputType = {
    id?: true
    agentId?: true
    name?: true
    password?: true
    status?: true
    points?: true
    level?: true
    title?: true
    lastActive?: true
    createdAt?: true
    avatarUrl?: true
    department?: true
  }

  export type ElfCountAggregateInputType = {
    id?: true
    agentId?: true
    name?: true
    password?: true
    status?: true
    points?: true
    level?: true
    title?: true
    lastActive?: true
    createdAt?: true
    avatarUrl?: true
    badges?: true
    department?: true
    _all?: true
  }

  export type ElfAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Elf to aggregate.
     */
    where?: ElfWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elves to fetch.
     */
    orderBy?: ElfOrderByWithRelationInput | ElfOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElfWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Elves
    **/
    _count?: true | ElfCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElfAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElfSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElfMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElfMaxAggregateInputType
  }

  export type GetElfAggregateType<T extends ElfAggregateArgs> = {
        [P in keyof T & keyof AggregateElf]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElf[P]>
      : GetScalarType<T[P], AggregateElf[P]>
  }




  export type ElfGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElfWhereInput
    orderBy?: ElfOrderByWithAggregationInput | ElfOrderByWithAggregationInput[]
    by: ElfScalarFieldEnum[] | ElfScalarFieldEnum
    having?: ElfScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElfCountAggregateInputType | true
    _avg?: ElfAvgAggregateInputType
    _sum?: ElfSumAggregateInputType
    _min?: ElfMinAggregateInputType
    _max?: ElfMaxAggregateInputType
  }

  export type ElfGroupByOutputType = {
    id: string
    agentId: string
    name: string
    password: string
    status: string
    points: number
    level: number
    title: string
    lastActive: Date
    createdAt: Date
    avatarUrl: string | null
    badges: string[]
    department: string
    _count: ElfCountAggregateOutputType | null
    _avg: ElfAvgAggregateOutputType | null
    _sum: ElfSumAggregateOutputType | null
    _min: ElfMinAggregateOutputType | null
    _max: ElfMaxAggregateOutputType | null
  }

  type GetElfGroupByPayload<T extends ElfGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElfGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElfGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElfGroupByOutputType[P]>
            : GetScalarType<T[P], ElfGroupByOutputType[P]>
        }
      >
    >


  export type ElfSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    name?: boolean
    password?: boolean
    status?: boolean
    points?: boolean
    level?: boolean
    title?: boolean
    lastActive?: boolean
    createdAt?: boolean
    avatarUrl?: boolean
    badges?: boolean
    department?: boolean
    reports?: boolean | Elf$reportsArgs<ExtArgs>
    workLogs?: boolean | Elf$workLogsArgs<ExtArgs>
    _count?: boolean | ElfCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["elf"]>

  export type ElfSelectScalar = {
    id?: boolean
    agentId?: boolean
    name?: boolean
    password?: boolean
    status?: boolean
    points?: boolean
    level?: boolean
    title?: boolean
    lastActive?: boolean
    createdAt?: boolean
    avatarUrl?: boolean
    badges?: boolean
    department?: boolean
  }

  export type ElfInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reports?: boolean | Elf$reportsArgs<ExtArgs>
    workLogs?: boolean | Elf$workLogsArgs<ExtArgs>
    _count?: boolean | ElfCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ElfPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Elf"
    objects: {
      reports: Prisma.$ReportPayload<ExtArgs>[]
      workLogs: Prisma.$WorkLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      name: string
      password: string
      status: string
      points: number
      level: number
      title: string
      lastActive: Date
      createdAt: Date
      avatarUrl: string | null
      badges: string[]
      department: string
    }, ExtArgs["result"]["elf"]>
    composites: {}
  }


  type ElfGetPayload<S extends boolean | null | undefined | ElfDefaultArgs> = $Result.GetResult<Prisma.$ElfPayload, S>

  type ElfCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ElfFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ElfCountAggregateInputType | true
    }

  export interface ElfDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Elf'], meta: { name: 'Elf' } }
    /**
     * Find zero or one Elf that matches the filter.
     * @param {ElfFindUniqueArgs} args - Arguments to find a Elf
     * @example
     * // Get one Elf
     * const elf = await prisma.elf.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ElfFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ElfFindUniqueArgs<ExtArgs>>
    ): Prisma__ElfClient<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Elf that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ElfFindUniqueOrThrowArgs} args - Arguments to find a Elf
     * @example
     * // Get one Elf
     * const elf = await prisma.elf.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ElfFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ElfFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ElfClient<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Elf that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElfFindFirstArgs} args - Arguments to find a Elf
     * @example
     * // Get one Elf
     * const elf = await prisma.elf.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ElfFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ElfFindFirstArgs<ExtArgs>>
    ): Prisma__ElfClient<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Elf that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElfFindFirstOrThrowArgs} args - Arguments to find a Elf
     * @example
     * // Get one Elf
     * const elf = await prisma.elf.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ElfFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ElfFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ElfClient<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Elves that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElfFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Elves
     * const elves = await prisma.elf.findMany()
     * 
     * // Get first 10 Elves
     * const elves = await prisma.elf.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const elfWithIdOnly = await prisma.elf.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ElfFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ElfFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Elf.
     * @param {ElfCreateArgs} args - Arguments to create a Elf.
     * @example
     * // Create one Elf
     * const Elf = await prisma.elf.create({
     *   data: {
     *     // ... data to create a Elf
     *   }
     * })
     * 
    **/
    create<T extends ElfCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ElfCreateArgs<ExtArgs>>
    ): Prisma__ElfClient<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Elves.
     *     @param {ElfCreateManyArgs} args - Arguments to create many Elves.
     *     @example
     *     // Create many Elves
     *     const elf = await prisma.elf.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ElfCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ElfCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Elf.
     * @param {ElfDeleteArgs} args - Arguments to delete one Elf.
     * @example
     * // Delete one Elf
     * const Elf = await prisma.elf.delete({
     *   where: {
     *     // ... filter to delete one Elf
     *   }
     * })
     * 
    **/
    delete<T extends ElfDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ElfDeleteArgs<ExtArgs>>
    ): Prisma__ElfClient<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Elf.
     * @param {ElfUpdateArgs} args - Arguments to update one Elf.
     * @example
     * // Update one Elf
     * const elf = await prisma.elf.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ElfUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ElfUpdateArgs<ExtArgs>>
    ): Prisma__ElfClient<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Elves.
     * @param {ElfDeleteManyArgs} args - Arguments to filter Elves to delete.
     * @example
     * // Delete a few Elves
     * const { count } = await prisma.elf.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ElfDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ElfDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElfUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Elves
     * const elf = await prisma.elf.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ElfUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ElfUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Elf.
     * @param {ElfUpsertArgs} args - Arguments to update or create a Elf.
     * @example
     * // Update or create a Elf
     * const elf = await prisma.elf.upsert({
     *   create: {
     *     // ... data to create a Elf
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Elf we want to update
     *   }
     * })
    **/
    upsert<T extends ElfUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ElfUpsertArgs<ExtArgs>>
    ): Prisma__ElfClient<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Elves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElfCountArgs} args - Arguments to filter Elves to count.
     * @example
     * // Count the number of Elves
     * const count = await prisma.elf.count({
     *   where: {
     *     // ... the filter for the Elves we want to count
     *   }
     * })
    **/
    count<T extends ElfCountArgs>(
      args?: Subset<T, ElfCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElfCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Elf.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElfAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElfAggregateArgs>(args: Subset<T, ElfAggregateArgs>): Prisma.PrismaPromise<GetElfAggregateType<T>>

    /**
     * Group by Elf.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElfGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElfGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElfGroupByArgs['orderBy'] }
        : { orderBy?: ElfGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElfGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElfGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Elf model
   */
  readonly fields: ElfFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Elf.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElfClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    reports<T extends Elf$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Elf$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, 'findMany'> | Null>;

    workLogs<T extends Elf$workLogsArgs<ExtArgs> = {}>(args?: Subset<T, Elf$workLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Elf model
   */ 
  interface ElfFieldRefs {
    readonly id: FieldRef<"Elf", 'String'>
    readonly agentId: FieldRef<"Elf", 'String'>
    readonly name: FieldRef<"Elf", 'String'>
    readonly password: FieldRef<"Elf", 'String'>
    readonly status: FieldRef<"Elf", 'String'>
    readonly points: FieldRef<"Elf", 'Int'>
    readonly level: FieldRef<"Elf", 'Int'>
    readonly title: FieldRef<"Elf", 'String'>
    readonly lastActive: FieldRef<"Elf", 'DateTime'>
    readonly createdAt: FieldRef<"Elf", 'DateTime'>
    readonly avatarUrl: FieldRef<"Elf", 'String'>
    readonly badges: FieldRef<"Elf", 'String[]'>
    readonly department: FieldRef<"Elf", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Elf findUnique
   */
  export type ElfFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
    /**
     * Filter, which Elf to fetch.
     */
    where: ElfWhereUniqueInput
  }


  /**
   * Elf findUniqueOrThrow
   */
  export type ElfFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
    /**
     * Filter, which Elf to fetch.
     */
    where: ElfWhereUniqueInput
  }


  /**
   * Elf findFirst
   */
  export type ElfFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
    /**
     * Filter, which Elf to fetch.
     */
    where?: ElfWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elves to fetch.
     */
    orderBy?: ElfOrderByWithRelationInput | ElfOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elves.
     */
    cursor?: ElfWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elves.
     */
    distinct?: ElfScalarFieldEnum | ElfScalarFieldEnum[]
  }


  /**
   * Elf findFirstOrThrow
   */
  export type ElfFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
    /**
     * Filter, which Elf to fetch.
     */
    where?: ElfWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elves to fetch.
     */
    orderBy?: ElfOrderByWithRelationInput | ElfOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elves.
     */
    cursor?: ElfWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elves.
     */
    distinct?: ElfScalarFieldEnum | ElfScalarFieldEnum[]
  }


  /**
   * Elf findMany
   */
  export type ElfFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
    /**
     * Filter, which Elves to fetch.
     */
    where?: ElfWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elves to fetch.
     */
    orderBy?: ElfOrderByWithRelationInput | ElfOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Elves.
     */
    cursor?: ElfWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elves.
     */
    skip?: number
    distinct?: ElfScalarFieldEnum | ElfScalarFieldEnum[]
  }


  /**
   * Elf create
   */
  export type ElfCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
    /**
     * The data needed to create a Elf.
     */
    data: XOR<ElfCreateInput, ElfUncheckedCreateInput>
  }


  /**
   * Elf createMany
   */
  export type ElfCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Elves.
     */
    data: ElfCreateManyInput | ElfCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Elf update
   */
  export type ElfUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
    /**
     * The data needed to update a Elf.
     */
    data: XOR<ElfUpdateInput, ElfUncheckedUpdateInput>
    /**
     * Choose, which Elf to update.
     */
    where: ElfWhereUniqueInput
  }


  /**
   * Elf updateMany
   */
  export type ElfUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Elves.
     */
    data: XOR<ElfUpdateManyMutationInput, ElfUncheckedUpdateManyInput>
    /**
     * Filter which Elves to update
     */
    where?: ElfWhereInput
  }


  /**
   * Elf upsert
   */
  export type ElfUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
    /**
     * The filter to search for the Elf to update in case it exists.
     */
    where: ElfWhereUniqueInput
    /**
     * In case the Elf found by the `where` argument doesn't exist, create a new Elf with this data.
     */
    create: XOR<ElfCreateInput, ElfUncheckedCreateInput>
    /**
     * In case the Elf was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElfUpdateInput, ElfUncheckedUpdateInput>
  }


  /**
   * Elf delete
   */
  export type ElfDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
    /**
     * Filter which Elf to delete.
     */
    where: ElfWhereUniqueInput
  }


  /**
   * Elf deleteMany
   */
  export type ElfDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Elves to delete
     */
    where?: ElfWhereInput
  }


  /**
   * Elf.reports
   */
  export type Elf$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }


  /**
   * Elf.workLogs
   */
  export type Elf$workLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
    where?: WorkLogWhereInput
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    cursor?: WorkLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkLogScalarFieldEnum | WorkLogScalarFieldEnum[]
  }


  /**
   * Elf without action
   */
  export type ElfDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Elf
     */
    select?: ElfSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ElfInclude<ExtArgs> | null
  }



  /**
   * Model WorkLog
   */

  export type AggregateWorkLog = {
    _count: WorkLogCountAggregateOutputType | null
    _avg: WorkLogAvgAggregateOutputType | null
    _sum: WorkLogSumAggregateOutputType | null
    _min: WorkLogMinAggregateOutputType | null
    _max: WorkLogMaxAggregateOutputType | null
  }

  export type WorkLogAvgAggregateOutputType = {
    pointsEarned: number | null
  }

  export type WorkLogSumAggregateOutputType = {
    pointsEarned: number | null
  }

  export type WorkLogMinAggregateOutputType = {
    id: string | null
    elfId: string | null
    action: string | null
    description: string | null
    pointsEarned: number | null
    timestamp: Date | null
  }

  export type WorkLogMaxAggregateOutputType = {
    id: string | null
    elfId: string | null
    action: string | null
    description: string | null
    pointsEarned: number | null
    timestamp: Date | null
  }

  export type WorkLogCountAggregateOutputType = {
    id: number
    elfId: number
    action: number
    description: number
    pointsEarned: number
    timestamp: number
    _all: number
  }


  export type WorkLogAvgAggregateInputType = {
    pointsEarned?: true
  }

  export type WorkLogSumAggregateInputType = {
    pointsEarned?: true
  }

  export type WorkLogMinAggregateInputType = {
    id?: true
    elfId?: true
    action?: true
    description?: true
    pointsEarned?: true
    timestamp?: true
  }

  export type WorkLogMaxAggregateInputType = {
    id?: true
    elfId?: true
    action?: true
    description?: true
    pointsEarned?: true
    timestamp?: true
  }

  export type WorkLogCountAggregateInputType = {
    id?: true
    elfId?: true
    action?: true
    description?: true
    pointsEarned?: true
    timestamp?: true
    _all?: true
  }

  export type WorkLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkLog to aggregate.
     */
    where?: WorkLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkLogs to fetch.
     */
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkLogs
    **/
    _count?: true | WorkLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkLogMaxAggregateInputType
  }

  export type GetWorkLogAggregateType<T extends WorkLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkLog[P]>
      : GetScalarType<T[P], AggregateWorkLog[P]>
  }




  export type WorkLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkLogWhereInput
    orderBy?: WorkLogOrderByWithAggregationInput | WorkLogOrderByWithAggregationInput[]
    by: WorkLogScalarFieldEnum[] | WorkLogScalarFieldEnum
    having?: WorkLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkLogCountAggregateInputType | true
    _avg?: WorkLogAvgAggregateInputType
    _sum?: WorkLogSumAggregateInputType
    _min?: WorkLogMinAggregateInputType
    _max?: WorkLogMaxAggregateInputType
  }

  export type WorkLogGroupByOutputType = {
    id: string
    elfId: string
    action: string
    description: string
    pointsEarned: number
    timestamp: Date
    _count: WorkLogCountAggregateOutputType | null
    _avg: WorkLogAvgAggregateOutputType | null
    _sum: WorkLogSumAggregateOutputType | null
    _min: WorkLogMinAggregateOutputType | null
    _max: WorkLogMaxAggregateOutputType | null
  }

  type GetWorkLogGroupByPayload<T extends WorkLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkLogGroupByOutputType[P]>
            : GetScalarType<T[P], WorkLogGroupByOutputType[P]>
        }
      >
    >


  export type WorkLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    elfId?: boolean
    action?: boolean
    description?: boolean
    pointsEarned?: boolean
    timestamp?: boolean
    elf?: boolean | ElfDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workLog"]>

  export type WorkLogSelectScalar = {
    id?: boolean
    elfId?: boolean
    action?: boolean
    description?: boolean
    pointsEarned?: boolean
    timestamp?: boolean
  }

  export type WorkLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elf?: boolean | ElfDefaultArgs<ExtArgs>
  }


  export type $WorkLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkLog"
    objects: {
      elf: Prisma.$ElfPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      elfId: string
      action: string
      description: string
      pointsEarned: number
      timestamp: Date
    }, ExtArgs["result"]["workLog"]>
    composites: {}
  }


  type WorkLogGetPayload<S extends boolean | null | undefined | WorkLogDefaultArgs> = $Result.GetResult<Prisma.$WorkLogPayload, S>

  type WorkLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkLogCountAggregateInputType | true
    }

  export interface WorkLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkLog'], meta: { name: 'WorkLog' } }
    /**
     * Find zero or one WorkLog that matches the filter.
     * @param {WorkLogFindUniqueArgs} args - Arguments to find a WorkLog
     * @example
     * // Get one WorkLog
     * const workLog = await prisma.workLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WorkLogFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, WorkLogFindUniqueArgs<ExtArgs>>
    ): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one WorkLog that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WorkLogFindUniqueOrThrowArgs} args - Arguments to find a WorkLog
     * @example
     * // Get one WorkLog
     * const workLog = await prisma.workLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WorkLogFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkLogFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first WorkLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogFindFirstArgs} args - Arguments to find a WorkLog
     * @example
     * // Get one WorkLog
     * const workLog = await prisma.workLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WorkLogFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkLogFindFirstArgs<ExtArgs>>
    ): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first WorkLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogFindFirstOrThrowArgs} args - Arguments to find a WorkLog
     * @example
     * // Get one WorkLog
     * const workLog = await prisma.workLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WorkLogFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkLogFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more WorkLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkLogs
     * const workLogs = await prisma.workLog.findMany()
     * 
     * // Get first 10 WorkLogs
     * const workLogs = await prisma.workLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workLogWithIdOnly = await prisma.workLog.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WorkLogFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkLogFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a WorkLog.
     * @param {WorkLogCreateArgs} args - Arguments to create a WorkLog.
     * @example
     * // Create one WorkLog
     * const WorkLog = await prisma.workLog.create({
     *   data: {
     *     // ... data to create a WorkLog
     *   }
     * })
     * 
    **/
    create<T extends WorkLogCreateArgs<ExtArgs>>(
      args: SelectSubset<T, WorkLogCreateArgs<ExtArgs>>
    ): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many WorkLogs.
     *     @param {WorkLogCreateManyArgs} args - Arguments to create many WorkLogs.
     *     @example
     *     // Create many WorkLogs
     *     const workLog = await prisma.workLog.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WorkLogCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkLogCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WorkLog.
     * @param {WorkLogDeleteArgs} args - Arguments to delete one WorkLog.
     * @example
     * // Delete one WorkLog
     * const WorkLog = await prisma.workLog.delete({
     *   where: {
     *     // ... filter to delete one WorkLog
     *   }
     * })
     * 
    **/
    delete<T extends WorkLogDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, WorkLogDeleteArgs<ExtArgs>>
    ): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one WorkLog.
     * @param {WorkLogUpdateArgs} args - Arguments to update one WorkLog.
     * @example
     * // Update one WorkLog
     * const workLog = await prisma.workLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WorkLogUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, WorkLogUpdateArgs<ExtArgs>>
    ): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more WorkLogs.
     * @param {WorkLogDeleteManyArgs} args - Arguments to filter WorkLogs to delete.
     * @example
     * // Delete a few WorkLogs
     * const { count } = await prisma.workLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WorkLogDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WorkLogDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkLogs
     * const workLog = await prisma.workLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WorkLogUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, WorkLogUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkLog.
     * @param {WorkLogUpsertArgs} args - Arguments to update or create a WorkLog.
     * @example
     * // Update or create a WorkLog
     * const workLog = await prisma.workLog.upsert({
     *   create: {
     *     // ... data to create a WorkLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkLog we want to update
     *   }
     * })
    **/
    upsert<T extends WorkLogUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, WorkLogUpsertArgs<ExtArgs>>
    ): Prisma__WorkLogClient<$Result.GetResult<Prisma.$WorkLogPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of WorkLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogCountArgs} args - Arguments to filter WorkLogs to count.
     * @example
     * // Count the number of WorkLogs
     * const count = await prisma.workLog.count({
     *   where: {
     *     // ... the filter for the WorkLogs we want to count
     *   }
     * })
    **/
    count<T extends WorkLogCountArgs>(
      args?: Subset<T, WorkLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkLogAggregateArgs>(args: Subset<T, WorkLogAggregateArgs>): Prisma.PrismaPromise<GetWorkLogAggregateType<T>>

    /**
     * Group by WorkLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkLogGroupByArgs['orderBy'] }
        : { orderBy?: WorkLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkLog model
   */
  readonly fields: WorkLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    elf<T extends ElfDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElfDefaultArgs<ExtArgs>>): Prisma__ElfClient<$Result.GetResult<Prisma.$ElfPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the WorkLog model
   */ 
  interface WorkLogFieldRefs {
    readonly id: FieldRef<"WorkLog", 'String'>
    readonly elfId: FieldRef<"WorkLog", 'String'>
    readonly action: FieldRef<"WorkLog", 'String'>
    readonly description: FieldRef<"WorkLog", 'String'>
    readonly pointsEarned: FieldRef<"WorkLog", 'Int'>
    readonly timestamp: FieldRef<"WorkLog", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * WorkLog findUnique
   */
  export type WorkLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter, which WorkLog to fetch.
     */
    where: WorkLogWhereUniqueInput
  }


  /**
   * WorkLog findUniqueOrThrow
   */
  export type WorkLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter, which WorkLog to fetch.
     */
    where: WorkLogWhereUniqueInput
  }


  /**
   * WorkLog findFirst
   */
  export type WorkLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter, which WorkLog to fetch.
     */
    where?: WorkLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkLogs to fetch.
     */
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkLogs.
     */
    cursor?: WorkLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkLogs.
     */
    distinct?: WorkLogScalarFieldEnum | WorkLogScalarFieldEnum[]
  }


  /**
   * WorkLog findFirstOrThrow
   */
  export type WorkLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter, which WorkLog to fetch.
     */
    where?: WorkLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkLogs to fetch.
     */
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkLogs.
     */
    cursor?: WorkLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkLogs.
     */
    distinct?: WorkLogScalarFieldEnum | WorkLogScalarFieldEnum[]
  }


  /**
   * WorkLog findMany
   */
  export type WorkLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter, which WorkLogs to fetch.
     */
    where?: WorkLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkLogs to fetch.
     */
    orderBy?: WorkLogOrderByWithRelationInput | WorkLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkLogs.
     */
    cursor?: WorkLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkLogs.
     */
    skip?: number
    distinct?: WorkLogScalarFieldEnum | WorkLogScalarFieldEnum[]
  }


  /**
   * WorkLog create
   */
  export type WorkLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkLog.
     */
    data: XOR<WorkLogCreateInput, WorkLogUncheckedCreateInput>
  }


  /**
   * WorkLog createMany
   */
  export type WorkLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkLogs.
     */
    data: WorkLogCreateManyInput | WorkLogCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * WorkLog update
   */
  export type WorkLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkLog.
     */
    data: XOR<WorkLogUpdateInput, WorkLogUncheckedUpdateInput>
    /**
     * Choose, which WorkLog to update.
     */
    where: WorkLogWhereUniqueInput
  }


  /**
   * WorkLog updateMany
   */
  export type WorkLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkLogs.
     */
    data: XOR<WorkLogUpdateManyMutationInput, WorkLogUncheckedUpdateManyInput>
    /**
     * Filter which WorkLogs to update
     */
    where?: WorkLogWhereInput
  }


  /**
   * WorkLog upsert
   */
  export type WorkLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkLog to update in case it exists.
     */
    where: WorkLogWhereUniqueInput
    /**
     * In case the WorkLog found by the `where` argument doesn't exist, create a new WorkLog with this data.
     */
    create: XOR<WorkLogCreateInput, WorkLogUncheckedCreateInput>
    /**
     * In case the WorkLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkLogUpdateInput, WorkLogUncheckedUpdateInput>
  }


  /**
   * WorkLog delete
   */
  export type WorkLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
    /**
     * Filter which WorkLog to delete.
     */
    where: WorkLogWhereUniqueInput
  }


  /**
   * WorkLog deleteMany
   */
  export type WorkLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkLogs to delete
     */
    where?: WorkLogWhereInput
  }


  /**
   * WorkLog without action
   */
  export type WorkLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkLog
     */
    select?: WorkLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WorkLogInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FactoryStatsScalarFieldEnum: {
    id: 'id',
    toysProduced: 'toysProduced',
    coalStockpiled: 'coalStockpiled',
    updatedAt: 'updatedAt'
  };

  export type FactoryStatsScalarFieldEnum = (typeof FactoryStatsScalarFieldEnum)[keyof typeof FactoryStatsScalarFieldEnum]


  export const ChildScalarFieldEnum: {
    id: 'id',
    name: 'name',
    age: 'age',
    status: 'status',
    location: 'location',
    city: 'city',
    country: 'country',
    lat: 'lat',
    lng: 'lng',
    wishlist: 'wishlist',
    behaviorScore: 'behaviorScore',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChildScalarFieldEnum = (typeof ChildScalarFieldEnum)[keyof typeof ChildScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    type: 'type',
    description: 'description',
    mediaUrl: 'mediaUrl',
    timestamp: 'timestamp',
    childId: 'childId',
    lat: 'lat',
    lng: 'lng',
    locationName: 'locationName',
    reporterId: 'reporterId'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const ElfScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    name: 'name',
    password: 'password',
    status: 'status',
    points: 'points',
    level: 'level',
    title: 'title',
    lastActive: 'lastActive',
    createdAt: 'createdAt',
    avatarUrl: 'avatarUrl',
    badges: 'badges',
    department: 'department'
  };

  export type ElfScalarFieldEnum = (typeof ElfScalarFieldEnum)[keyof typeof ElfScalarFieldEnum]


  export const WorkLogScalarFieldEnum: {
    id: 'id',
    elfId: 'elfId',
    action: 'action',
    description: 'description',
    pointsEarned: 'pointsEarned',
    timestamp: 'timestamp'
  };

  export type WorkLogScalarFieldEnum = (typeof WorkLogScalarFieldEnum)[keyof typeof WorkLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type FactoryStatsWhereInput = {
    AND?: FactoryStatsWhereInput | FactoryStatsWhereInput[]
    OR?: FactoryStatsWhereInput[]
    NOT?: FactoryStatsWhereInput | FactoryStatsWhereInput[]
    id?: StringFilter<"FactoryStats"> | string
    toysProduced?: IntFilter<"FactoryStats"> | number
    coalStockpiled?: IntFilter<"FactoryStats"> | number
    updatedAt?: DateTimeFilter<"FactoryStats"> | Date | string
  }

  export type FactoryStatsOrderByWithRelationInput = {
    id?: SortOrder
    toysProduced?: SortOrder
    coalStockpiled?: SortOrder
    updatedAt?: SortOrder
  }

  export type FactoryStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FactoryStatsWhereInput | FactoryStatsWhereInput[]
    OR?: FactoryStatsWhereInput[]
    NOT?: FactoryStatsWhereInput | FactoryStatsWhereInput[]
    toysProduced?: IntFilter<"FactoryStats"> | number
    coalStockpiled?: IntFilter<"FactoryStats"> | number
    updatedAt?: DateTimeFilter<"FactoryStats"> | Date | string
  }, "id">

  export type FactoryStatsOrderByWithAggregationInput = {
    id?: SortOrder
    toysProduced?: SortOrder
    coalStockpiled?: SortOrder
    updatedAt?: SortOrder
    _count?: FactoryStatsCountOrderByAggregateInput
    _avg?: FactoryStatsAvgOrderByAggregateInput
    _max?: FactoryStatsMaxOrderByAggregateInput
    _min?: FactoryStatsMinOrderByAggregateInput
    _sum?: FactoryStatsSumOrderByAggregateInput
  }

  export type FactoryStatsScalarWhereWithAggregatesInput = {
    AND?: FactoryStatsScalarWhereWithAggregatesInput | FactoryStatsScalarWhereWithAggregatesInput[]
    OR?: FactoryStatsScalarWhereWithAggregatesInput[]
    NOT?: FactoryStatsScalarWhereWithAggregatesInput | FactoryStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FactoryStats"> | string
    toysProduced?: IntWithAggregatesFilter<"FactoryStats"> | number
    coalStockpiled?: IntWithAggregatesFilter<"FactoryStats"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"FactoryStats"> | Date | string
  }

  export type ChildWhereInput = {
    AND?: ChildWhereInput | ChildWhereInput[]
    OR?: ChildWhereInput[]
    NOT?: ChildWhereInput | ChildWhereInput[]
    id?: StringFilter<"Child"> | string
    name?: StringFilter<"Child"> | string
    age?: IntFilter<"Child"> | number
    status?: StringFilter<"Child"> | string
    location?: StringFilter<"Child"> | string
    city?: StringFilter<"Child"> | string
    country?: StringFilter<"Child"> | string
    lat?: FloatFilter<"Child"> | number
    lng?: FloatFilter<"Child"> | number
    wishlist?: StringNullableFilter<"Child"> | string | null
    behaviorScore?: IntFilter<"Child"> | number
    createdAt?: DateTimeFilter<"Child"> | Date | string
    updatedAt?: DateTimeFilter<"Child"> | Date | string
    reports?: ReportListRelationFilter
  }

  export type ChildOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    status?: SortOrder
    location?: SortOrder
    city?: SortOrder
    country?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    wishlist?: SortOrderInput | SortOrder
    behaviorScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reports?: ReportOrderByRelationAggregateInput
  }

  export type ChildWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChildWhereInput | ChildWhereInput[]
    OR?: ChildWhereInput[]
    NOT?: ChildWhereInput | ChildWhereInput[]
    name?: StringFilter<"Child"> | string
    age?: IntFilter<"Child"> | number
    status?: StringFilter<"Child"> | string
    location?: StringFilter<"Child"> | string
    city?: StringFilter<"Child"> | string
    country?: StringFilter<"Child"> | string
    lat?: FloatFilter<"Child"> | number
    lng?: FloatFilter<"Child"> | number
    wishlist?: StringNullableFilter<"Child"> | string | null
    behaviorScore?: IntFilter<"Child"> | number
    createdAt?: DateTimeFilter<"Child"> | Date | string
    updatedAt?: DateTimeFilter<"Child"> | Date | string
    reports?: ReportListRelationFilter
  }, "id">

  export type ChildOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    status?: SortOrder
    location?: SortOrder
    city?: SortOrder
    country?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    wishlist?: SortOrderInput | SortOrder
    behaviorScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChildCountOrderByAggregateInput
    _avg?: ChildAvgOrderByAggregateInput
    _max?: ChildMaxOrderByAggregateInput
    _min?: ChildMinOrderByAggregateInput
    _sum?: ChildSumOrderByAggregateInput
  }

  export type ChildScalarWhereWithAggregatesInput = {
    AND?: ChildScalarWhereWithAggregatesInput | ChildScalarWhereWithAggregatesInput[]
    OR?: ChildScalarWhereWithAggregatesInput[]
    NOT?: ChildScalarWhereWithAggregatesInput | ChildScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Child"> | string
    name?: StringWithAggregatesFilter<"Child"> | string
    age?: IntWithAggregatesFilter<"Child"> | number
    status?: StringWithAggregatesFilter<"Child"> | string
    location?: StringWithAggregatesFilter<"Child"> | string
    city?: StringWithAggregatesFilter<"Child"> | string
    country?: StringWithAggregatesFilter<"Child"> | string
    lat?: FloatWithAggregatesFilter<"Child"> | number
    lng?: FloatWithAggregatesFilter<"Child"> | number
    wishlist?: StringNullableWithAggregatesFilter<"Child"> | string | null
    behaviorScore?: IntWithAggregatesFilter<"Child"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Child"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Child"> | Date | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    type?: StringFilter<"Report"> | string
    description?: StringFilter<"Report"> | string
    mediaUrl?: StringNullableFilter<"Report"> | string | null
    timestamp?: DateTimeFilter<"Report"> | Date | string
    childId?: StringFilter<"Report"> | string
    lat?: FloatNullableFilter<"Report"> | number | null
    lng?: FloatNullableFilter<"Report"> | number | null
    locationName?: StringNullableFilter<"Report"> | string | null
    reporterId?: StringNullableFilter<"Report"> | string | null
    child?: XOR<ChildRelationFilter, ChildWhereInput>
    reporter?: XOR<ElfNullableRelationFilter, ElfWhereInput> | null
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    childId?: SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    locationName?: SortOrderInput | SortOrder
    reporterId?: SortOrderInput | SortOrder
    child?: ChildOrderByWithRelationInput
    reporter?: ElfOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    type?: StringFilter<"Report"> | string
    description?: StringFilter<"Report"> | string
    mediaUrl?: StringNullableFilter<"Report"> | string | null
    timestamp?: DateTimeFilter<"Report"> | Date | string
    childId?: StringFilter<"Report"> | string
    lat?: FloatNullableFilter<"Report"> | number | null
    lng?: FloatNullableFilter<"Report"> | number | null
    locationName?: StringNullableFilter<"Report"> | string | null
    reporterId?: StringNullableFilter<"Report"> | string | null
    child?: XOR<ChildRelationFilter, ChildWhereInput>
    reporter?: XOR<ElfNullableRelationFilter, ElfWhereInput> | null
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    childId?: SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    locationName?: SortOrderInput | SortOrder
    reporterId?: SortOrderInput | SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    type?: StringWithAggregatesFilter<"Report"> | string
    description?: StringWithAggregatesFilter<"Report"> | string
    mediaUrl?: StringNullableWithAggregatesFilter<"Report"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    childId?: StringWithAggregatesFilter<"Report"> | string
    lat?: FloatNullableWithAggregatesFilter<"Report"> | number | null
    lng?: FloatNullableWithAggregatesFilter<"Report"> | number | null
    locationName?: StringNullableWithAggregatesFilter<"Report"> | string | null
    reporterId?: StringNullableWithAggregatesFilter<"Report"> | string | null
  }

  export type ElfWhereInput = {
    AND?: ElfWhereInput | ElfWhereInput[]
    OR?: ElfWhereInput[]
    NOT?: ElfWhereInput | ElfWhereInput[]
    id?: StringFilter<"Elf"> | string
    agentId?: StringFilter<"Elf"> | string
    name?: StringFilter<"Elf"> | string
    password?: StringFilter<"Elf"> | string
    status?: StringFilter<"Elf"> | string
    points?: IntFilter<"Elf"> | number
    level?: IntFilter<"Elf"> | number
    title?: StringFilter<"Elf"> | string
    lastActive?: DateTimeFilter<"Elf"> | Date | string
    createdAt?: DateTimeFilter<"Elf"> | Date | string
    avatarUrl?: StringNullableFilter<"Elf"> | string | null
    badges?: StringNullableListFilter<"Elf">
    department?: StringFilter<"Elf"> | string
    reports?: ReportListRelationFilter
    workLogs?: WorkLogListRelationFilter
  }

  export type ElfOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    name?: SortOrder
    password?: SortOrder
    status?: SortOrder
    points?: SortOrder
    level?: SortOrder
    title?: SortOrder
    lastActive?: SortOrder
    createdAt?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    badges?: SortOrder
    department?: SortOrder
    reports?: ReportOrderByRelationAggregateInput
    workLogs?: WorkLogOrderByRelationAggregateInput
  }

  export type ElfWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agentId?: string
    AND?: ElfWhereInput | ElfWhereInput[]
    OR?: ElfWhereInput[]
    NOT?: ElfWhereInput | ElfWhereInput[]
    name?: StringFilter<"Elf"> | string
    password?: StringFilter<"Elf"> | string
    status?: StringFilter<"Elf"> | string
    points?: IntFilter<"Elf"> | number
    level?: IntFilter<"Elf"> | number
    title?: StringFilter<"Elf"> | string
    lastActive?: DateTimeFilter<"Elf"> | Date | string
    createdAt?: DateTimeFilter<"Elf"> | Date | string
    avatarUrl?: StringNullableFilter<"Elf"> | string | null
    badges?: StringNullableListFilter<"Elf">
    department?: StringFilter<"Elf"> | string
    reports?: ReportListRelationFilter
    workLogs?: WorkLogListRelationFilter
  }, "id" | "agentId">

  export type ElfOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    name?: SortOrder
    password?: SortOrder
    status?: SortOrder
    points?: SortOrder
    level?: SortOrder
    title?: SortOrder
    lastActive?: SortOrder
    createdAt?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    badges?: SortOrder
    department?: SortOrder
    _count?: ElfCountOrderByAggregateInput
    _avg?: ElfAvgOrderByAggregateInput
    _max?: ElfMaxOrderByAggregateInput
    _min?: ElfMinOrderByAggregateInput
    _sum?: ElfSumOrderByAggregateInput
  }

  export type ElfScalarWhereWithAggregatesInput = {
    AND?: ElfScalarWhereWithAggregatesInput | ElfScalarWhereWithAggregatesInput[]
    OR?: ElfScalarWhereWithAggregatesInput[]
    NOT?: ElfScalarWhereWithAggregatesInput | ElfScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Elf"> | string
    agentId?: StringWithAggregatesFilter<"Elf"> | string
    name?: StringWithAggregatesFilter<"Elf"> | string
    password?: StringWithAggregatesFilter<"Elf"> | string
    status?: StringWithAggregatesFilter<"Elf"> | string
    points?: IntWithAggregatesFilter<"Elf"> | number
    level?: IntWithAggregatesFilter<"Elf"> | number
    title?: StringWithAggregatesFilter<"Elf"> | string
    lastActive?: DateTimeWithAggregatesFilter<"Elf"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Elf"> | Date | string
    avatarUrl?: StringNullableWithAggregatesFilter<"Elf"> | string | null
    badges?: StringNullableListFilter<"Elf">
    department?: StringWithAggregatesFilter<"Elf"> | string
  }

  export type WorkLogWhereInput = {
    AND?: WorkLogWhereInput | WorkLogWhereInput[]
    OR?: WorkLogWhereInput[]
    NOT?: WorkLogWhereInput | WorkLogWhereInput[]
    id?: StringFilter<"WorkLog"> | string
    elfId?: StringFilter<"WorkLog"> | string
    action?: StringFilter<"WorkLog"> | string
    description?: StringFilter<"WorkLog"> | string
    pointsEarned?: IntFilter<"WorkLog"> | number
    timestamp?: DateTimeFilter<"WorkLog"> | Date | string
    elf?: XOR<ElfRelationFilter, ElfWhereInput>
  }

  export type WorkLogOrderByWithRelationInput = {
    id?: SortOrder
    elfId?: SortOrder
    action?: SortOrder
    description?: SortOrder
    pointsEarned?: SortOrder
    timestamp?: SortOrder
    elf?: ElfOrderByWithRelationInput
  }

  export type WorkLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkLogWhereInput | WorkLogWhereInput[]
    OR?: WorkLogWhereInput[]
    NOT?: WorkLogWhereInput | WorkLogWhereInput[]
    elfId?: StringFilter<"WorkLog"> | string
    action?: StringFilter<"WorkLog"> | string
    description?: StringFilter<"WorkLog"> | string
    pointsEarned?: IntFilter<"WorkLog"> | number
    timestamp?: DateTimeFilter<"WorkLog"> | Date | string
    elf?: XOR<ElfRelationFilter, ElfWhereInput>
  }, "id">

  export type WorkLogOrderByWithAggregationInput = {
    id?: SortOrder
    elfId?: SortOrder
    action?: SortOrder
    description?: SortOrder
    pointsEarned?: SortOrder
    timestamp?: SortOrder
    _count?: WorkLogCountOrderByAggregateInput
    _avg?: WorkLogAvgOrderByAggregateInput
    _max?: WorkLogMaxOrderByAggregateInput
    _min?: WorkLogMinOrderByAggregateInput
    _sum?: WorkLogSumOrderByAggregateInput
  }

  export type WorkLogScalarWhereWithAggregatesInput = {
    AND?: WorkLogScalarWhereWithAggregatesInput | WorkLogScalarWhereWithAggregatesInput[]
    OR?: WorkLogScalarWhereWithAggregatesInput[]
    NOT?: WorkLogScalarWhereWithAggregatesInput | WorkLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkLog"> | string
    elfId?: StringWithAggregatesFilter<"WorkLog"> | string
    action?: StringWithAggregatesFilter<"WorkLog"> | string
    description?: StringWithAggregatesFilter<"WorkLog"> | string
    pointsEarned?: IntWithAggregatesFilter<"WorkLog"> | number
    timestamp?: DateTimeWithAggregatesFilter<"WorkLog"> | Date | string
  }

  export type FactoryStatsCreateInput = {
    id?: string
    toysProduced?: number
    coalStockpiled?: number
    updatedAt?: Date | string
  }

  export type FactoryStatsUncheckedCreateInput = {
    id?: string
    toysProduced?: number
    coalStockpiled?: number
    updatedAt?: Date | string
  }

  export type FactoryStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    toysProduced?: IntFieldUpdateOperationsInput | number
    coalStockpiled?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FactoryStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    toysProduced?: IntFieldUpdateOperationsInput | number
    coalStockpiled?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FactoryStatsCreateManyInput = {
    id?: string
    toysProduced?: number
    coalStockpiled?: number
    updatedAt?: Date | string
  }

  export type FactoryStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    toysProduced?: IntFieldUpdateOperationsInput | number
    coalStockpiled?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FactoryStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    toysProduced?: IntFieldUpdateOperationsInput | number
    coalStockpiled?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildCreateInput = {
    id?: string
    name: string
    age: number
    status: string
    location: string
    city: string
    country: string
    lat: number
    lng: number
    wishlist?: string | null
    behaviorScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportCreateNestedManyWithoutChildInput
  }

  export type ChildUncheckedCreateInput = {
    id?: string
    name: string
    age: number
    status: string
    location: string
    city: string
    country: string
    lat: number
    lng: number
    wishlist?: string | null
    behaviorScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: ReportUncheckedCreateNestedManyWithoutChildInput
  }

  export type ChildUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    wishlist?: NullableStringFieldUpdateOperationsInput | string | null
    behaviorScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUpdateManyWithoutChildNestedInput
  }

  export type ChildUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    wishlist?: NullableStringFieldUpdateOperationsInput | string | null
    behaviorScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: ReportUncheckedUpdateManyWithoutChildNestedInput
  }

  export type ChildCreateManyInput = {
    id?: string
    name: string
    age: number
    status: string
    location: string
    city: string
    country: string
    lat: number
    lng: number
    wishlist?: string | null
    behaviorScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    wishlist?: NullableStringFieldUpdateOperationsInput | string | null
    behaviorScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    wishlist?: NullableStringFieldUpdateOperationsInput | string | null
    behaviorScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    id?: string
    type: string
    description: string
    mediaUrl?: string | null
    timestamp?: Date | string
    lat?: number | null
    lng?: number | null
    locationName?: string | null
    child: ChildCreateNestedOneWithoutReportsInput
    reporter?: ElfCreateNestedOneWithoutReportsInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    type: string
    description: string
    mediaUrl?: string | null
    timestamp?: Date | string
    childId: string
    lat?: number | null
    lng?: number | null
    locationName?: string | null
    reporterId?: string | null
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    child?: ChildUpdateOneRequiredWithoutReportsNestedInput
    reporter?: ElfUpdateOneWithoutReportsNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    childId?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportCreateManyInput = {
    id?: string
    type: string
    description: string
    mediaUrl?: string | null
    timestamp?: Date | string
    childId: string
    lat?: number | null
    lng?: number | null
    locationName?: string | null
    reporterId?: string | null
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    childId?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ElfCreateInput = {
    id?: string
    agentId: string
    name: string
    password: string
    status?: string
    points?: number
    level?: number
    title?: string
    lastActive?: Date | string
    createdAt?: Date | string
    avatarUrl?: string | null
    badges?: ElfCreatebadgesInput | string[]
    department?: string
    reports?: ReportCreateNestedManyWithoutReporterInput
    workLogs?: WorkLogCreateNestedManyWithoutElfInput
  }

  export type ElfUncheckedCreateInput = {
    id?: string
    agentId: string
    name: string
    password: string
    status?: string
    points?: number
    level?: number
    title?: string
    lastActive?: Date | string
    createdAt?: Date | string
    avatarUrl?: string | null
    badges?: ElfCreatebadgesInput | string[]
    department?: string
    reports?: ReportUncheckedCreateNestedManyWithoutReporterInput
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutElfInput
  }

  export type ElfUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    badges?: ElfUpdatebadgesInput | string[]
    department?: StringFieldUpdateOperationsInput | string
    reports?: ReportUpdateManyWithoutReporterNestedInput
    workLogs?: WorkLogUpdateManyWithoutElfNestedInput
  }

  export type ElfUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    badges?: ElfUpdatebadgesInput | string[]
    department?: StringFieldUpdateOperationsInput | string
    reports?: ReportUncheckedUpdateManyWithoutReporterNestedInput
    workLogs?: WorkLogUncheckedUpdateManyWithoutElfNestedInput
  }

  export type ElfCreateManyInput = {
    id?: string
    agentId: string
    name: string
    password: string
    status?: string
    points?: number
    level?: number
    title?: string
    lastActive?: Date | string
    createdAt?: Date | string
    avatarUrl?: string | null
    badges?: ElfCreatebadgesInput | string[]
    department?: string
  }

  export type ElfUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    badges?: ElfUpdatebadgesInput | string[]
    department?: StringFieldUpdateOperationsInput | string
  }

  export type ElfUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    badges?: ElfUpdatebadgesInput | string[]
    department?: StringFieldUpdateOperationsInput | string
  }

  export type WorkLogCreateInput = {
    id?: string
    action: string
    description: string
    pointsEarned: number
    timestamp?: Date | string
    elf: ElfCreateNestedOneWithoutWorkLogsInput
  }

  export type WorkLogUncheckedCreateInput = {
    id?: string
    elfId: string
    action: string
    description: string
    pointsEarned: number
    timestamp?: Date | string
  }

  export type WorkLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    elf?: ElfUpdateOneRequiredWithoutWorkLogsNestedInput
  }

  export type WorkLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    elfId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogCreateManyInput = {
    id?: string
    elfId: string
    action: string
    description: string
    pointsEarned: number
    timestamp?: Date | string
  }

  export type WorkLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    elfId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FactoryStatsCountOrderByAggregateInput = {
    id?: SortOrder
    toysProduced?: SortOrder
    coalStockpiled?: SortOrder
    updatedAt?: SortOrder
  }

  export type FactoryStatsAvgOrderByAggregateInput = {
    toysProduced?: SortOrder
    coalStockpiled?: SortOrder
  }

  export type FactoryStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    toysProduced?: SortOrder
    coalStockpiled?: SortOrder
    updatedAt?: SortOrder
  }

  export type FactoryStatsMinOrderByAggregateInput = {
    id?: SortOrder
    toysProduced?: SortOrder
    coalStockpiled?: SortOrder
    updatedAt?: SortOrder
  }

  export type FactoryStatsSumOrderByAggregateInput = {
    toysProduced?: SortOrder
    coalStockpiled?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChildCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    status?: SortOrder
    location?: SortOrder
    city?: SortOrder
    country?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    wishlist?: SortOrder
    behaviorScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChildAvgOrderByAggregateInput = {
    age?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    behaviorScore?: SortOrder
  }

  export type ChildMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    status?: SortOrder
    location?: SortOrder
    city?: SortOrder
    country?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    wishlist?: SortOrder
    behaviorScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChildMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    age?: SortOrder
    status?: SortOrder
    location?: SortOrder
    city?: SortOrder
    country?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    wishlist?: SortOrder
    behaviorScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChildSumOrderByAggregateInput = {
    age?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    behaviorScore?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ChildRelationFilter = {
    is?: ChildWhereInput
    isNot?: ChildWhereInput
  }

  export type ElfNullableRelationFilter = {
    is?: ElfWhereInput | null
    isNot?: ElfWhereInput | null
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    mediaUrl?: SortOrder
    timestamp?: SortOrder
    childId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    locationName?: SortOrder
    reporterId?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    mediaUrl?: SortOrder
    timestamp?: SortOrder
    childId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    locationName?: SortOrder
    reporterId?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    description?: SortOrder
    mediaUrl?: SortOrder
    timestamp?: SortOrder
    childId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    locationName?: SortOrder
    reporterId?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type WorkLogListRelationFilter = {
    every?: WorkLogWhereInput
    some?: WorkLogWhereInput
    none?: WorkLogWhereInput
  }

  export type WorkLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ElfCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    name?: SortOrder
    password?: SortOrder
    status?: SortOrder
    points?: SortOrder
    level?: SortOrder
    title?: SortOrder
    lastActive?: SortOrder
    createdAt?: SortOrder
    avatarUrl?: SortOrder
    badges?: SortOrder
    department?: SortOrder
  }

  export type ElfAvgOrderByAggregateInput = {
    points?: SortOrder
    level?: SortOrder
  }

  export type ElfMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    name?: SortOrder
    password?: SortOrder
    status?: SortOrder
    points?: SortOrder
    level?: SortOrder
    title?: SortOrder
    lastActive?: SortOrder
    createdAt?: SortOrder
    avatarUrl?: SortOrder
    department?: SortOrder
  }

  export type ElfMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    name?: SortOrder
    password?: SortOrder
    status?: SortOrder
    points?: SortOrder
    level?: SortOrder
    title?: SortOrder
    lastActive?: SortOrder
    createdAt?: SortOrder
    avatarUrl?: SortOrder
    department?: SortOrder
  }

  export type ElfSumOrderByAggregateInput = {
    points?: SortOrder
    level?: SortOrder
  }

  export type ElfRelationFilter = {
    is?: ElfWhereInput
    isNot?: ElfWhereInput
  }

  export type WorkLogCountOrderByAggregateInput = {
    id?: SortOrder
    elfId?: SortOrder
    action?: SortOrder
    description?: SortOrder
    pointsEarned?: SortOrder
    timestamp?: SortOrder
  }

  export type WorkLogAvgOrderByAggregateInput = {
    pointsEarned?: SortOrder
  }

  export type WorkLogMaxOrderByAggregateInput = {
    id?: SortOrder
    elfId?: SortOrder
    action?: SortOrder
    description?: SortOrder
    pointsEarned?: SortOrder
    timestamp?: SortOrder
  }

  export type WorkLogMinOrderByAggregateInput = {
    id?: SortOrder
    elfId?: SortOrder
    action?: SortOrder
    description?: SortOrder
    pointsEarned?: SortOrder
    timestamp?: SortOrder
  }

  export type WorkLogSumOrderByAggregateInput = {
    pointsEarned?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ReportCreateNestedManyWithoutChildInput = {
    create?: XOR<ReportCreateWithoutChildInput, ReportUncheckedCreateWithoutChildInput> | ReportCreateWithoutChildInput[] | ReportUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutChildInput | ReportCreateOrConnectWithoutChildInput[]
    createMany?: ReportCreateManyChildInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<ReportCreateWithoutChildInput, ReportUncheckedCreateWithoutChildInput> | ReportCreateWithoutChildInput[] | ReportUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutChildInput | ReportCreateOrConnectWithoutChildInput[]
    createMany?: ReportCreateManyChildInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ReportUpdateManyWithoutChildNestedInput = {
    create?: XOR<ReportCreateWithoutChildInput, ReportUncheckedCreateWithoutChildInput> | ReportCreateWithoutChildInput[] | ReportUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutChildInput | ReportCreateOrConnectWithoutChildInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutChildInput | ReportUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ReportCreateManyChildInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutChildInput | ReportUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutChildInput | ReportUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<ReportCreateWithoutChildInput, ReportUncheckedCreateWithoutChildInput> | ReportCreateWithoutChildInput[] | ReportUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutChildInput | ReportCreateOrConnectWithoutChildInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutChildInput | ReportUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ReportCreateManyChildInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutChildInput | ReportUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutChildInput | ReportUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ChildCreateNestedOneWithoutReportsInput = {
    create?: XOR<ChildCreateWithoutReportsInput, ChildUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutReportsInput
    connect?: ChildWhereUniqueInput
  }

  export type ElfCreateNestedOneWithoutReportsInput = {
    create?: XOR<ElfCreateWithoutReportsInput, ElfUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ElfCreateOrConnectWithoutReportsInput
    connect?: ElfWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ChildUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<ChildCreateWithoutReportsInput, ChildUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ChildCreateOrConnectWithoutReportsInput
    upsert?: ChildUpsertWithoutReportsInput
    connect?: ChildWhereUniqueInput
    update?: XOR<XOR<ChildUpdateToOneWithWhereWithoutReportsInput, ChildUpdateWithoutReportsInput>, ChildUncheckedUpdateWithoutReportsInput>
  }

  export type ElfUpdateOneWithoutReportsNestedInput = {
    create?: XOR<ElfCreateWithoutReportsInput, ElfUncheckedCreateWithoutReportsInput>
    connectOrCreate?: ElfCreateOrConnectWithoutReportsInput
    upsert?: ElfUpsertWithoutReportsInput
    disconnect?: ElfWhereInput | boolean
    delete?: ElfWhereInput | boolean
    connect?: ElfWhereUniqueInput
    update?: XOR<XOR<ElfUpdateToOneWithWhereWithoutReportsInput, ElfUpdateWithoutReportsInput>, ElfUncheckedUpdateWithoutReportsInput>
  }

  export type ElfCreatebadgesInput = {
    set: string[]
  }

  export type ReportCreateNestedManyWithoutReporterInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type WorkLogCreateNestedManyWithoutElfInput = {
    create?: XOR<WorkLogCreateWithoutElfInput, WorkLogUncheckedCreateWithoutElfInput> | WorkLogCreateWithoutElfInput[] | WorkLogUncheckedCreateWithoutElfInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutElfInput | WorkLogCreateOrConnectWithoutElfInput[]
    createMany?: WorkLogCreateManyElfInputEnvelope
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutReporterInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type WorkLogUncheckedCreateNestedManyWithoutElfInput = {
    create?: XOR<WorkLogCreateWithoutElfInput, WorkLogUncheckedCreateWithoutElfInput> | WorkLogCreateWithoutElfInput[] | WorkLogUncheckedCreateWithoutElfInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutElfInput | WorkLogCreateOrConnectWithoutElfInput[]
    createMany?: WorkLogCreateManyElfInputEnvelope
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
  }

  export type ElfUpdatebadgesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ReportUpdateManyWithoutReporterNestedInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutReporterInput | ReportUpsertWithWhereUniqueWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutReporterInput | ReportUpdateWithWhereUniqueWithoutReporterInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutReporterInput | ReportUpdateManyWithWhereWithoutReporterInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type WorkLogUpdateManyWithoutElfNestedInput = {
    create?: XOR<WorkLogCreateWithoutElfInput, WorkLogUncheckedCreateWithoutElfInput> | WorkLogCreateWithoutElfInput[] | WorkLogUncheckedCreateWithoutElfInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutElfInput | WorkLogCreateOrConnectWithoutElfInput[]
    upsert?: WorkLogUpsertWithWhereUniqueWithoutElfInput | WorkLogUpsertWithWhereUniqueWithoutElfInput[]
    createMany?: WorkLogCreateManyElfInputEnvelope
    set?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    disconnect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    delete?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    update?: WorkLogUpdateWithWhereUniqueWithoutElfInput | WorkLogUpdateWithWhereUniqueWithoutElfInput[]
    updateMany?: WorkLogUpdateManyWithWhereWithoutElfInput | WorkLogUpdateManyWithWhereWithoutElfInput[]
    deleteMany?: WorkLogScalarWhereInput | WorkLogScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutReporterNestedInput = {
    create?: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput> | ReportCreateWithoutReporterInput[] | ReportUncheckedCreateWithoutReporterInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutReporterInput | ReportCreateOrConnectWithoutReporterInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutReporterInput | ReportUpsertWithWhereUniqueWithoutReporterInput[]
    createMany?: ReportCreateManyReporterInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutReporterInput | ReportUpdateWithWhereUniqueWithoutReporterInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutReporterInput | ReportUpdateManyWithWhereWithoutReporterInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type WorkLogUncheckedUpdateManyWithoutElfNestedInput = {
    create?: XOR<WorkLogCreateWithoutElfInput, WorkLogUncheckedCreateWithoutElfInput> | WorkLogCreateWithoutElfInput[] | WorkLogUncheckedCreateWithoutElfInput[]
    connectOrCreate?: WorkLogCreateOrConnectWithoutElfInput | WorkLogCreateOrConnectWithoutElfInput[]
    upsert?: WorkLogUpsertWithWhereUniqueWithoutElfInput | WorkLogUpsertWithWhereUniqueWithoutElfInput[]
    createMany?: WorkLogCreateManyElfInputEnvelope
    set?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    disconnect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    delete?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    connect?: WorkLogWhereUniqueInput | WorkLogWhereUniqueInput[]
    update?: WorkLogUpdateWithWhereUniqueWithoutElfInput | WorkLogUpdateWithWhereUniqueWithoutElfInput[]
    updateMany?: WorkLogUpdateManyWithWhereWithoutElfInput | WorkLogUpdateManyWithWhereWithoutElfInput[]
    deleteMany?: WorkLogScalarWhereInput | WorkLogScalarWhereInput[]
  }

  export type ElfCreateNestedOneWithoutWorkLogsInput = {
    create?: XOR<ElfCreateWithoutWorkLogsInput, ElfUncheckedCreateWithoutWorkLogsInput>
    connectOrCreate?: ElfCreateOrConnectWithoutWorkLogsInput
    connect?: ElfWhereUniqueInput
  }

  export type ElfUpdateOneRequiredWithoutWorkLogsNestedInput = {
    create?: XOR<ElfCreateWithoutWorkLogsInput, ElfUncheckedCreateWithoutWorkLogsInput>
    connectOrCreate?: ElfCreateOrConnectWithoutWorkLogsInput
    upsert?: ElfUpsertWithoutWorkLogsInput
    connect?: ElfWhereUniqueInput
    update?: XOR<XOR<ElfUpdateToOneWithWhereWithoutWorkLogsInput, ElfUpdateWithoutWorkLogsInput>, ElfUncheckedUpdateWithoutWorkLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ReportCreateWithoutChildInput = {
    id?: string
    type: string
    description: string
    mediaUrl?: string | null
    timestamp?: Date | string
    lat?: number | null
    lng?: number | null
    locationName?: string | null
    reporter?: ElfCreateNestedOneWithoutReportsInput
  }

  export type ReportUncheckedCreateWithoutChildInput = {
    id?: string
    type: string
    description: string
    mediaUrl?: string | null
    timestamp?: Date | string
    lat?: number | null
    lng?: number | null
    locationName?: string | null
    reporterId?: string | null
  }

  export type ReportCreateOrConnectWithoutChildInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutChildInput, ReportUncheckedCreateWithoutChildInput>
  }

  export type ReportCreateManyChildInputEnvelope = {
    data: ReportCreateManyChildInput | ReportCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type ReportUpsertWithWhereUniqueWithoutChildInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutChildInput, ReportUncheckedUpdateWithoutChildInput>
    create: XOR<ReportCreateWithoutChildInput, ReportUncheckedCreateWithoutChildInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutChildInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutChildInput, ReportUncheckedUpdateWithoutChildInput>
  }

  export type ReportUpdateManyWithWhereWithoutChildInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutChildInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    type?: StringFilter<"Report"> | string
    description?: StringFilter<"Report"> | string
    mediaUrl?: StringNullableFilter<"Report"> | string | null
    timestamp?: DateTimeFilter<"Report"> | Date | string
    childId?: StringFilter<"Report"> | string
    lat?: FloatNullableFilter<"Report"> | number | null
    lng?: FloatNullableFilter<"Report"> | number | null
    locationName?: StringNullableFilter<"Report"> | string | null
    reporterId?: StringNullableFilter<"Report"> | string | null
  }

  export type ChildCreateWithoutReportsInput = {
    id?: string
    name: string
    age: number
    status: string
    location: string
    city: string
    country: string
    lat: number
    lng: number
    wishlist?: string | null
    behaviorScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildUncheckedCreateWithoutReportsInput = {
    id?: string
    name: string
    age: number
    status: string
    location: string
    city: string
    country: string
    lat: number
    lng: number
    wishlist?: string | null
    behaviorScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChildCreateOrConnectWithoutReportsInput = {
    where: ChildWhereUniqueInput
    create: XOR<ChildCreateWithoutReportsInput, ChildUncheckedCreateWithoutReportsInput>
  }

  export type ElfCreateWithoutReportsInput = {
    id?: string
    agentId: string
    name: string
    password: string
    status?: string
    points?: number
    level?: number
    title?: string
    lastActive?: Date | string
    createdAt?: Date | string
    avatarUrl?: string | null
    badges?: ElfCreatebadgesInput | string[]
    department?: string
    workLogs?: WorkLogCreateNestedManyWithoutElfInput
  }

  export type ElfUncheckedCreateWithoutReportsInput = {
    id?: string
    agentId: string
    name: string
    password: string
    status?: string
    points?: number
    level?: number
    title?: string
    lastActive?: Date | string
    createdAt?: Date | string
    avatarUrl?: string | null
    badges?: ElfCreatebadgesInput | string[]
    department?: string
    workLogs?: WorkLogUncheckedCreateNestedManyWithoutElfInput
  }

  export type ElfCreateOrConnectWithoutReportsInput = {
    where: ElfWhereUniqueInput
    create: XOR<ElfCreateWithoutReportsInput, ElfUncheckedCreateWithoutReportsInput>
  }

  export type ChildUpsertWithoutReportsInput = {
    update: XOR<ChildUpdateWithoutReportsInput, ChildUncheckedUpdateWithoutReportsInput>
    create: XOR<ChildCreateWithoutReportsInput, ChildUncheckedCreateWithoutReportsInput>
    where?: ChildWhereInput
  }

  export type ChildUpdateToOneWithWhereWithoutReportsInput = {
    where?: ChildWhereInput
    data: XOR<ChildUpdateWithoutReportsInput, ChildUncheckedUpdateWithoutReportsInput>
  }

  export type ChildUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    wishlist?: NullableStringFieldUpdateOperationsInput | string | null
    behaviorScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChildUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    age?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    wishlist?: NullableStringFieldUpdateOperationsInput | string | null
    behaviorScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElfUpsertWithoutReportsInput = {
    update: XOR<ElfUpdateWithoutReportsInput, ElfUncheckedUpdateWithoutReportsInput>
    create: XOR<ElfCreateWithoutReportsInput, ElfUncheckedCreateWithoutReportsInput>
    where?: ElfWhereInput
  }

  export type ElfUpdateToOneWithWhereWithoutReportsInput = {
    where?: ElfWhereInput
    data: XOR<ElfUpdateWithoutReportsInput, ElfUncheckedUpdateWithoutReportsInput>
  }

  export type ElfUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    badges?: ElfUpdatebadgesInput | string[]
    department?: StringFieldUpdateOperationsInput | string
    workLogs?: WorkLogUpdateManyWithoutElfNestedInput
  }

  export type ElfUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    badges?: ElfUpdatebadgesInput | string[]
    department?: StringFieldUpdateOperationsInput | string
    workLogs?: WorkLogUncheckedUpdateManyWithoutElfNestedInput
  }

  export type ReportCreateWithoutReporterInput = {
    id?: string
    type: string
    description: string
    mediaUrl?: string | null
    timestamp?: Date | string
    lat?: number | null
    lng?: number | null
    locationName?: string | null
    child: ChildCreateNestedOneWithoutReportsInput
  }

  export type ReportUncheckedCreateWithoutReporterInput = {
    id?: string
    type: string
    description: string
    mediaUrl?: string | null
    timestamp?: Date | string
    childId: string
    lat?: number | null
    lng?: number | null
    locationName?: string | null
  }

  export type ReportCreateOrConnectWithoutReporterInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput>
  }

  export type ReportCreateManyReporterInputEnvelope = {
    data: ReportCreateManyReporterInput | ReportCreateManyReporterInput[]
    skipDuplicates?: boolean
  }

  export type WorkLogCreateWithoutElfInput = {
    id?: string
    action: string
    description: string
    pointsEarned: number
    timestamp?: Date | string
  }

  export type WorkLogUncheckedCreateWithoutElfInput = {
    id?: string
    action: string
    description: string
    pointsEarned: number
    timestamp?: Date | string
  }

  export type WorkLogCreateOrConnectWithoutElfInput = {
    where: WorkLogWhereUniqueInput
    create: XOR<WorkLogCreateWithoutElfInput, WorkLogUncheckedCreateWithoutElfInput>
  }

  export type WorkLogCreateManyElfInputEnvelope = {
    data: WorkLogCreateManyElfInput | WorkLogCreateManyElfInput[]
    skipDuplicates?: boolean
  }

  export type ReportUpsertWithWhereUniqueWithoutReporterInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutReporterInput, ReportUncheckedUpdateWithoutReporterInput>
    create: XOR<ReportCreateWithoutReporterInput, ReportUncheckedCreateWithoutReporterInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutReporterInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutReporterInput, ReportUncheckedUpdateWithoutReporterInput>
  }

  export type ReportUpdateManyWithWhereWithoutReporterInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutReporterInput>
  }

  export type WorkLogUpsertWithWhereUniqueWithoutElfInput = {
    where: WorkLogWhereUniqueInput
    update: XOR<WorkLogUpdateWithoutElfInput, WorkLogUncheckedUpdateWithoutElfInput>
    create: XOR<WorkLogCreateWithoutElfInput, WorkLogUncheckedCreateWithoutElfInput>
  }

  export type WorkLogUpdateWithWhereUniqueWithoutElfInput = {
    where: WorkLogWhereUniqueInput
    data: XOR<WorkLogUpdateWithoutElfInput, WorkLogUncheckedUpdateWithoutElfInput>
  }

  export type WorkLogUpdateManyWithWhereWithoutElfInput = {
    where: WorkLogScalarWhereInput
    data: XOR<WorkLogUpdateManyMutationInput, WorkLogUncheckedUpdateManyWithoutElfInput>
  }

  export type WorkLogScalarWhereInput = {
    AND?: WorkLogScalarWhereInput | WorkLogScalarWhereInput[]
    OR?: WorkLogScalarWhereInput[]
    NOT?: WorkLogScalarWhereInput | WorkLogScalarWhereInput[]
    id?: StringFilter<"WorkLog"> | string
    elfId?: StringFilter<"WorkLog"> | string
    action?: StringFilter<"WorkLog"> | string
    description?: StringFilter<"WorkLog"> | string
    pointsEarned?: IntFilter<"WorkLog"> | number
    timestamp?: DateTimeFilter<"WorkLog"> | Date | string
  }

  export type ElfCreateWithoutWorkLogsInput = {
    id?: string
    agentId: string
    name: string
    password: string
    status?: string
    points?: number
    level?: number
    title?: string
    lastActive?: Date | string
    createdAt?: Date | string
    avatarUrl?: string | null
    badges?: ElfCreatebadgesInput | string[]
    department?: string
    reports?: ReportCreateNestedManyWithoutReporterInput
  }

  export type ElfUncheckedCreateWithoutWorkLogsInput = {
    id?: string
    agentId: string
    name: string
    password: string
    status?: string
    points?: number
    level?: number
    title?: string
    lastActive?: Date | string
    createdAt?: Date | string
    avatarUrl?: string | null
    badges?: ElfCreatebadgesInput | string[]
    department?: string
    reports?: ReportUncheckedCreateNestedManyWithoutReporterInput
  }

  export type ElfCreateOrConnectWithoutWorkLogsInput = {
    where: ElfWhereUniqueInput
    create: XOR<ElfCreateWithoutWorkLogsInput, ElfUncheckedCreateWithoutWorkLogsInput>
  }

  export type ElfUpsertWithoutWorkLogsInput = {
    update: XOR<ElfUpdateWithoutWorkLogsInput, ElfUncheckedUpdateWithoutWorkLogsInput>
    create: XOR<ElfCreateWithoutWorkLogsInput, ElfUncheckedCreateWithoutWorkLogsInput>
    where?: ElfWhereInput
  }

  export type ElfUpdateToOneWithWhereWithoutWorkLogsInput = {
    where?: ElfWhereInput
    data: XOR<ElfUpdateWithoutWorkLogsInput, ElfUncheckedUpdateWithoutWorkLogsInput>
  }

  export type ElfUpdateWithoutWorkLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    badges?: ElfUpdatebadgesInput | string[]
    department?: StringFieldUpdateOperationsInput | string
    reports?: ReportUpdateManyWithoutReporterNestedInput
  }

  export type ElfUncheckedUpdateWithoutWorkLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    lastActive?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    badges?: ElfUpdatebadgesInput | string[]
    department?: StringFieldUpdateOperationsInput | string
    reports?: ReportUncheckedUpdateManyWithoutReporterNestedInput
  }

  export type ReportCreateManyChildInput = {
    id?: string
    type: string
    description: string
    mediaUrl?: string | null
    timestamp?: Date | string
    lat?: number | null
    lng?: number | null
    locationName?: string | null
    reporterId?: string | null
  }

  export type ReportUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    reporter?: ElfUpdateOneWithoutReportsNestedInput
  }

  export type ReportUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportCreateManyReporterInput = {
    id?: string
    type: string
    description: string
    mediaUrl?: string | null
    timestamp?: Date | string
    childId: string
    lat?: number | null
    lng?: number | null
    locationName?: string | null
  }

  export type WorkLogCreateManyElfInput = {
    id?: string
    action: string
    description: string
    pointsEarned: number
    timestamp?: Date | string
  }

  export type ReportUpdateWithoutReporterInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
    child?: ChildUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ReportUncheckedUpdateWithoutReporterInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    childId?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportUncheckedUpdateManyWithoutReporterInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    childId?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WorkLogUpdateWithoutElfInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogUncheckedUpdateWithoutElfInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkLogUncheckedUpdateManyWithoutElfInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pointsEarned?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ChildCountOutputTypeDefaultArgs instead
     */
    export type ChildCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChildCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ElfCountOutputTypeDefaultArgs instead
     */
    export type ElfCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ElfCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FactoryStatsDefaultArgs instead
     */
    export type FactoryStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FactoryStatsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChildDefaultArgs instead
     */
    export type ChildArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChildDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReportDefaultArgs instead
     */
    export type ReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReportDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ElfDefaultArgs instead
     */
    export type ElfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ElfDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkLogDefaultArgs instead
     */
    export type WorkLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}