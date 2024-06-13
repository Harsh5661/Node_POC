const MESSAGES = require("../constants");

function sendGetResponse(res, data, id) {
    try {
        res.json({ status: MESSAGES.MESSAGE.SUCCESS.GET_SUCCESS, data });
    } catch (error) {
        res.status(500).json(MESSAGES.STATUS_CODES.SERVER_ERR);
    }
}

function sendGetIdResponse(res, id, data) {
    try {
        res.json({status: MESSAGES.MESSAGE.SUCCESS.GET_WITH_ID_SUCCESS, data});
    } catch (error) {
        res.status(500).json(MESSAGES.STATUS_CODES.SERVER_ERR);
    }
}

function sendPostResponse(res, data) {
    try {
        res.status(200).json({ status: MESSAGES.MESSAGE.SUCCESS.POST_SUCCESS, data })
    } catch (error) {
        res.status(400).json(MESSAGES.STATUS_CODES.SERVER_ERR);
    }
}

function sendPutResponse(res, id, data) {
    try {
        res.status(200).json({ status: MESSAGES.MESSAGE.SUCCESS.PUT_SUCCESS, data })
    } catch (error) {
        res.status(500).json(MESSAGES.STATUS_CODES.SERVER_ERR);
    }
}

function sendDeleteResponse(res, id) {
    try {
        res.status(200).json({ status: MESSAGES.MESSAGE.SUCCESS.DELETE_SUCCESS})
    } catch (error) {
        res.status(500).json(MESSAGES.STATUS_CODES.SERVER_ERR);
    }
}
module.exports = { sendGetIdResponse, sendGetResponse, sendPostResponse, sendPutResponse, sendDeleteResponse };