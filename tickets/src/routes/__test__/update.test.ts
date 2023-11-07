import request  from "supertest";
import mongoose from "mongoose";
import {app} from "../../app";
import {natsWrapper} from '../../nats-wrapper';

const id = new mongoose.Types.ObjectId().toHexString()
it("should return 404 if provided id not exist", async() => {
    await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
        title: 'title',
        price: 20
    })
    .expect(404);
});

it("should return 401 if user does not own the ticket", async() => {
   const response =  await request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.signin())
    .send({
        title: 'title',
        price: 20
    })

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
        title: 'title1',
        price: 10
    })
    .expect(401);


});

it("should return 400 if user provides an invalid title and price", async() => {
    const cookie = global.signin();

    const response =  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'title',
        price: 20
    })

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: '',
        price: 20
    })
    .expect(400);


    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: 'Title',
        price: -10
    })
    .expect(400);

});

it("Update the ticket provided valid inputs", async() => {
    const cookie = global.signin();

    const response =  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'title',
        price: 20
    });

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: 'Title',
        price: 100
    })
    .expect(200);

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send();
    
    expect(ticketResponse.body.title).toEqual('Title')
    expect(ticketResponse.body.price).toEqual(100)
});

it('should publish an updated event', async () =>{ 
    const cookie = global.signin();

    const response =  await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'title',
        price: 20
    });

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: 'Title',
        price: 100
    })
    .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});