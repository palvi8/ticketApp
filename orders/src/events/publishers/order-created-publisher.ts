import { Publisher, Subjects, OrderCreatedEvent } from "@pdbooktickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
}