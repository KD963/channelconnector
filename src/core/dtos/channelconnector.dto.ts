import { IsString, IsDate, IsNumber, IsEmail, IsBoolean, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateChannelConnectorDto {

    @IsNumber()
    marketplaceId: number;

    @IsNumber()
    clientId: number;

    @IsString()
    userName: string;

    @IsString()
    password: string;

    @IsBoolean()
    valid: boolean;

    @IsBoolean()
    connectorCall: boolean;

    @IsBoolean()
    onOff: boolean;

    @IsBoolean()
    adminActive: boolean;

    @IsBoolean()
    sellerActive: number;

    @IsNumber()
    companyId: number;

    @IsNumber()
    auto: number;

    @Type(() => Date)
    @IsDate()
    connectorCallDate: Date;

    @Type(() => Date)
    @IsDate()
    entry_date: Date;

    @Type(() => Date)
    @IsDate()
    updated_date: Date;

    @IsNumber()
    accountId: number;



}

export class UpdateChannelConnectorDto extends PartialType(CreateChannelConnectorDto) { }