const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const max = new User({
        name: 'Max',
        posts: [{ title: 'PostTitle' }]
        });

        max.save()
            .then(() => User.findOne({ name: 'Max' }))
            .then((user) => {
                assert(max.postCount === 1);
                done();
            });
    });
});