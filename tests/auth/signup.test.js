const request = require('supertest');
const app = require('../../app');
const { createDefaultUser, deleteDefaultUser } = require('../helpers/UserDao');

describe('AuthController', () => {
    describe('Sign up', () => {
        const URL = '/api/signup';
        const goodPassword = 123456;
        const goodLogin = 'abc';
        const badPassword = 1234;
        const badLogin = 'a1';

        let server, user;

        beforeAll(async (done) => {
            user = await createDefaultUser();
            server = app.listen(8000, done);
        });

        afterAll(async (done) => {
            await deleteDefaultUser();
            server.close(done);
        });

        it('When no login is specified, status 400 should be returned with an error', async () => {
            const res = await request(app).post(URL).send({ password: goodPassword }).expect(400);
            return expect(res.body).toHaveProperty('error');
        });

        it('When no password is specified, status 400 should be returned with an error', async () => {
            const res = await request(app).post(URL).send({ login: goodLogin }).expect(400);
            return expect(res.body).toHaveProperty('error');
        });

        it('When an incorrect password is specified, status 400 with an error should be returned', async () => {
            const res = await request(app)
                .post(URL)
                .send({ login: goodLogin, password: badPassword })
                .expect(400);
            return expect(res.body).toHaveProperty('error');
        });

        it('When an incorrect login is specified, status 400 with an error should be returned', async () => {
            const res = await request(app)
                .post(URL)
                .send({ login: badLogin, password: goodPassword })
                .expect(400);
            return expect(res.body).toHaveProperty('error');
        });

        it('When correct login and password are specified, status 200 should be returned with the field `success`', async () => {
            const res = await request(app)
                .post(URL)
                .send({ login: goodLogin, password: goodPassword })
                .expect(200);
            return expect(res.body).toEqual({ success: true });
        });

        it('When the login already exists, status 400 with an error should be returned', async () => {
            const res = await request(app)
                .post(URL)
                .send({ login: user.login, password: goodPassword })
                .expect(400);
            return expect(res.body).toHaveProperty('error');
        });

        it('isNotAuthorized -> When the user is logged in, the 403 status should return with an error', async () => {
            const agent = request.agent(app);
            await agent.post('/api/signin').send(user);

            const res = await agent.post(URL).expect(403);
            expect(res.body).toHaveProperty('error');
        });
    });
});
