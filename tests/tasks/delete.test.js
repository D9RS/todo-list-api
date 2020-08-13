const request = require('supertest');
const app = require('../../app');
const { createDefaultUser, deleteDefaultUser } = require('../helpers/UserDao');
const { createDefaultTask } = require('../helpers/TaskDao');

describe('TaskController', () => {
    describe('Delete task', () => {
        const URL = '/api/tasks';
        let server;

        beforeAll(async (done) => {
            server = app.listen(0, done);
        });

        afterAll(async (done) => {
            server.close(done);
        });

        describe('User is not logged in', () => {
            it('When the user is not logged in, the 401 status should return with an error', async () => {
                const res = await request(app).put(`${URL}/1`).expect(401);
                return expect(res.body).toHaveProperty('error');
            });
        });

        describe('User is logged in', () => {
            const agent = request.agent(app);
            let user, task;

            beforeAll(async () => {
                user = await createDefaultUser();
                task = await createDefaultTask(user.id);
                await agent.post('/api/signin').send(user);
            });

            afterAll(async () => {
                // deleteDefaultTask is not necessary since the foreign key has the `on delete cascade` constraint
                await deleteDefaultUser();
            });

            it('When `id` is incorrect, then status 400 with an error should be returned', async () => {
                const incorrectIds = ['1a', 'a', 'Infinity', '0', '-51', 'a1', '2.56', '2,53'];
                const promises = incorrectIds.map((id) =>
                    agent.delete(`${URL}/${id}`).send(task).expect(400)
                );
                const responses = await Promise.all(promises);
                responses.forEach((res) => expect(res.body).toHaveProperty('error'));
            });

            it('When the task with the specified `id` does not exist -> status 400 with an error', async () => {
                const res = await agent.delete(`${URL}/${task.id + 1}`).expect(400);
                expect(res.body).toHaveProperty('error');
            });

            it('When id is correct -> the task should be deleted, status 200 with the field success', async () => {
                const res = await agent.delete(`${URL}/${task.id}`).expect(200);
                expect(res.body).toHaveProperty('success', true);

                const response = await agent.get(URL).expect(200);
                expect(response.body).toHaveLength(0);
            });
        });
    });
});
