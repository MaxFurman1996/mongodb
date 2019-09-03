const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let max;

    beforeEach( done => {
        max = new User({ name: 'Max', likes: 0})
        max.save()
            .then(() => done());
    })

    function assertName(operation, done){
        operation
            .then(() => User.find({ name: 'John'}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'John');
                done();
            })
    }

    it('instance type using set and save', (done) => {
        max.set('name', 'John');
        assertName(max.save(), done);
    })

    it('A model instance can update', done => {
        assertName(max.updateOne({ name: 'John'}), done)
    })

    it('A model class can update', (done) => {
        assertName(
          User.updateOne({ name: 'Max' }, { name: 'John' }),
          done
        );
    });
    
    it('A model class can update one record', (done) => {
        assertName(
          User.findOneAndUpdate({ name: 'Max' }, { name: 'John' }, { useFindAndModify: false}),
          done
        );
    });
    
    it('A model class can find a record with an Id and update', (done) => {
        assertName(
          User.findByIdAndUpdate(max._id, { name: 'John' }, { useFindAndModify: false}),
          done
        );
    });
    
    it('A user can have their likes incremented by 1', (done) => {
        User.updateOne({ name: 'Max' }, { $inc: { likes: 1 }})
            .then(() => User.findOne({ name: 'Max'}))
            .then((user) => {
                assert(user.likes === 1);
                done();
            })
    });
})