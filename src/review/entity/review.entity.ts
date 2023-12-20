import { Room } from "src/room/entities/room.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ratings: number

    @Column()
    comment: string

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @ManyToOne(() => User,(user) =>user.reviews)
    user: User

    @ManyToOne(() => Room,(room) =>room.reviews)
    room: Room
}