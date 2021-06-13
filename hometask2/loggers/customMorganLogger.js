const morgan = require('morgan');

morgan.token('reqParams', (req, _res)=>{
    return req.params?  JSON.stringify(req.params) : '_';
});
morgan.token('reqBody', (req, _res)=>{
    return req.body ? JSON.stringify(req.body): '_';
});

const getMorganLogger = ()=>{
    return morgan(':method :url :reqParams :reqBody');
}

module.exports = getMorganLogger;