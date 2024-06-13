const sendSuccessResponse = (res, message, data) => {
    const response = {
        result: {
            code: '200',
            message: message,
            success: true,
        }
    };

    // Only include the data field if data is not undefined
    if (data !== undefined) {
        response.data = data;
    }

    res.status(200).json(response);
};


const sendFailureResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        message: message
    });
};

module.exports = {
    sendSuccessResponse,
    sendFailureResponse
    // other exports...
};
