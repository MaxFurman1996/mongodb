const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {

    let max, alex, john, walter;
    beforeEach((done) => {
        max = new User({ name: 'Max'});
        alex = new User({ name: 'Alex'});
        john = new User({ name: 'John'});
        walter = new User({ name: 'Walter'})

        Promise.all([max.save(), alex.save(), john.save(), walter.save()])
            .then(() => done());
    })

    it('find all users with a name of Max', (done) => {
        User.find({ name: 'Max'})
            .then((users) => {
                assert(users[0]._id.toString() === max._id.toString());
                done();
            })
    })

    it('find all users with a particular Id', (done) => {
        User.findOne({ _id: max._id})
            .then((user) => {
                assert(user.name === 'Max');
                done();
            })
    })

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'John');
                assert(users[1].name === 'Max');
                done();
            })
    })
})