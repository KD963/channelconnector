import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GlobalService } from "src/configs/globalservice";
import { MyLogger } from "src/configs/logger";
import { ChannelConnectorController } from "src/controllers/channelconnector.controller";
import { ChannelConnectorAbstractRepo, CHANNELCONNECTORABSTRACTREPO } from "src/core/abstract/channelconnector.abstract";
import { ChannelConnectorEntity } from "src/core/entities/channelconnector.entity";
import { ClientsEntity } from "src/core/entities/clients.entity";
import { CompanyProfileEntity } from "src/core/entities/companyprofile.entity";
import { MarketplaceMasterEntity } from "src/core/entities/marketplacemaster.entity";
import { ChannelConnectorService } from "src/services/channelconnector.service";



@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'postgres',
        entities: [ChannelConnectorEntity, MarketplaceMasterEntity, CompanyProfileEntity, ClientsEntity],
    }),
    TypeOrmModule.forFeature([ChannelConnectorEntity]),
    TypeOrmModule.forFeature([MarketplaceMasterEntity]),
    TypeOrmModule.forFeature([CompanyProfileEntity]),
    TypeOrmModule.forFeature([ClientsEntity])
    ],
    providers: [
        {
            useClass: ChannelConnectorAbstractRepo,
            provide: CHANNELCONNECTORABSTRACTREPO
        },
        ChannelConnectorService, MyLogger, GlobalService

    ],
    controllers: [ChannelConnectorController],
    exports: [MyLogger, GlobalService]
})

export class ChannelConnectorModule { }