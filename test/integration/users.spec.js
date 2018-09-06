/*
 * Testing the user api
 *
 * Five functionalities to test:
 *  - Create account
 *  - Login account
 *  - Logout account
 *  - Get account details
 *  - Delete account
 *
 * Notes:
 *  Mocha does not auto exit process v4+
 */

const server = require('../../server');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('User API Tests', () => {

  describe('Account Creation', () => {
    it('should create an account when provided valid details', (done) =>
      request(server)
      .post('/users')
      .send({
        username: 'BillyBuffum',
        password: 'WhatAGr8Day!',
        email: 'william.b.buffum@gmail.com'
      })
      .set('Accept', 'application/json')
      .set('PF-API-VERSION', 'v1')
      .end((err, res) => {
        expect(err).to.be.equal(null);
        expect(res.statusCode).to.be.equal(201);
        expect(res.username).to.not.be.equal(null);
        done();
      })
    );

    it('should not create an account with an invalid password', (done) =>
      request(server)
      .post('/users')
      .send({
        username: 'BillyBuffum',
        password: 'Password',
        email: 'william.b.buffum@gmail.com'
      })
      .set('Accept', 'application/json')
      .set('PF-API-VERSION', 'v1')
      .end((err, res) => {
        expect(err).to.be.equal(null);
        expect(res.statusCode).to.be.equal(400);
        expect(res.error.message).to.be.equal('Invalid password');
        done();
      })
    );

    it('should only create an account with a valid email address', (done) =>
      request(server)
      .post('/users')
      .send({
        username: 'BillyBuffum',
        password: 'WhatAGr8Day!',
        email: 'william.b.buffum'
      })
      .set('Accept', 'application/json')
      .set('PF-API-VERSION', 'v1')
      .end((err, res) => {
        expect(err).to.be.equal(null);
        expect(res.statusCode).to.be.equal(400);
        expect(res.error.message).to.be.equal('Invalid email');
        done();
      })
    );

    it('should only create an account with a valid username', (done) =>
      request(server)
      .post('/users')
      .send({
        password: 'WhatAGr8Day!',
        email: 'william.b.buffum@gmail.com'
      })
      .set('Accept', 'application/json')
      .set('PF-API-VERSION', 'v1')
      .end((err, res) => {
        expect(err).to.be.equal(null);
        expect(res.statusCode).to.be.equal(400);
        expect(res.error.message).to.be.equal('Invalid username');
        done();
      })
    );
  });

  describe('Account Login/Logout', () => {

  });

  describe('Account Details', () => {

  });

  describe('Account Deletion', () => {

  });
});
