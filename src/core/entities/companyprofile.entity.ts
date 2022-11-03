import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('company_profile')
export class CompanyProfileEntity {

    @PrimaryGeneratedColumn({name: 'company_id'})
    companyId: number;

    @Column({name: 'company_name'})
    companyname: string;

    @Column({name: 'url'})
    url: string;

    @Column({name: 'mobile'})
    mobile: number;

    @Column({name: 'address1'})
    address1: string;

    @Column({name: 'address2'})
    address2: string;

    @Column({name: 'country'})
    country: string;

    @Column({name: 'state'})
    state: string;

    @Column({name: 'city'})
    city: string;

    @Column({name: 'pincode'})
    pincode: number;

    @Column({name: 'business'})
    business: string;

    @Column()
    entry_dt: Date;

    @Column()
    update_dt: Date;
}