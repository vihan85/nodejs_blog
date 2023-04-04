const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require("cookie-parser");

const app = express();
const port = 3210;
const db = require('./config/db')

//config variable enviroment 
require('dotenv').config();

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
app.use(cookieParser());

// custom middle ware
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const authFormMiddleware = require('./app/middlewares/authFormMisdleware')
const authMiddleware = require('./app/middlewares/authMiddleware')
const authLogin = require('./app/controllers/authController')
app.use(SortMiddleware)
app.use(authFormMiddleware)
app.use('/myPage',authMiddleware,authFormMiddleware)
app.use('/personal/cart',authMiddleware,authFormMiddleware)
//template engine / config healper
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
// routes

// socket 
const cors = require('cors');
const http = require('http');
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
app.use(cors());

io.on('connection', (socket) => {
    socket.on("disconnect", function()
        {
            console.log('Disconnected');
        });
         //server lắng nghe dữ liệu từ client
    socket.on("Client-sent-data", function(data)
        {
            //sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
            console.log('a user connected');
            socket.emit("Server-sent-data", data);

        });
});
routes(app);

server.listen(3210, () => {
    console.log('listening on *:3211');
    
});

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

