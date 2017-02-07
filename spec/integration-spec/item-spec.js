let request = require('supertest');
let express = require('express');
let should = require('should');
let app = require('../../app');
let {refreshMongo} = require('../../mongoTool');

describe('item-spec', () => {
  beforeEach((done) => {
    refreshMongo();
    done();
  });

  it('GET /items', (done) => {
    request(app)
      .get('/items')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(1);
      })
      .end(done);
  });

  it('GET /items/:id', (done) => {
    request(app)
      .get('/items/589950ce5a94250fe845b0dd')
      .expect(200)
      .expect((res)=> {
        res.body.name.should.equal('apple');
        res.body.price.should.equal('10');
        res.body.categoryId._id.should.equal('589950ce5a94250fe845b0f4')
      })
      .end(done);
  });

  it('POST /items', (done)=> {
    request(app)
      .post('/items')
      .send({
        name: "banana",
        price: "12",
        categoryId: "589950ce5a94250fe845b0f4"
      })
      .expect(201)
      .end(done)
  });

  it('DELETE /items/:id', (done)=> {
    request(app)
      .delete('/items/589950ce5a94250fe845b0dd')
      .expect(204)
      .end(done)
  });

  it('PUT /items/:id', (done)=> {
    request(app)
      .put('/items/589950ce5a94250fe845b0dd')
      .send({
        name: "banana"
      })
      .expect(204)
      .end(done)
  });
});