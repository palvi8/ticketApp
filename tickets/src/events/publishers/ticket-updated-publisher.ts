import { Publisher, Subjects, TicketUpdatedEvent } from "@pdbooktickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}