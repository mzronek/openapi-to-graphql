import debugPkg from 'debug'

const { debug: origDebug } = debugPkg;

export type LogFunction = (message?: string, ...optionalParams: any[]) => void;

export interface DebugOptions {
  customLog?: LogFunction;
  customError?: LogFunction;
}

let debugOptions: DebugOptions = {};
let debugObjs: any[] = [];

export function setDebugOptions(options: DebugOptions) {
  debugOptions = options;

  debugObjs.forEach(obj => {
    if (options.customLog) {
      obj.log = options.customLog;
    }

    if (options.customError) {
      obj.error = options.customError;
    }
  })
}

export function debug(config: string): any {
  const debug = origDebug(config);

  if (debugOptions.customLog) {
    debug.log = debugOptions.customLog;
  }

  if (debugOptions.customError) {
    debug.error = debugOptions.customError;
  }

  debugObjs.push(debug);

  return debug;
}