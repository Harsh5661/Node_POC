const fileServices = require("../../DB-Manager/fileServices");
const MESSAGES = require("../../constants/index")
const isDuplicate = (newEmp) => {
    const empData = fileServices.readData();
    let duplicateType = null;

    const isDuplicate = empData.some(emp => {
        if (emp.email === newEmp.email && emp.first_name === newEmp.first_name) {
            duplicateType = MESSAGES.MESSAGE.VALIDATION.duplicateEmpType;
            return true;
        }
        if (emp.email === newEmp.email) {
            duplicateType = MESSAGES.MESSAGE.VALIDATION.duplicateEmailType;
            return true;
        }
        return false;
    });

    return {
        isDuplicate,
        type: duplicateType
    };
};


const isValidId = (id) => {
    const empData = fileServices.readData();
    return empData.some(emp => emp.id === id);
};

const validateEmpData = (reqBody) => {
    const namePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;

    if (!reqBody.first_name.match(namePattern)) {
        return { valid: false, message: MESSAGES.MESSAGE.VALIDATION.INVALID_FIRST_NAME };
    }

    if (!reqBody.last_name.match(namePattern)) {
        return { valid: false, message: MESSAGES.MESSAGE.VALIDATION.INVALID_LAST_NAME };
    }

    if (!reqBody.email.match(emailPattern)) {
        return { valid: false, message: MESSAGES.MESSAGE.VALIDATION.INVALID_EMAIL };
    }

    //     if(empData.id === reqBody.id){
    //         return {valid: false, message: "ID already Exist."};
    //     }

    return { valid: true };
};

module.exports = {
    isDuplicate,
    isValidId,
    validateEmpData
};
