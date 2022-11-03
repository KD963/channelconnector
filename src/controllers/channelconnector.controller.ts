import { Body, Controller, Get, HttpCode, Patch, Post, Put, Query } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateChannelConnectorDto, UpdateChannelConnectorDto } from 'src/core/dtos/channelconnector.dto';
import { ChannelConnectorService } from 'src/services/channelconnector.service';



@Controller('/channelconnector')
export class ChannelConnectorController {
    constructor(private readonly channelConnectorService: ChannelConnectorService) { }

    @GrpcMethod('ChannelConnectorService', 'GetAllChannels')
    async getAll(): Promise<[]> {
        return await this.channelConnectorService.getAllChannelConnector();
    }

    @GrpcMethod('ChannelConnectorService', 'GetChannelConnector')
    async getOne(@Body() id: number): Promise<any> {
        return await this.channelConnectorService.get(id);
    }

    @GrpcMethod('ChannelConnectorService', 'CreateChannelConnector')
    async create(@Body() createChannelConnectorDto: CreateChannelConnectorDto): Promise<any> {
        return await this.channelConnectorService.createChannelConnector(createChannelConnectorDto['channelConnector'])
    }

    @GrpcMethod('ChannelConnectorService', 'UpdateChannel')
    async updateChannelConnector(@Body() updateChannelConnectorDto: UpdateChannelConnectorDto): Promise<any> {
        return await this.channelConnectorService.update(updateChannelConnectorDto)
    }

    // @Patch()
    // async patchChannelConnector(@Body() updateChannelConnectorDto: UpdateChannelConnectorDto): Promise<any> {
    //     return await this.channelConnectorService.update(updateChannelConnectorDto)
    // }
}

