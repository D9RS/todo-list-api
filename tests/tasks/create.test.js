const request = require('supertest');
const app = require('../../app');
const { createDefaultUser, deleteDefaultUser } = require('../helpers/UserDao');

describe('TaskController', () => {
    describe('Create task', () => {
        const URL = '/api/tasks';
        let server, user;

        beforeAll(async (done) => {
            user = await createDefaultUser();
            server = app.listen(0, done);
        });

        afterAll(async (done) => {
            await deleteDefaultUser();
            server.close(done);
        });

        describe('User is not logged in', () => {
            it('When the user is not logged in, the 401 status should return with an error', () => {
                return request(app)
                    .post(URL)
                    .expect(401)
                    .then((res) => expect(res.body).toHaveProperty('error'));
            });
        });

        describe('User is logged in', () => {
            const agent = request.agent(app);
            const text = 'this is a sample text!';

            beforeAll(async () => {
                await agent.post('/api/signin').send(user);
            });

            it('When all parameters are passed correctly, status 200 should be returned with the field "success"', async () => {
                const res = await agent.post(URL).send({ text }).expect(200);
                expect(res.body).toHaveProperty('success', true);
            });

            it('When no text is specified, status 400 should be returned with an error', async () => {
                const res = await agent.post(URL).expect(400);
                expect(res.body).toHaveProperty('error');
            });

            it('When text is empty, status 400 should be returned with an error', async () => {
                const res = await agent.post(URL).send({ text: '' }).expect(400);
                expect(res.body).toHaveProperty('error');
            });
        });
    });
});
