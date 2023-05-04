const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Person extends Sequelize.Model {}
    Person.init({

        firstName: {
            type: Sequelize.STRING,
            allowNull: false, // disallow null
            validate: { 
                notEmpty: { msg: 'Please provide a value for "firstName"', },
                notNull: { msg: 'Please provide a value for "firstName"', },
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false, // disallow null
            validate: { 
                notEmpty: { msg: 'Please provide a value for "lastName"', },
                notNull: { msg: 'Please provide a value for "lastName"', },
            }
        },


    }, {
        sequelize
    });

    return Person;
};