import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import {
    require
} from 'app-root-path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Define port
const port = process.env.PORT || 4200;

// Define app
const app = express();

// Middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views/'));

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API for Lyrics and Playlists',
        },
        servers: [{
            url: `http://localhost:${port}`
        }],
    },
    apis: ['./routes/*.js'], // Files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', require('./routes/index'));
app.use('/lyrics', require('./routes/lyrics'));
app.use('/lyricsit', require('./routes/lyricsit'));
app.use('/lyricsc', require('./routes/lyricsC'));
app.use('/playlists', require('./routes/playlists'));
app.use('/state', require('./routes/appState'));

// Start server
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/api`);
    console.log(`API docs available at http://localhost:${port}/api-docs`);
});

module.exports = app;