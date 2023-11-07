import request from "supertest";
import { app } from "../../app";

it('return 201 status on successfull signup', async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

});

it('returns 400 with an invalid email', async () => {
    return request(app)
    .post("/api/users/signup")
    .send({
        email: 'test.com',
        password: 'password'
    })
    .expect(400);
});

it('returns 400 with an invalid password', async () => {
    return request(app)
    .post("/api/users/signup")
    .send({
        email: 'test.com',
        password: 'p'
    })
    .expect(400);
});

it('returns 400 with missing password and email', async () => {
    await request(app)
    .post("/api/users/signup")
    .send({email: "test@test.com"})
    .expect(400);


    await request(app)
    .post("/api/users/signup")
    .send({password: 'password'})
    .expect(400);
});

it('disallow duplicate emails', async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: 'password'
    })
    .expect(201);


    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: 'password'
    })
    .expect(400);
});

it('set cookie after successfull signup', async () => {
    const response = await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: 'password'
    })
    .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});