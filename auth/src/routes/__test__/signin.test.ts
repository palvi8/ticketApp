import request from "supertest";
import { app } from "../../app";

it('fails when email does not exist', async () => {
    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400);
});

it('fails when incorrect password entered', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);

    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'p'
    })
    .expect(400);
});

it('response with cookie when given valid credentials', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);

    const respons = await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);

    expect(respons.get('Set-Cookie')).toBeDefined();
});

