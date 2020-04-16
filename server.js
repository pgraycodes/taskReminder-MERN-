const express = require('express');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require ('morgan')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp= require('hpp');
const cors= require('cors');




// Load env vars
dotenv.config({ path: './config/config.env' });

//connect 2 DB isolated connection operation
connectDB();

//Route Files
const auth = require ('./routes/auth');
const reminders = require('./routes/reminders');

const app = express();


app.use(express.json());
app.use(cookieParser());

//sanitize data prevent {"$gt" :""}
app.use(mongoSanitize());

//security headers for dns headers etc
app.use(helmet());

//prevent xss attacks injecting html etc
app.use(xss());

//rate limit request
const limiter = rateLimit({
windowMs: 10 * 60 * 1000,
max: 10
});

app.use(limiter);

// prevent http param polution
app.use(hpp());

//enable cors 
app.use(cors());

//MOUNT ROUTERS
app.use('/api/v1/auth', auth);
app.use('/api/v1/reminders', reminders);


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    // server.close(() => process.exit(1));
  });




//removed to connect to db atlas/compass via connection URI string
////////////////////////////////////////////////////////////
// //MONGODB connection String and db creation
// mongoose.connect('mongodb://localhost:27017/task_reminder_db',
// {useNewUrlParser : true,
// useUnifiedTopology: true},
//     ()=>{
//     console.log('successfully connected to database');
// });


// app.listen(5000,()=>{
//     console.log('express server started');
// });

