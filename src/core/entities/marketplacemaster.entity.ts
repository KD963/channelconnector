import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('marketplace_master')
export class MarketplaceMasterEntity {

    @PrimaryGeneratedColumn({name: 'marketplace_id'})
    marketplaceId: number;

    @Column({name: 'marketplace_name'})
    marketplaceName: string;

    @Column({name: 'status'})
    status: boolean;

    @Column({name: 'currency_code'})
    currencyCode: string;

    @Column({name: 'region'})
    region: string;

    @Column({name: 'auto'})
    auto: number;

    @Column({name: 'business'})
    business: string;

    @Column()
    entry_date: Date;

    @Column()
    update_date: Date;

}