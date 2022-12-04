function EndpointException(message, metadata) {
    const error = new Error(message);
    error.metadata = metadata;
    return error;
}

function HTTPException(message, metadata) {
    const error = new Error(message);
    error.metadata = metadata;
    return error;
}