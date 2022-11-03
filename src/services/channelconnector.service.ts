import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { response_data } from "src/configs/respone";
import { httpcode, message, response } from "src/configs/constant";
import { MyLogger } from "src/configs/logger";
import { ChannelConnectorAbstractRepo } from "src/core/abstract/channelconnector.abstract";
import { ChannelConnectorEntity } from "src/core/entities/channelconnector.entity";
import { CreateChannelConnectorDto, UpdateChannelConnectorDto } from "src/core/dtos/channelconnector.dto";
import { GlobalService } from "src/configs/globalservice";
import { MarketplaceMasterEntity } from "src/core/entities/marketplacemaster.entity";
import { CompanyProfileEntity } from "src/core/entities/companyprofile.entity";
import { ClientsEntity } from "src/core/entities/clients.entity";


@Injectable()
export class ChannelConnectorService implements OnApplicationBootstrap {
    channelConnector: ChannelConnectorAbstractRepo<any>;
    marketplaceMaster: ChannelConnectorAbstractRepo<any>;
    companyProfile: ChannelConnectorAbstractRepo<any>;
    clients: ChannelConnectorAbstractRepo<any>;

    constructor(
        @InjectRepository(ChannelConnectorEntity) private channelConnectorRepository: Repository<ChannelConnectorEntity>,
        @InjectRepository(MarketplaceMasterEntity) private marketplaceMasterRepository: Repository<MarketplaceMasterEntity>,
        @InjectRepository(CompanyProfileEntity) private companyProfileRepository: Repository<CompanyProfileEntity>,
        @InjectRepository(ClientsEntity) private clientsRepository: Repository<ClientsEntity>,
        private logger: MyLogger,
        private global: GlobalService,
    ) {
        this.logger.log("InjectRepository constructor..")
    }

    onApplicationBootstrap() {
        this.logger.log("inside boot strap");

        this.channelConnector = new ChannelConnectorAbstractRepo<ChannelConnectorEntity>(this.channelConnectorRepository);
        this.marketplaceMaster = new ChannelConnectorAbstractRepo<MarketplaceMasterEntity>(this.marketplaceMasterRepository);
        this.companyProfile = new ChannelConnectorAbstractRepo<CompanyProfileEntity>(this.companyProfileRepository);
        this.clients = new ChannelConnectorAbstractRepo<ClientsEntity>(this.clientsRepository);


    }

    async getAllChannelConnector(): Promise<any> {
        try {
            const channelConnector = await this.channelConnector.getAll()

            this.logger.log("Channel Connectors")
            return response_data(response.Success, httpcode.Success, channelConnector, message.Success);

        } catch (error) {
            return response_data(response.Error, httpcode.InternalServerError, null, message.Error);
        }
    }

    async get(id: any): Promise<any> {
        try {
            const channelConnector = await this.channelConnector.get(id);
            if (channelConnector.length != 0) {
                return response_data(response.Success, httpcode.Found, channelConnector, message.Success)

            } else {
                return response_data(response.Error, httpcode.NotFound, null, message.NotFound)
            }

        } catch (error) {
            return response_data(response.Error, httpcode.InternalServerError, message.Error)
        }

    }

    async createChannelConnector(createChannelConnectorDto: CreateChannelConnectorDto): Promise<any> {
        try {
            const marketplaceid = await this.marketplaceMaster.get({ 'marketplaceId': createChannelConnectorDto.marketplaceId });
          
            let mkpid;
            if (marketplaceid.length != 0) {

                mkpid = marketplaceid['marketplaceId'];

            } else {
                return response_data(response.Error, httpcode.NotFound, null, message.NotFound);

            }
          
            const companyid = await this.companyProfile.get({ 'companyId': createChannelConnectorDto.companyId });
            let cmpid;
            if (companyid.length != 0) {
                cmpid = companyid['companyId'];
            } else {
                return response_data(response.Error, httpcode.NotFound, null, message.NotFound);

            }
           
            const clientid = await this.clients.get({ 'clientId': createChannelConnectorDto.clientId });
            let cid;
            if (clientid.length != 0) {
                cid = clientid['clientId'];
            } else {
                return response_data(response.Error, httpcode.NotFound, null, message.NotFound);

            }

            const channelConnector = await this.channelConnector.get({ 'clientId': createChannelConnectorDto.clientId });
            const endt = await this.global.GetCurrentDateTimeLocalTimeStamp()
            const password = await this.global.encodedPassword(createChannelConnectorDto.password);
            if (!channelConnector) {
                let channelConnectorData = {
                    'marketplaceId': mkpid,
                    'clientId': cid,
                    'userName': createChannelConnectorDto.userName,
                    'password': password,
                    'valid': createChannelConnectorDto.valid,
                    'connectorCallDate': new Date(createChannelConnectorDto.connectorCallDate),
                    'connectorCall': createChannelConnectorDto.connectorCall,
                    'onOff': createChannelConnectorDto.onOff,
                    'adminActive': createChannelConnectorDto.adminActive,
                    'sellerActive': createChannelConnectorDto.sellerActive,
                    'companyId': cmpid,
                    'auto': createChannelConnectorDto.auto,
                    'entry_date': new Date(endt)


                }
                let data = await this.channelConnector.create(channelConnectorData)
                return response_data(response.Success, httpcode.Success, data, message.ChannelConnectorCreated)

            } else {
                return response_data(response.Error, httpcode.AlreadyExists, null, message.AlreadyExists)

            }

        } catch (error) {
            this.logger.error(error, "something went wrong")
            return response_data(response.Error, httpcode.InternalServerError, null, message.Error)

        }

    }

    async update(updateChannelConnectorDto: UpdateChannelConnectorDto): Promise<any> {
        try {

            const channel = await this.channelConnector.get({ 'accountId': updateChannelConnectorDto.accountId })
            if (updateChannelConnectorDto.password != null) {
                let password = await this.global.encodedPassword(updateChannelConnectorDto.password);
                updateChannelConnectorDto['password'] = password;

            }
            if (!channel) {
                this.logger.warn("Failed to update channel because this channel name doesn't exists")
                return response_data(response.Error, httpcode.NotFound, null, message.NotExists)
            } else {
                let updated = Object.assign(channel, updateChannelConnectorDto['channelConnector']);
                const updt = await this.global.GetCurrentDateTimeLocalTimeStamp()
                updated['updated_date'] = new Date(updt)  
                this.channelConnector.update(updateChannelConnectorDto.accountId, updated)
                return response_data(response.Success, httpcode.Success, null, message.ChannelConnectorUpdated)
            }
        } catch (error) {
            this.logger.error(error, "something went wrong")
            return response_data(response.Error, httpcode.InternalServerError, null, message.Failed)
        }

    }



}