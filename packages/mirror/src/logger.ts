export const LOG_LEVELS = {
	L0_ERROR: 0,
	L1_WARN: 1,
	L2_LOG: 2,
	L3_INFO: 3,
	L4_DEBUG: 4,
} as const;

const LOG_FUNCTIONS = {
	[LOG_LEVELS.L0_ERROR]: console.error,
	[LOG_LEVELS.L1_WARN]: console.warn,
	[LOG_LEVELS.L2_LOG]: console.log,
	[LOG_LEVELS.L3_INFO]: console.info,
	[LOG_LEVELS.L4_DEBUG]: console.debug,
} as const;

type CONSOLE_FUNCTION = Console[keyof Console];

type LOG_LEVELS = typeof LOG_LEVELS;
type LOG_LEVELS_KEYS = keyof LOG_LEVELS;
type LOG_LEVELS_VALUES = LOG_LEVELS[LOG_LEVELS_KEYS]

const LOG_STYLE: `${string}: ${string}`[] = [
	'font-size: 1.5rem',
	'color: white',
	'background-color: black',
	'padding: 0.5em',
	'border-radius: 0.3em',
];
const LOG_STYLE_STRING = LOG_STYLE.join(';');

export const logger = () => {
	const _state = {
		silent: false,
		logLevel: LOG_LEVELS.L4_DEBUG as LOG_LEVELS_VALUES,
	};

	const _logUpToLevel = (logLevelLimit: LOG_LEVELS_VALUES, loggingFunction = LOG_FUNCTIONS[logLevelLimit]) =>
		<T extends unknown[]>(...args: T) => {
			if (_state.logLevel >= logLevelLimit && !_state.silent) {
				loggingFunction(...args);
			}
		};

	const obj = {
		error: _logUpToLevel(LOG_LEVELS.L0_ERROR),
		warn: _logUpToLevel(LOG_LEVELS.L1_WARN),
		log: _logUpToLevel(LOG_LEVELS.L2_LOG),
		info: _logUpToLevel(LOG_LEVELS.L3_INFO),
		debug: _logUpToLevel(LOG_LEVELS.L4_DEBUG),

		setSilent(silent: boolean) {
			_state.silent = silent;
		},
		setLogLevel(logLevel: LOG_LEVELS_VALUES) {
			_state.logLevel = logLevel;
		},

		logStyledString: <T extends unknown[]>(str: string, ...args: T) => {
			_logUpToLevel(LOG_LEVELS.L2_LOG)('%c%s', LOG_STYLE_STRING, str, ...args);
		},

		customLog<T extends unknown[]>(
			loggingFunction: CONSOLE_FUNCTION,
			logLevelLimit: LOG_LEVELS_VALUES,
			...args: T
		) {
			_logUpToLevel(logLevelLimit, loggingFunction)(...args);
		},
	};

	return obj;
};
