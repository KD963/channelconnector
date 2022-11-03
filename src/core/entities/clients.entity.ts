import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class ClientsEntity {

    @PrimaryGeneratedColumn({name: 'client_id'})
    clientId: number;

    @Column({name: 'customer_email'})
    customerEmail: string;

    @Column({name: 'customer_mobile'})
    customerMobile: string;

    @Column({name: 'company_name'})
    companyName: string;

    @Column({name: 'status'})
    status: number;

    @Column({name: 'subdomain'})
    subdomain: string;

    @Column({name: 'email_verified'})
    emailVerified: boolean;

    @Column()
    entry_date: Date;

    @Column()
    updated_date: Date;


}