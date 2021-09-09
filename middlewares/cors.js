
const corsOrigin = (req, callback) => {
    const allowedOrigins = ['http://localhost:3001', 'http://127.0.0.1:3001'];
    const origin = req.headers.origin;
    let corsOptions;
    if(allowedOrigins.includes(origin)){
        corsOptions = {origin: true}
    } else {
        corsOptions = {origin: false}
    }
    callback(null, corsOptions);
}

module.exports = corsOrigin;