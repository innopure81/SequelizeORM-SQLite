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
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

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
                Movie.create({title: 'Toy Story', runtime: 81, releaseDate: '1995-11-22', isAvailableOnVHS: false}),        
                Movie.create({title: 'The Incredibles', runtime: 115, releaseDate: '2004-04-14', isAvailableOnVHS: true}),
                Movie.create({title: 'Sin City', runtime: 147, releaseDate: '2005-04-14', isAvailableOnVHS: true}),
                Person.create({firstName: 'Mickey', lastName: 'Rourke'}),
            ]
        );  
        const moviesJson = movieInstances.map((movie)=>movie.toJSON());
        console.log(moviesJson);

        const movie3 = Movie.build({title: 'Toy Story 3', runtime: 103, releaseDate: '2010-06-18', isAvailableOnVHS: false,});
        movie3.title = 'Updated Title';
        await movie3.save();
        console.log("movie3: ", movie3.toJSON());

        const personById = await Person.findByPk(1);
        console.log("personById: ", personById.toJSON());

        const movieByRelease = await Movie.findOne({ attributes: ['title'], where: {releaseDate: {[Op.gte]: '2005-01-01'}} });
        console.log("movieByRelease: ", movieByRelease.toJSON());

        // const movies = await Movie.findAll();
        // console.log( movies.map(movie => movie.toJSON()) );

        const shortMovies = await Movie.findAll({
            attributes: ['id', 'title'],
            where: {
                title: {
                    [Op.endsWith]: 'y'
                },
                releaseDate: {                   
                    [Op.gte]: '1995-01-01', // greater than or equal to the date
                },
                runtime: {
                    [Op.between]: [75, 160],
                    //[Op.gt]: 95, // greater than 95
                },
            },
            //order: [['id', 'DESC']] // IDs in descending order (Big to Small)
            //order: [['releaseDate', 'ASC']], // dates in ascending order (Old to New)
            order: [['createdAt', 'DESC']],
        });
          // SELECT * FROM Movies WHERE runtime = 92 AND isAvailableOnVHS = true;
        console.log("shortMovies: ", shortMovies.map(movie => movie.toJSON()) );

        const toyStory1 = await Movie.findByPk(1);
        //toyStory1.isAvailableOnVHS = true;
        await toyStory1.update({ isAvailableOnVHS: true, title: 'Tory Story NEW', }, { fields: ['title','isAvailableOnVHS'] });
        await toyStory1.save();

        console.log( "toyStory1: ", toyStory1.get({ plain: true }) );
        
        await toyStory1.destroy();
        const movies = await Movie.findAll();
        console.log( movies.map(movie => movie.toJSON()) );

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

