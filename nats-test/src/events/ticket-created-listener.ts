import nats, {Message} from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreateEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreateEvent>{
    readonly subject = Subjects.TicketCreated;
    queueGroupName = 'payment-service';
    
    onMessage(data: TicketCreateEvent['data'], msg: Message): void {
        console.log("Event data", data);
        console.log(data.id);
        console.log(data.title);
        console.log(data.price);

        msg.ack();
    }
}