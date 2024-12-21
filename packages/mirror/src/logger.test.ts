import { logger, LOG_LEVELS } from './logger';

const main = () => {
	const log = logger();

	log.setLogLevel(LOG_LEVELS.L4_DEBUG);
	log.setSilent(false);

	log.error('error');
	log.warn('warn');
	log.log('log');
	log.info('info');
	log.debug('debug');

	log.logStyledString('THE STRING', { foo: 213 });

	log.customLog(console.table, LOG_LEVELS.L2_LOG, {
		foo: 123,
		bar: 'fdsafas'
	});
};
main();
