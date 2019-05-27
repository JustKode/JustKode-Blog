let server;
if (process.browser) {
    server = 'http://api.localhost'
} else {
    server = 'http://backend:8000'
}

export const apiServer = server
export const staticServer = 'http://api.localhost'