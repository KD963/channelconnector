export enum response {
    Error = "Error",
    Success = "Success"
}

export enum httpcode {
    Success = 200,
    BadRequest = 400,
    InternalServerError = 500,
    Forbidden = 403,
    NotFound = 404,
    Found = 302,
    Notmodified = 304,
    Unauthorized = 401,
    AlreadyExists = 409


}

export enum message {
    AlreadyExists = "Channel Connector already exists; couldn't able to create the same channel again",
    Success = "Success",
    Failed = "Something went wrong",
    NotFound = "Not Found",
    DuplicateRequest = "Duplicate request",
    Error = "Internal server error",
    ChannelConnectorCreated = "Channel Connector has been created successfully",
    NotExists = "Channel Connector doesn't exists",
    ChannelConnectorUpdated = "Channel Connector has been updated successfully",
    FailedToUpdate = "Channel Connector has not been updated."
}


export const api = {
    params: {
        createchannelconnector: ['user_name', 'password', 'valid', 'connector_call', 'on_off', 'admin_active', 'seller_active'],
        getallchannelconnector: [],
        getchannelconnector: ['marketplace_id'],
        updatechannelconnector: []
    }
}
