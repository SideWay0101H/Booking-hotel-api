import { Room } from 'src/room/entities/room.entity';
import { Service } from 'src/services/entities/services.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity,  OneToMany, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, JoinTable } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @Column()
    check_in: string

    @Column()
    check_out: string

    @Column()
    totalDays: number

    @Column({ type: 'int',default: 0})
    totalAmount: number

    @Column({default: 'Xác nhận'})
    status: string

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @ManyToMany(() =>Room,(room) =>room.orders,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    rooms?: Room[]
    
    @OneToMany(() =>User,(user) => user.order)
    user: User

    @ManyToMany(() =>Service,(service) =>service.orders,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    services?: Service[]
}
