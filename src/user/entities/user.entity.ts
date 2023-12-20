import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Room } from 'src/room/entities/room.entity';
import { RoomType } from 'src/roomtype/entites/roomtype.entity';
import { Review } from 'src/review/entity/review.entity';
import { Order } from 'src/order/entities/order.entity';
import { Reset } from '../../reset/reset.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column({ unique: true})
    email: string

    @Column()
    @Exclude()
    password: string

    @Column({ 
        default: 'Guest'
    })
    roles: string
    
    @Column({
       nullable: true,
       default: null
    })
    refresh_token: string

    @Column({
       nullable: true,
       default: null
    })
    avatar: string

    @Column({
        nullable: true,
        default: null
    })
    age: number

    @Column({
        nullable: true,
        default: null
    })
    phone: string

    @Column({
        nullable: true,
        default: null
    })
    address: string

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @OneToMany(() => Room, (room) => room.user)
    rooms: Room[]

    @OneToMany(()=>RoomType,(roomtype)=>roomtype.user)
    roomtypes: RoomType[]

    @OneToMany(() => Review,(review) =>review.user)
    reviews: Review[]

    @OneToMany(() =>Order,(order) =>order.user)
    order: Order[]

}

