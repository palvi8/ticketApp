import request  from "supertest";
import mongoose from "mongoose";
import {app} from "../../app";

it("return 404 if ticket is not found", async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404)

});


it("return correct ticket if present", async () => {

    const title = 'title';
    const price = 20;
    
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title, price
    })
    .expect(201)

    const ticket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200)

    expect(response.body.title).toEqual('title');
    expect(response.body.price).toEqual(20)
});