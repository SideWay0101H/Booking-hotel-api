import { User } from 'src/user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('reset_passwords')
export class Reset{
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string

	@Column()
	token: string

}