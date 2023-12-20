import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Service } from "./services.entity";
import { Order } from "src/order/entities/order.entity";

@Entity('service_order')
export class ServiceOrder{
    @PrimaryColumn({ name: 'service_id'})
    serviceId: number

    @PrimaryColumn({ name: 'order_id'})
    orderId: number

    @ManyToOne(()=> Service,(service) => service.orders,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinColumn([{
        name:'service_id',referencedColumnName: 'id'
    }])
    services: Service[]

    @ManyToOne(()=>Order,(order)=>order.services,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinColumn([{ name: 'order_id',referencedColumnName: 'id'}])
    orders: Order[]
}