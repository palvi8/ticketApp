import request  from "supertest";
import {app} from "../../app";

const title = 'title';
const price = 20;

const createTicket = () => {
    return request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.signin())
    .send({
        title, price
    })
}
it('should fetch list of Tickets', async () => {

    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

    expect(response.body.length).toEqual(3);
});