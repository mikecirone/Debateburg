const {expect} = require('chai');
const request = require('supertest');
const {beforeEach} = require('mocha');

const {app} = require('./../server');
const {Game} = require('./../models/game.model');
const {game, populateGamesAndUsers, userToken} = require('./seed/game.seed');

describe('Game', () => {

beforeEach(populateGamesAndUsers);

  describe('POST /games', () => {

    it('should create a new game with request game data', (done) => {

      var characters = [{name: "Bob", health: 10},
                        {name: "Mitch", health: 10}];
      request(app)
        .post('/games')
        .set('x-auth', userToken)
        .send({characters})
        .expect(200)
        .expect((res) => {
          expect(res.body.characters[1].name).to.deep.equal(characters[1].name);
          //can't just compare arrays as response has ids added
        })
        .end((err, res) => {
          if(err)
            return done(err);
          done();
        });
    });

  });

  describe('POST game move', (done) => {

    it("should increment a character's health when positive move is made", () => {
      request(app)
        .post('/games/'+game._id+'/character/'+game.characters[3]+'/2')
        .set('x-auth', userToken)
        .send()
        .expect(200)
        .expect((res) => {
          expect(res.body.characters[3].health).to.equal(game.characters[3].health+2)
        })
        .end((err, res) => {
          if(err)
            return done(err);
          done();
        });
    });

    it("should decrement a character's health when negative move is made", () => {
      request(app)
        .post('/games/'+game._id+'/character/'+game.characters[3]+'/-2')
        .set('x-auth', userToken)
        .send()
        .expect(200)
        .expect((res) => {
          expect(res.body.characters[3].health).to.equal(game.characters[3].health-2)
        })
        .end((err, res) => {
          if(err)
            return done(err);
          done();
        });
    });

    it("should not change a character's health past absolute value of 2", () => {
      request(app)
        .post('/games/'+game._id+'/character/'+game.characters[3]+'/50')
        .set('x-auth', userToken)
        .send()
        .expect(200)
        .expect((res) => {
          expect(res.body.characters[3].health).to.equal(game.characters[3].health+2)
        })
        .end((err, res) => {
          if(err)
            return done(err);
          done();
        });
    });
  });

});
