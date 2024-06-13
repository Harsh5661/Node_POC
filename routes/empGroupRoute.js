const express = require('express');
const empGroupRoute = express.Router();
const readWriteServices = require("../services/readWriteServices");
const empGroupServices = require("../services/empGroupServices");
const responseServices = require("../services/responseUsageServices");
const MESSAGES = require("../constants");
const fileServices = require('../DB-Manager/fileServices');
empGroupRoute.use(express.json());

// GET /emp-data - Get all employee data
empGroupRoute.get("/emp-data", (req, res) => {
    try {
        //const empData = readWriteServices.readJsonFile();
        const empData = fileServices.readData();
        responseServices.sendSuccessResponse(res, MESSAGES.MESSAGE.SUCCESS.GET_SUCCESS, empData);
    } catch (error) {
        return responseServices.sendFailureResponse(res, MESSAGES.STATUS_CODES.SERVER_ERR, MESSAGES.MESSAGE.Error.SERVER_ERR);
    }
});

// POST /emp-data/add-emp-data - add new employee data
empGroupRoute.route("/emp-data/add-emp-data")

    .post((req, res) => {
        try {
            empGroupServices.addEmployee(req.body, res);
        } catch (error) {
            return responseServices.sendFailureResponse(res, MESSAGES.STATUS_CODES.SERVER_ERR, MESSAGES.MESSAGE.Error.SERVER_ERR);
        }
    });

// GET /emp-data/get-emp-data/:id - fetch employee data by id parameter
empGroupRoute.route("/emp-data/get-emp-data/:id")

    .get((req, res) => {
        try {
            const id = Number(req.params.id); // Extract the ID parameter from req.params.id
            //const empData = readWriteServices.readJsonFile(); //read emp data from json file
            const empData = fileServices.readData();
            empGroupServices.getEmployeeById(id, empData, res);
        } catch (error) {
            return responseServices.sendFailureResponse(res, MESSAGES.STATUS_CODES.SERVER_ERR, MESSAGES.MESSAGE.Error.SERVER_ERR);
        }
    });

// PUT /emp-data/edit-emp-data/:id - edit employee data by id parameter
empGroupRoute.route("/emp-data/edit-emp-data/:id")
    .put((req, res) => {
        try {
            const id = Number(req.params.id);
            empGroupServices.editEmployee(id, req.body, res);
        } catch (error) {
            return responseServices.sendFailureResponse(res, MESSAGES.STATUS_CODES.SERVER_ERR, MESSAGES.MESSAGE.Error.SERVER_ERR);
        }
    });

// DELETE /emp-data/delete-emp-data/:id - delete employee data by id parameter
empGroupRoute.route("/emp-data/delete-emp-data/:id")
    .delete((req, res) => {
        try {
            const id = Number(req.params.id);
            empGroupServices.deleteEmployee(id, res);
        } catch (error) {
            return responseServices.sendFailureResponse(res, MESSAGES.STATUS_CODES.SERVER_ERR, MESSAGES.MESSAGE.Error.SERVER_ERR);
        }
    });

module.exports = empGroupRoute;
