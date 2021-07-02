const chalk = require('chalk');
const { PORT, HOST } = require('./config');
const app = require('./app');

const http = require('http');


app.listen(PORT, HOST, () => console.log(chalk.blue(`Server started @ http://${HOST}:${PORT}/`)));
