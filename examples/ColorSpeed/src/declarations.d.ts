// Avoid auto-import of console. 
declare module 'console' {
  const _console: typeof import('console')
  export default _console;
}

// App wide types
declare type AppState =  import('./redux/reducers').RootReducerType;

declare type GenericAction = import('dense-redux-actions').GenericAction;

type SpeedUnit = 'km/h' | 'miles/h';