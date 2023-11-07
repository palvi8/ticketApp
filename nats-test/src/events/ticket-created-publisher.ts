import {Publisher} from './base-publisher';
import { TicketCreateEvent } from './ticket-created-event';
import { Subjects } from './subjects';


export class TicketCreatedPublisher extends Publisher<TicketCreateEvent>{
    readonly subject = Subjects.TicketCreated;
}