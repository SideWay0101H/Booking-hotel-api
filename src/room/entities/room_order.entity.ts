import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Order } from "src/order/entities/order.entity";
import { Room } from "./room.entity";

@Entity('room_order')
export class RoomOrder{
    @PrimaryColumn({ name: 'room_id'})
    roomId: number

    @PrimaryColumn({ name: 'order_id'})
    orderId: number

    @ManyToOne(()=> Room,(room) => room.orders,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinColumn([{
        name:'room_id',referencedColumnName: 'id'
    }])
    services: Room[]

    @ManyToOne(()=>Order,(order)=>order.rooms,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinColumn([{ name: 'order_id',referencedColumnName: 'id'}])
    orders: Order[]
}