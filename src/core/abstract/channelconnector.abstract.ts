import { Repository } from "typeorm";
import { IChannelConnectorRepository } from "./channelconnector.interface";

export const CHANNELCONNECTORABSTRACTREPO = 'CHANNEL CONNECTOR ABSTRACT REPO';

export class ChannelConnectorAbstractRepo<T> implements IChannelConnectorRepository<T> {

    private repo: Repository<T>;


    constructor(repo: Repository<T>) {
        this.repo = repo;
    }

    async getAll(): Promise<T[]> {

        return await this.repo.find();
    }

    async get(id: any): Promise<T> {
        return await this.repo.findOneBy(id)
    }

    async create(data: T) {
        return await this.repo.save(data);

    }

    async update(id: number, data: any) {
        return await this.repo.update(id, data);
    }

}