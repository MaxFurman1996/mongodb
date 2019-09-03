const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
    it('POST to /api/drivers creates a new driver', (done) => {
        Driver.countDocuments().then(count => {
            request(app)
                .post('/api/drivers')
                .send({ email: 'test@test.com' })
                .end((err, response) => {
                    Driver.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    }) 
                });
        })
        
    });

    it('PUT to /api/drivers/:id edits an existing driver', (done) => {
        const driver = new Driver({ email: 't@t.com', driving: false});
        driver.save().then(() => {
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({ driving: true })
                .end(() => {
                    Driver.findOne({ email: 't@t.com'})
                        .then(driver => {
                            assert(driver.driving === true);
                            done();
                        })
                }); 
        })
    });


    it('DELETE to /api/drivers/:id delete an existing driver', (done) => {
        const driver = new Driver({ email: 't@t.com'});
        driver.save().then(() => {
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(() => {
                    Driver.findOne({ email: 't@t.com'})
                        .then(driver => {
                            assert(driver === null);
                            done();
                        })
                }); 
        })
    });

    it('GET to /api/drivers/ finds drivers in a location', (done) => {
        const driver1 = new Driver({ 
            email: 'city1@t.com',
            geometry: { type: 'Point', coordinates: [-122, 48]}
        });
        const driver2 = new Driver({ 
            email: 'city2@t.com',
            geometry: {type: 'Point', coordinates: [-80, 26]}
        });
        Promise.all([driver1.save(), driver2.save()])
            .then(() =>{
                request(app)
                    .get('/api/drivers?lng=-80.01&lat=26.1')
                    .end((err, response) => {
                        assert(response.body.length === 1);
                        assert(response.body[0].email === 'city2@t.com')
                        done();
                    }) 
            })
    });
});