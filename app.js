/*
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db',
    logging: false // disable logging
});

// Movie model: initializes a model representing a 'Movies' table in the database, with one column: 'title'.
class Movie extends Sequelize.Model {}

//Movie.init() defines a new table in the database with the name 'Movies'. Sequelize will look for information in the Movies table.
//Sequelize uses a library called inflection under the hood to automatically pluralize the table name (for example, from Movie to Movies)
Movie.init({
    title: Sequelize.STRING
}, { sequelize }); // same as { sequelize: sequelize } < Only required option
*/

const db = require('./db');
const { Movie } = db.models;

// async IIFE
(async () => {
        // await sequelize.authenticate();
        // console.log('Connection to the database successful!');
        // Sync 'Movies' table
        // await Movie.sync();
        // Sync all tables
        await db.sequelize.sync({ force: true });//refresh/synchronize your database tables each time you start your app
        //Calling sync({ force: true }) issues a DROP TABLE IF EXISTS statement, which completely deletes the table, before issuing the CREATE TABLE IF NOT EXISTS statement. 
        
    try {
        // Instance of the Movie class represents a database row
        // const movie = await Movie.create({ title: 'Toy Story' });
        // console.log(movie.toJSON());
        // the Promise.all() method waits until all promises returned by the model .create() method are fulfilled
        const movieInstances = await Promise.all(
            [
                Movie.create({title: 'Toy Story', runtime: 81, releaseDate: '1995-11-22', isAvailableOnVHS: true}),        
                Movie.create({title: 'The Incredibles', runtime: 115, releaseDate: '2004-04-14', isAvailableOnVHS: true}),
                Movie.create({title: 'Sin City', runtime: 147, releaseDate: '2005-04-14', isAvailableOnVHS: true}),
                Movie.create({title: 'Job Hunt', runtime: 31, releaseDate: '1896-04-14', isAvailableOnVHS: true})
            ]
        );  
        const moviesJson = movieInstances.map((movie)=>movie.toJSON());
        console.log(moviesJson);

    } catch (error) {
        //console.error('Error connecting to the database: ', error);
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        } else {
            throw error;
        }
    }
})();