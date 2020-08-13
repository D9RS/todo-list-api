const request = require('supertest');
const app = require('../../app');
const { createDefaultUser, deleteDefaultUser } = require('../helpers/UserDao');
const { createDefaultTask, deleteDefaultTask } = require('../helpers/TaskDao');

describe('TaskController', () => {
    describe('Get all tasks', () => {
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
            it('When the user is not logged in, the 401 status should return with an error', async () => {
                const res = await request(app).post(URL).expect(401);
                return expect(res.body).toHaveProperty('error');
            });
        });

        describe('User is logged in', () => {
            const agent = request.agent(app);

            beforeAll(async () => {
                await agent.post('/api/signin').send(user);
            });

            it('When the task list is empty, status 200 and an empty array of tasks should be returned', async () => {
                const res = await agent.get(URL).expect(200);
                expect(res.body).toEqual([]);
            });

            it('When there is one task in the list, status 200 and an array with one task should be returned', async () => {
                const task = await createDefaultTask(user.id);
                const res = await agent.get(URL).expect(200);
                expect(res.body).toEqual([task]);
                await deleteDefaultTask(task.id);
            });
        });
    });
});
