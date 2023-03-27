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

// custom middle ware
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const authFormMiddleware = require('./app/middlewares/authFormMisdleware')
app.use(SortMiddleware)
app.use(authFormMiddleware)

//template engine / cònig healper
app.engine(
    '.hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sort: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default' 
                const icons = {
                    default: 'oi oi-elevator',
                    asc: "oi oi-sort-ascending",
                    desc: "oi oi-sort-descending"
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[sortType]
                const type = types[sortType]
                return `<a href="?_sort&column=${field}&type=${type}">
                        <span class='${icon}'></span>
                </a>`
            }
        }
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
