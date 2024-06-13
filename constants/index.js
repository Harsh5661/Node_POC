const MESSAGE = {
    Error: {
        PATH_ERR: "URL Path Not Found!",
        ID_ERR: "ID Does Not Exists!",
        DATA_NOT_FOUND: "User Not Found!",
        DUPLICATE_ENTRIES: "Employee Already Exist!",
        SERVER_ERR: "Internal Server Error!"
    },

    SUCCESS: {
        GET_SUCCESS: "Success!",
        GET_WITH_ID_SUCCESS: "User Found!.",
        POST_SUCCESS: "Data Added Successfully!",
        PUT_SUCCESS: "User Edited Successfully!",
        DELETE_SUCCESS: "User Deleted Successfully!"
    },

    FILE_PROCESS: {
        READ_ERR: "Error reading file!",
        WRITE_ERR: "Error writing file!",
    },

    VALIDATION: {
        INVALID_FIRST_NAME: "Invalid first name. Name must be alphabetical.",
        INVALID_LAST_NAME: "Invalid last name. Name must be alphabetical.",
        INVALID_EMAIL: "Invalid email. Email must end with @anymail.",
        duplicateEmailType: "Email",
        duplicateEmpType: "Employee",
        EMPLOYEE_EXIST: "Employee with this email and name already exists.",
        EMAIL_EXIST: "Email already exists."
    }

};

const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERR: 500

}

module.exports = { MESSAGE, STATUS_CODES };