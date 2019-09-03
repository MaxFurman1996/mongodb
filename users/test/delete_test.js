const assert = require('assert');
const User = require('../src/user')

describe('Deleting a user', () => {
    let max;
    beforeEach((done) => {
        max = new User({ name: 'Max'})
        max.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        max.remove()
            .then(() => User.findOne({ name: 'Max'}))
            .then((user) => {
                assert(user === null);
                done();
            })
    });

    it('class method remove', (done) => {
        User.deleteOne({ name: 'Max'})
            .then(() => User.findOne({ name: 'Max'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findAndRemove', (done) => {
        User.findOneAndRemove({ name: 'Max'}, { useFindAndModify: false})
            .then(() => User.findOne({ name: 'Max'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(max._id, { useFindAndModify: false})
            .then(() => User.findOne({ name: 'Max'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});