// GET APP  

const app = require("./app");

// SET PORT 

app.set('port', process.env.PORT  || 3000);

// RUN SERVER

const server = app.listen(app.get('port'), () => {
    console.log(`Server listen in port: ${ server.address().port }`);
});