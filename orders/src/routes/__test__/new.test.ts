import mongoose from "mongoose";
import request  from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import {Ticket} from "../../models/ticket";
// import { Status } from "@pdbooktickets/common";
import {natsWrapper} from '../../nats-wrapper';
import { Status } from "../../events/types/status";

it.skip('should return error if ticket not exist', async() => {
    const ticketId = new mongoose.Types.ObjectId();
    await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId})
    .expect(404)

});

it.skip('should return error if ticket already reserved', async() => {
    const ticket = Ticket.build({
        id: "123",
        title: 'Concert1',
        price: 200,
    })
    await ticket.save();

    const order = Order.build({
        ticket,
        userId: 'reyu12i',
        status: Status.Created,
        expiresAt: new Date()
    });
    await order.save();

    await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId: ticket.id})
    .expect(400)

});

it.skip('should reserve a ticket', async () => {
    const ticket = Ticket.build({
        id: "123",
        title: 'Concert1',
        price: 200,
    })
    await ticket.save();

    await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId: ticket.id})
    .expect(201);

});

it.skip('should emit order created event', async () => {
    const ticket = Ticket.build({
        id: "123",
        title: 'Concert1',
        price: 200,
    })
    await ticket.save();

    await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId: ticket.id})
    .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

