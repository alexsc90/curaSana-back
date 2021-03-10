require('dotenv').config();
const express      = require('express');
const cors         = require('cors');

require('./configs/db.config')

const app = express();


app.use(cors());

app.use(express.json({extended:true}))


// default value for title local
app.locals.title = 'CuraSana Api';



const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth.routes')
app.use('/api', auth)

const order = require('./routes/orders.routes')
app.use('/api', order)

const user = require('./routes/users.routes');
app.use ('/api', user);

const product = require('./routes/products.routes');
app.use('/api', product)


module.exports = app;
