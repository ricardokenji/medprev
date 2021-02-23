import log4js from 'log4js'

log4js.addLayout('json', function (config) {
    return function (logEvent) {
        return JSON.stringify({
            timestamp: logEvent.startTime.toISOString(),
            level: logEvent.level.levelStr,
            level_value: logEvent.level.level,
            app_name: process.env.APP_NAME,
            app_environment: process.env.APP_ENVIRONMENT,
            customMessage: logEvent.data.join(' '),
        })
    }
})

log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'coloured',
            }
        },
    },
    categories: {
        default: { appenders: ['out'], level: 'info' },
    }
})

const logger = log4js.getLogger()
logger.level = 'debug'

export default logger