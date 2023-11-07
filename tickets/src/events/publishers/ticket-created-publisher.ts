import { Publisher, Subjects, TicketCreatedEvent } from "@pdbooktickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}