const { Post } = require('../models');

const postData = [
    {
        title: 'Lorem Ipsum I',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user_id: 1

    },
    {
        title: 'Lorem Ipsum II',
        content: 'Amet aliquam id diam maecenas ultricies mi eget mauris pharetra.',
        user_id: 2
    },
    {
        title: 'Lorem Ipsum III',
        content: 'Ut etiam sit amet nisl purus in mollis.',
        user_id: 3
    },
    {
        title: 'Lorem Ipsum 4I',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user_id: 4

    },
    {
        title: 'Lorem Ipsum 5I',
        content: 'Amet aliquam id diam maecenas ultricies mi eget mauris pharetra.',
        user_id: 5
    },
    {
        title: 'Lorem Ipsum 6I',
        content: 'Ut etiam sit amet nisl purus in mollis.',
        user_id: 6
    }

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;