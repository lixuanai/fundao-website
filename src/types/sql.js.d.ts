declare module 'sql.js' {
  interface Database {
    run(sql: string, params?: any[]): Database;
    exec(sql: string, params?: any[]): QueryExecResult[];
    export(): Uint8Array;
    prepare(sql: string): Statement;
    close(): void;
  }

  interface Statement {
    run(...params: any[]): Statement;
    step(): boolean;
    get(): any;
    free(): void;
  }

  interface QueryExecResult {
    columns: string[];
    values: any[][];
  }

  interface SqlJsStatic {
    Database: new (data?: ArrayLike<number>) => Database;
  }

  function initSqlJs(config?: any): Promise<SqlJsStatic>;
  export default initSqlJs;
  export { Database, Statement, QueryExecResult, SqlJsStatic };
}
