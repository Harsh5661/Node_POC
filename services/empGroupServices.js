const responseServices = require('./responseUsageServices');
const MESSAGES = require('../constants/index');
const empValidationServices = require('../services/validations/empValidationServices');
const fileServices = require('../DB-Manager/fileServices');

function getEmployeeById(id, empData, res) {
    if (empValidationServices.isValidId(id)) {
        const emp = empData.find((emp) => emp.id == id);
        return responseServices.sendSuccessResponse(res, MESSAGES.MESSAGE.SUCCESS.GET_SUCCESS, emp)
    }
    else {
        return responseServices.sendFailureResponse(res, MESSAGES.STATUS_CODES.NOT_FOUND, MESSAGES.MESSAGE.Error.DATA_NOT_FOUND);
    }
}
function addEmployee(reqBody, res) {
    const empData = fileServices.readData();
    const newId = empData.length + 1;
   const duplicateCheck = empValidationServices.isDuplicate(reqBody);

    if (!duplicateCheck.isDuplicate) {
        const newEmployee = {
            ...reqBody,
            id: newId
        };
        empData.push(newEmployee);
        fileServices.writeData(empData);
        return responseServices.sendSuccessResponse(res, MESSAGES.MESSAGE.SUCCESS.POST_SUCCESS, newEmployee);
    }
    else {
        const errorMessage = duplicateCheck.type === MESSAGES.MESSAGE.VALIDATION.duplicateEmpType
            ? MESSAGES.MESSAGE.VALIDATION.EMPLOYEE_EXIST
            : MESSAGES.MESSAGE.VALIDATION.EMAIL_EXIST;
        return responseServices.sendFailureResponse(res, MESSAGES.STATUS_CODES.BAD_REQUEST, errorMessage);
    }
}

function editEmployee(id, reqBody, res) {
    const validation = empValidationServices.validateEmpData(reqBody);
    const empData = fileServices.readData();
    const empIndex = empData.findIndex(emp => emp.id === id);
    if (empIndex === -1)
        return responseServices.sendFailureResponse(res, MESSAGES.STATUS_CODES.NOT_FOUND, MESSAGES.MESSAGE.Error.DATA_NOT_FOUND);

    if (!validation.valid) {
        return res.status(MESSAGES.STATUS_CODES.BAD_REQUEST).json({ error: validation.message });
    }

    const updatedEmp = {
        ...empData[empIndex],
        ...reqBody, // Assuming reqBody contains the fields to be updated
        id: empData[empIndex].id // Ensure ID remains unchanged
    };

    empData[empIndex] = updatedEmp;
    fileServices.writeData(empData);
    return responseServices.sendSuccessResponse(res, MESSAGES.MESSAGE.SUCCESS.PUT_SUCCESS, updatedEmp);

}

function deleteEmployee(id, res) {
    const empData = fileServices.readData();
    const empIndex = empData.findIndex(emp => emp.id === id);
    if (empIndex === -1) {
        return responseServices.sendFailureResponse(res, MESSAGES.STATUS_CODES.NOT_FOUND, MESSAGES.MESSAGE.Error.DATA_NOT_FOUND);
    }
    if (empValidationServices.isValidId(id)) {
        // Remove the user from the array
        empData.splice(empIndex, 1);

         // Update IDs of remaining employees
        empData.forEach((emp, index) => {
        emp.id = index + 1; // Update ID to be sequential starting from 1
        });

        // Update IDs of remaining employees
        fileServices.writeData(empData);
        return responseServices.sendSuccessResponse(res, MESSAGES.MESSAGE.SUCCESS.DELETE_SUCCESS);
    }
    else
        return responseServices.sendFailureResponse(res, MESSAGES.STATUS_CODES.NOT_FOUND, MESSAGES.MESSAGE.Error.ID_ERR);

}

module.exports = { getEmployeeById, addEmployee, editEmployee, deleteEmployee };