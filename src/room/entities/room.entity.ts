import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { RoomType } from '../../roomtype/entites/roomtype.entity';
import { Review } from 'src/review/entity/review.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, type: 'varchar'})
    room_number: string

    @Column()
    occupancy: number

    @Column()
    thumbnail: string

    @Column({ type: 'int'})
    price_at_night: number

    @Column({ type: 'float'})
    area: number

    @Column({default: 'isvailable'})
    roomAvailable: string

    @CreateDateColumn()
    create_At: Date

    @UpdateDateColumn()
    update_At: Date

    @ManyToOne(() => User, (user) => user.rooms)
    user: User

    @ManyToMany(() => Order,(order) =>order.rooms,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinTable({
        name: 'room_order',
        joinColumn: {
            name: 'room_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'order_id',
            referencedColumnName: 'id'
        }
    })
    orders?: Order[]

    @ManyToOne(() => RoomType, (roomtype) => roomtype.rooms)
    roomtype: RoomType

    @OneToMany(() => Review,(review) =>review.room)
    reviews: Review[]
}
