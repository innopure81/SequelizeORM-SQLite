const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Movie extends Sequelize.Model {}
    Movie.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true       
        }, 
        uuid: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV1,
            primaryKey: false
        },      
        title: {
            type: Sequelize.STRING,
            allowNull: false, // disallow null
            validate: { 
                notEmpty: {
                // custom error message (<-> notEmpty: true,)
                    msg: 'Please provide a value for "title"',   
                },
                notNull: {
                    msg: 'Please provide a value for "title"',
                },
            }
        },
        runtime: {
            type: Sequelize.INTEGER,
            allowNull: false, // disallow null
            validate: {
                notNull: { msg: 'Please provide a value for "runtime"'},
                min: { args: 31, msg: 'Please provide a value greater than "30" for "runtime"' },
            },
        },
        releaseDate: {
            type: Sequelize.DATEONLY,
            allowNull: false, // disallow null
            validate: {
                notNull: { msg: 'Please provide a value for "releaseDate"'},
                isAfter: { args: '1895-12-27', msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"' },
            },
        },
        isAvailableOnVHS: {
            type: Sequelize.BOOLEAN,
            allowNull: false, // disallow null
            defaultValue: false, // set the flag to false by default
        }
    }, { 
            //timestamps: false, 
            //freezeTableName: true, // disable plural table names
            //tableName: 'my_movies_table', // table name change
            sequelize 
    });

    return Movie;
};