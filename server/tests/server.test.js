const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {User} = require('./../models/user');


describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'foo@bar123.com';
    var password = '123456';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res)=>{
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if(err)
          return done(err);

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password); //as db's password is actually
                                                   //hashed password
          done();
        }).catch((e) => done(e));
      });
  });
});
