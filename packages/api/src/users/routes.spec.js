import request from 'supertest';
import app from '../server';

jest.mock('../session');

const user = {
  username: 'TEST_USER',
  firstname: 'Kevin',
  lastname: 'Jonson',
  password: 'password'
};

describe('User-Backend API', () => {
  describe( 'the pre-requisites', () => {
    it( 'the api root responds to a GET (i.e. the server is up and accessible, CORS headers are set up)', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .end((err) => {
          expect(err).toBeNull();
          done();
        });
    });
    it( 'the api root responds to a POST with the user which was posted to it', (done) => {
      request(app)
        .post('/users')
        .send(user)
        .expect(201)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body).toHaveProperty('firstname', 'Kevin');
          done();
        });
    });
    it( 'the api root responds successfully to a DELETE', (done) => {
      request(app)
        .delete('/users')
        .expect(204)
        .end((err) => {
          expect(err).toBeNull();
          done();
        });
    });
    it( 'after a DELETE the api root responds to a GET with a JSON representation of an empty array', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .end((err, res) => {
          expect(res.body).toEqual([]);
          done();
        });
    });
  });

  describe( 'storing new users by posting to the root url', () => {

    beforeEach((done) => {
      request(app)
        .delete('/users')
        .end((err) => {
          expect(err).toBeNull();
          done();
        });
    });

    it('adds a new user to the list of users at the root url', (done) => {
      request(app)
        .post('/users')
        .send(user)
        .expect(201)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body).toHaveProperty('firstname', 'Kevin');
          done();
        });
    });
    it('each new user has a url, and you can navigate to it', (done) => {
      let currentUser;
      const client = request(app);
      client
        .post('/users')
        .send(user)
        .expect(201)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body).toHaveProperty('id');
          expect(typeof res.body.id).toEqual('number');
          currentUser = res.body;
          client
            .get(`/users/${currentUser.id}`)
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.body.id).toEqual(currentUser.id);
              done();
            });
        });
    });
  });

  describe( 'working with an existing user', () => {
    it('can change the users name by PATCHing to the users url', (done) => {
      let currentUser;
      const client = request(app);
      client
        .post('/users')
        .send(user)
        .expect(201)
        .end((err, res) => {
          expect(err).toBeNull();
          currentUser = res.body;
          client
            .patch(`/users/${currentUser.id}`)
            .send({'firstname': 'Kev'})
            .end((err, res) => {
              expect(err).toBeNull();
              expect(res.body.firstname).toEqual('Kev');
              done();
            });
        });
    });
    it('changes to a user are persisted and show up when re-fetching the user', (done) => {
      let currentUser;
      const client = request(app);
      client
        .post('/users')
        .send(user)
        .expect(201)
        .end((err, res) => {
          expect(err).toBeNull();
          currentUser = res.body;
          client
            .patch(`/users/${currentUser.id}`)
            .send({'firstname': 'Kev', 'lastname': 'Jo'})
            .end((err) => {
              expect(err).toBeNull();
              client
                .get(`/users/${currentUser.id}`)
                .end((err,res) => {
                  expect(err).toBeNull();
                  expect(res.body.firstname).toEqual('Kev');
                  expect(res.body.lastname).toEqual('Jo');
                  done();
                });
            });
        });
    });
    it('can delete a user making a DELETE request to the users url', (done) => {
      let currentUser;
      const client = request(app);
      client
        .post('/users')
        .send(user)
        .expect(201)
        .end((err, res) => {
          expect(err).toBeNull();
          currentUser = res.body;
          client
            .delete(`/users/${currentUser.id}`)
            .expect(204)
            .end((err) => {
              expect(err).toBeNull();
              done();
            });
        });
    });
  });
});
