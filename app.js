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
                Movie.create({title: 'Toy Story'}),        
                Movie.create({title: 'The Incredibles'}),
                Movie.create({title: 'The Sin City'})
            ]
        );  
        const moviesJson = movieInstances.map((movie)=>movie.toJSON());
        console.log(moviesJson);

    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();