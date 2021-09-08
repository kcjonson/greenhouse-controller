/* eslint-disable no-undef */

import winston from 'winston';
const createLogger = winston.createLogger;
const transports = winston.transports;
const format = winston.format;


const LOG_LOCATION = process.env.LOG_LOCATION || './logs';

const printConsole = format.printf((info) => {
	let log = `${info.level}: ${info.message}`;
	if (info.stack) {
		const splitStack = info.stack.split('\n');
		splitStack.splice(0,1);
		log += `\n${splitStack.join('\n')}`;
	}
	return log;
});

const config = {
	file: {
		location: LOG_LOCATION,
		handleExceptions: true,
		level: 'info',
		maxsize: 5242880, // 5MB
		maxFiles: 5,
	},
	console: {
		level: 'debug',  // Note: Level includes all levels above it, this is "lowest level";
		format: format.combine(
			format.errors({ stack: true }), // <-- use errors format
			format.colorize(),
			printConsole,
		),
	},
};



// Server Logger (app health)

const logger = createLogger({
	transports: [
		new transports.File({
			...config.file,
			level: 'error',
			format: format.json(),
			filename: `${config.file.location}/error.log`,
		}),
		new transports.File({
			...config.file,
			format: format.json(),
			filename: `${config.file.location}/combined.log`,
		}),
	],

});

// TODO: test if logger is actually writing to files properly in prod, then turn off the console
//if (process.env.NODE_ENV !== 'production') {
logger.add(new transports.Console(config.console));
//}

export default logger;



// Request Logger

export const requestLogger = createLogger({
	transports: [
		new transports.File({
			...config.file,
			format: format.logstash(),
			filename: `${config.file.location}/access.log`,
		}),
	],
	exitOnError: false,
});
if (process.env.NODE_ENV !== 'production') {
	requestLogger.add(new transports.Console(config.console));
}

requestLogger.stream = {
	write: function(message/*, encoding*/) {
		requestLogger.info(message.replace(/^\n|\n$/g, ''));
	},
};


