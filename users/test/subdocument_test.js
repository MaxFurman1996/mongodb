const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const post = {
            title: 'PostTitle',
            content: 'SomeContent'
        } 
        const max = new User({
            name: 'Max',
            posts: [post]
        });

        max.save()
            .then(() => User.findOne({ name: 'Max' }))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                assert(user.posts[0].content === 'SomeContent');
                done();
        });
    });

    it('Can add subdocuments to an existing record', (done) => {
        const max = new User({
            name: 'Max',
            posts: []
        });

        max.save()
            .then(() => User.findOne({ name: 'Max' }))
            .then((user) => {
                user.posts.push({ title: 'New Post' , content: 'SomeContent', date: Date.now });
                return user.save();
            })
            .then(() => User.findOne({ name: 'Max' }))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                assert(user.posts[0].content === 'SomeContent');
                done();
        });
    });

    it('can remove an existing subdocument', (done) => {
    const max = new User({
      name: 'Max',
      posts: [{ title: 'New Post' , content: 'SomeContent', date: Date.now }]
    });

    max.save()
        .then(() => User.findOne({ name: 'Max' }))
        .then((user) => {
            const post = user.posts[0];
            post.remove();
            return user.save();
        })
        .then(() => User.findOne({ name: 'Max' }))
        .then((user) => {
            assert(user.posts.length === 0);
            done();
        });
    });
});