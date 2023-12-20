import { Room } from "src/room/entities/room.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RoomType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type_name: string
    
    @Column({ length: 4096 })
    description: string;

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

    @OneToMany(() => Room,room =>room.roomtype)
    rooms: Room[];

    @ManyToOne(() => User, (user) => user.roomtypes)
    user: User;
} 