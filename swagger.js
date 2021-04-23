const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "My API",
        description: "Description"
    },
    host: "localhost:3000/auth",
    schemes: ['http'],
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "headers"
        }
    }
}


const outputFile = './swagger-output.json'
const endpointsFiles = ['./routes/authRout.js', './Controllers/authController.js']

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')           // Your project's root file
})