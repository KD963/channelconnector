export interface IChannelConnectorRepository<T> {
    getAll(): Promise<T[]>;

    get(id: number): Promise<T>;

    create(data: T | any);

    update(id: number, data: T | any);
}