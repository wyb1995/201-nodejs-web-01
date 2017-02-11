"use strict";

let request = require('supertest');
let express = require('express');
let should = require('should');
let app = require('../../app');

describe('cart-spec', () => {


  it('GET /carts', (done) => {
    request(app)
      .get('/carts')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(1);
      })
      .end(done)
  });

  it('GET /carts/:id', (done) => {
    request(app)
      .get('/carts/589950ce5a94250fe845b0aa')
      .expect(200)
      .expect((res) => {
        res.body.userId.should.equal(1)
      })
      .end(done)
  });

  it('POST /carts', (done) => {
    request(app)
      .post('/carts')
      .send({
        userId: 2
      })
      .expect(201)
      .end(done)
  });

  it('DELETE /carts/:id', (done) => {
    request(app)
      .delete('/carts/589950ce5a94250fe845b0aa')
      .expect(204)
      .end(done)
  });

  it('PUT /carts/:id', (done) => {
    request(app)
      .put('/carts/589950ce5a94250fe845b0aa')
      .send({
        userId: 3
      })
      .expect(204)
      .end(done)
  })
});