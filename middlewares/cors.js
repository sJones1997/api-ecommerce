
const corsOrigin = (req, callback) => {
    const allowedOrigins = ['http://localhost:3000','http://127.0.0.1:3000'];
    const origin = req.headers.origin;
    let corsOptions;
    if(allowedOrigins.includes(origin)){    
        corsOptions = {origin: true, methods: ['GET', 'PUT', 'POST', 'DELETE'], allowedHeaders: ['Content-Type', 'authorization'] }
    } else {
        corsOptions = {origin: false}
    }
    callback(null, corsOptions);
}

module.exports = corsOrigin;