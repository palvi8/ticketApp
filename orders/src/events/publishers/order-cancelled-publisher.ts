import { Publisher, Subjects, OrderCancelledEvent } from "@pdbooktickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
}