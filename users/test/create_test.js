const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const max = new User({ name: 'Max' });
        max.save()
            .then(() => {
                assert(!max.isNew);
                done(); 
            })
    })
});

