import { Entity, PrimaryGeneratedColumn, Column, Double, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Customer {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    fullname: string

    @Column({ type: "double precision" })
    salary: number

    @Column({ type: "double precision" })
    company_value: number

    @Column({ default: false })
    selected: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}
 