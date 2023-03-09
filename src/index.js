const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();
const port = 3210;
const db = require('./config/db')

//  method Override 
var methodOverride = require('method-override')
app.use(methodOverride('_method')) // override with POST having ?_method=DELETE

// fix don't read req.body when use method POST
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//connect mongodb
db.connect()
const routes = require('./routes');
// config get static file
app.use(express.static(path.join(__dirname, 'public')));
// HTTP logger
app.use(morgan("combined"));
//template engine
app.engine(
    '.hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
