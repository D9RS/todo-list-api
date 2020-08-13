const request = require('supertest');
const app = require('../../app');
const { createDefaultUser, deleteDefaultUser } = require('../helpers/UserDao');

describe('AuthController', () => {
    describe('Sign out', () => {
        const URL = '/api/signout';
        let server, user;

        beforeAll(async (done) => {
            user = await createDefaultUser();
            server = app.listen(0, done);
        });

        afterAll(async (done) => {
            await deleteDefaultUser();
            server.close(done);
        });

        it('isAuthorized -> When the user is not logged in, the 401 status should return with an error', async () => {
            const res = await request(app).post(URL).expect(401);
            return expect(res.body).toHaveProperty('error');
        });

        it('When the user is logged in, status 200 should be returned with the field `success`', async () => {
            const agent = request.agent(app);
            await agent.post('/api/signin').send(user);

            const res = await agent.post(URL).expect(200);
            expect(res.body).toEqual({ success: true });
        });
    });
});
