import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('channel_connectors')
export class ChannelConnectorEntity {

    @PrimaryGeneratedColumn({name: 'account_id'})
    accountId: number;

    @Column({name: 'marketplace_id'})
    marketplaceId: number;

    @Column({name: 'client_id'})
    clientId: number;

    @Column({name: 'user_name'})
    userName: string;

    @Column({name: 'password'})
    password: string;

    @Column({name: 'valid'})
    valid: boolean;

    @Column({name: 'connector_call_date'})
    connectorCallDate: Date;

    @Column({name: 'connector_call'})
    connectorCall: boolean;

    @Column({name: 'on_off'})
    onOff: boolean;

    @Column({name: 'admin_active'})
    adminActive: boolean;

    @Column({name: 'seller_active'})
    sellerActive: number;

    @Column({name: 'company_id'})
    companyId: number;

    @Column({name: 'auto'})
    auto: number;

    @Column({name: 'entry_date'})
    entry_date: Date;

    @Column({name: 'updated_date'})
    updated_date: Date;


}