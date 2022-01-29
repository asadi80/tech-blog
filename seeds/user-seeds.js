const { User } = require('../models');

const userData = [
    {
        username: 'Rafi',
        email: 'rafi@uc.com',
        password: 'rafi1234'

    },
    {
        username: 'Ali',
        email: 'ali@uc.com',
        password: 'ali1234'
    },
    {
        username: 'Rofa',
        email: 'rofa@uc.com',
        password: 'rofa1234'
    },
    {
        username: 'John',
        email: 'john@uc.com',
        password: 'john1234'

    },
    {
        username: 'Jake',
        email: 'jake@uc.com',
        password: 'jake1234'
    },
    {
        username: 'Joe',
        email: 'joe@uc.com',
        password: 'joe1234'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;