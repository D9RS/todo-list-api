const request = require('supertest');
const app = require('../../app');
const { createDefaultUser, deleteDefaultUser } = require('../helpers/UserDao');

describe('AuthController', () => {
    describe('Sign in', () => {
        const URL = '/api/signin';
        let server, user;

        beforeAll(async (done) => {
            user = await createDefaultUser();
            server = app.listen(0, done);
        });

        afterAll(async (done) => {
            await deleteDefaultUser();
            server.close(done);
        });

        it('When no login is specified, status 400 should be returned with an error', async () => {
            const res = await request(app).post(URL).send({ password: user.password }).expect(400);
            return expect(res.body).toHaveProperty('error');
        });

        it('When no password is specified, status 400 should be returned with an error', async () => {
            const res = await request(app).post(URL).send({ login: user.password }).expect(400);
            return expect(res.body).toHaveProperty('error');
        });

        it('When the correct login and password are entered, status 200 should be returned with a `success` field', async () => {
            const res = await request(app).post(URL).send(user).expect(200);
            return expect(res.body).toEqual({ success: true });
        });

        it('isNotAuthorized -> When the user is logged in, the 403 status should return with an error', async () => {
            const agent = request.agent(app);
            await agent.post(URL).send(user);

            const res = await agent.post(URL).expect(403);
            expect(res.body).toHaveProperty('error');
        });
    });
});
