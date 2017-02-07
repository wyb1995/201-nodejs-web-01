"use strict";

let request = require('supertest');
let express = require('express');
let should = require('should');
let app = require('../../app');
let {refreshMongo} = require('../../mongoTool');

describe('category-spec', () => {
  beforeEach((done) => {
    refreshMongo();
    done();
  });

  it('GET /categories', (done) => {
    request(app)
      .get('/categories')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(1);
      })
      .end(done)
  });

  it('GET /categories/:id', (done)=> {
    request(app)
      .get('/categories/589950ce5a94250fe845b0f4')
      .expect(200)
      .expect((res)=> {
        res.body.name.should.equal('fruit');
      })
      .end(done)
  })

  it('POST /categories', (done)=> {
    request(app)
      .post('/categories')
      .send({
        name: "vegetable"
      })
      .expect(201)
      .end(done)
  });

  it('DELETE /categories/:id', (done)=> {
    request(app)
      .delete('/categories/589950ce5a94250fe845b0f4')
      .expect(403)
      .end(done);
  });

  it('PUT /categories/:id', (done)=> {
    request(app)
      .put('/categories/589950ce5a94250fe845b0f4')
      .send({
        name: "vegetable"
      })
      .expect(204)
      .end(done);
  });
});