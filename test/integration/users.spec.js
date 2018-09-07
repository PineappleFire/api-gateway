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

const app = require('../../app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const mockMongoWith = (value) => {
  return {
    collection (_) {
      return {
        insertOne (_) {
          // mocked insertId
          return { insertId: value };
        }
      };
    }
  }
}

describe('User API Tests', () => {

  describe('Account Creation', () => {
    it('should create an account when provided valid details', async () => {
      const insertId = 1;
      app.locals.mongoDB = mockMongoWith(insertId);

      const response = await request(app)
        .post('/users').send({
          username: 'BillyBuffum',
          password: 'WhatAGr8Day!',
          email: 'william.b.buffum@gmail.com'
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).to.be.equal(201);
      expect(response.body.error).to.be.equal(undefined);
      expect(response.body).to.contain.keys(['id', 'link']);
      expect(response.body.id).to.be.equal(insertId);
      expect(response.body.link).to.be.equal(`/users/${insertId}`);
    });

    it('should not create an account with an invalid password', async () => {
      const insertId = 1;
      app.locals.mongoDB = mockMongoWith(insertId);

      const badPassword = 'hm';
      const expectedErrorMessage = `"password" with value "${badPassword}" fails to match the required pattern: /(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/`

      const response = await request(app)
        .post('/users').send({
          username: 'BillyBuffum',
          password: badPassword,
          email: 'william.b.buffum@gmail.com'
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).to.be.equal(403);
      expect(response.body.error).to.not.be.equal(undefined);
      expect(response.body.error.name).to.be.equal('ValidationError');
      expect(response.body.error.message).to.be.equal(expectedErrorMessage);
      expect(response.body).to.not.contain.keys(['id', 'link']);
    });

    it('should only create an account with a valid email address', async () => {
      const insertId = 1;
      app.locals.mongoDB = mockMongoWith(insertId);

      const badEmail = 'thisIsABadEmailAddress.com';
      const expectedErrorMessage = '"email" must be a valid email';

      const response = await request(app)
        .post('/users').send({
          username: 'BillyBuffum',
          password: 'goodPassword!',
          email: badEmail
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).to.be.equal(403);
      expect(response.body.error).to.not.be.equal(undefined);
      expect(response.body.error.name).to.be.equal('ValidationError');
      expect(response.body.error.message).to.be.equal(expectedErrorMessage);
      expect(response.body).to.not.contain.keys(['id', 'link']);
    });

    it('should only create an account with a valid username', async () => {
      const insertId = 1;
      app.locals.mongoDB = mockMongoWith(insertId);

      const badUsername = 'bad';
      const expectedErrorMessage = '"username" length must be at least 5 characters long';

      const response = await request(app)
        .post('/users').send({
          username: badUsername,
          password: 'goodPassword!',
          email: 'william.b.buffum@gmail.com'
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).to.be.equal(403);
      expect(response.body.error).to.not.be.equal(undefined);
      expect(response.body.error.name).to.be.equal('ValidationError');
      expect(response.body.error.message).to.be.equal(expectedErrorMessage);
      expect(response.body).to.not.contain.keys(['id', 'link']);
    });
  });

  describe('Account Login/Logout', () => {

  });

  describe('Account Details', () => {

  });

  describe('Account Deletion', () => {

  });
});
