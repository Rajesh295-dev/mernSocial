const { format_date, format_time } = require('./formatDate')

// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
    const fgCyan = '\x1b[36m';
    switch (req.method) {
        case 'GET': {
            console.info(`📗 ${fgCyan}${req.method} request to ${req.path} on ${format_date(Date.now())} `);
            break;
        }
        case 'POST': {
            console.info(`📘 ${fgCyan}${req.method} request to ${req.path} on ${format_date(Date.now())} `);
            break;
        }
        default:
            console.log(`📙${fgCyan}${req.method} request to ${req.path} on ${format_date(Date.now())} `);
    }

    next();
};

exports.clog = clog;
