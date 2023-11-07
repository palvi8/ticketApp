import request  from "supertest";
import mongoose from "mongoose";
import {app} from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, Status } from "../../models/order";
import {natsWrapper} from '../../nats-wrapper';

const id = new mongoose.Types.ObjectId().toHexString();

it.skip("should set orderStatus as cancelled", async() => {

    const ticket = Ticket.build({
        id: "123",
        title: 'Concert1',
        price: 200,
    });

    await ticket.save();
    const user = global.signin();

    const {body: order} = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ticketId: ticket.id})
    .expect(201);

    await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

    const updateOrder = await Order.findById(order.id)
    expect(updateOrder?.status).toEqual(Status.Cancelled);
});

it.skip('should emit order cancelled event', async() => {
    const ticket = Ticket.build({
        id: "123",
        title: 'Concert1',
        price: 200,
    });

    await ticket.save();
    const user = global.signin();

    const {body: order} = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ticketId: ticket.id})
    .expect(201);

    await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

});
