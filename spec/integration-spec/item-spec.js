let request = require('supertest');
let express = require('express');
let should = require('should');
let app = require('../../app');
let refreshMongo = require('../../refreshMongo');

describe('item-spec', ()=> {
    beforeEach(()=> {
        refreshMongo();
    });

    it('GET /items', (done)=> {
        request(app)
            .get('/items')
            .expect(200)
            .expect((res)=> {
                res.body.totalCount.should.equal(1);
                res.body.items.length.should.equal(1);
            })
            .end(done);
    })
});