import request from 'supertest';
import app from '../server';

jest.mock('../session');

const user = {
  username: 'TEST_USER',
  firstname: 'Kevin',
  lastname: 'Jonson',
  password: 'password',
  email: 'kcjonson@gmail.com'
};



describe('User-Backend API', () => {
  
  describe( 'the root url (/users) is functional ', () => {
    
    it( 'the api root responds to a GET (i.e. the server is up and accessible, CORS headers are set up)', () => {
      return request(app)
        .get('/users')
        .expect(200)
    });

    it( 'the api root responds successfully to a DELETE', () => {
      return request(app)
        .delete('/users')
        .expect(204)
    });

    it( 'after a DELETE the api root responds to a GET with a JSON representation of an empty array', () => {
      return request(app)
        .get('/users')
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveLength(0);
          expect(true).toBe(false);
        })
    });

    it( 'the api root responds to a POST with the user which was posted to it', () => {
      return request(app)
        .post('/users')
        .send(user)
        .expect(201)
        .expect(res => {
          expect(res.body).toMatchObject(user);
        })
    });

    it( 'the api returns users that have been POSTed', () => {
      return request(app)
        .get('/users')
        .expect(200)
        .expect(res => {
          expect(res.body).toHaveLength(1);
          expect(res.body[0]).toMatchObject(user);
        })
    });

  });



  describe( 'The user url (/users/ID) is functional', () => {

    beforeEach(() => {
      return request(app)
        .delete('/users')
        .expect(204)
    });

    it('each new user has a url, and you can navigate to it', () => {
      let currentUser;
      return request(app)
        .post('/users')
        .send(user)
        .expect(201)
        .then(res => {
          currentUser = res.body;
          return request(app)
            .get(`/users/${currentUser.id}`)
            .expect(200)
            .expect(res =>  {
              expect(res.body).toMatchObject(currentUser);
            })
        })
    });

    it('can change the users name by PATCHing to the users url', () => {
      let currentUser, update;
      return request(app)
        .post('/users')
        .send(user)
        .expect(201)
        .then(res => {
          currentUser = res.body;
          update = {firstname: 'Margaret'}
          return request(app)
            .patch(`/users/${currentUser.id}`)
            .send(update)
            .expect(204)
            .then(() => {
              return request(app)
                .get(`/users/${currentUser.id}`)
                .expect(200)
                .expect(res =>  {
                  expect(res.body).toMatchObject({
                    ...user,
                    ...update
                  });
                })
            
          })
        })
    });

    it('can delete a user making a DELETE request to the users url', () => {
      let currentUser;
      return request(app)
        .post('/users')
        .send(user)
        .expect(201)
        .then(res => {
          currentUser = res.body;
          return request(app)
            .delete(`/users/${currentUser.id}`)
            .expect(204)
        })
    });
  });

});
