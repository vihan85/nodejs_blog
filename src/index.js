const express = require('express');
const morgan = require('morgan');
const path = require('path')
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const dataMongo = require('./data')
const routes = require("./routes")
// config get static file
app.use(express.static(path.join(__dirname, 'public')))
// HTTP logger
app.use(morgan('combined'));
//template engine
app.engine('.hbs', handlebars.engine({
  extname: ".hbs"
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app)

app.listen(port, () => {
  dataMongo()
  console.log(`Example app listening on port ${port}`)
})
