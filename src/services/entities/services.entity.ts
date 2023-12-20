import { Order } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name_service: string

    @Column()
    price_service: number

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @ManyToMany(() => Order,(order) =>order.services,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinTable({
        name: 'service_order',
        joinColumn: {
            name: 'service_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'order_id',
            referencedColumnName: 'id'
        }
    })
    orders?: Order[]

}