export function response_data(response_type, status_code, data = null, message = null) {
    return {
        "type": response_type,
        "code": status_code,
        "data": data,
        "message": message

    };
};
