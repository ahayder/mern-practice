import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(
	() => {
		console.log("connected");
	},
	(err) => {
		console.log(err);
	}
);
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MnogoDB database connection established successfully");
},
(err) => {
	console.log(err);
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
	console.log('Server is running on port:', port);
});