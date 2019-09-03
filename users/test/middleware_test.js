const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middlware', () => {
  let max, blogPost;

    beforeEach((done) => {
        max = new User({ name: 'Max' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

        max.blogPosts.push(blogPost);
        
        Promise.all([max.save(), blogPost.save()])
            .then(() => done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        max.remove()
            .then(() => BlogPost.countDocuments())
            .then((count) => {
                assert(count === 0);
                done();
        });
    });
});