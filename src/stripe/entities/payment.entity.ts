// import { PaymentStatus } from "src/common/payment-status.enum";
// import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// @Entity()
// export class Payment{
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     paymenet_method: string

//     @Column({ type: 'varchar',default: PaymentStatus.Created})
//     payment_status: PaymentStatus

//     @Column()
//     paymnet_date: string

//     @CreateDateColumn()
//     create_at: Date

//     @UpdateDateColumn()
//     update_at: Date
// }