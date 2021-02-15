const statusMessages = {
	ERROR_MSG: {
		IMP_ERROR: {
			statusCode: 500,
			message: 'Implementation Error',
			type: 'IMP_ERROR',
			error: {}
		},
		DATA_NOT_FOUND: {
			"statusCode": 404,
			success: false,
			"message": "Data Not Found",
			"type": "DATA_NOT_FOUND"
		},
		FILE_UPLOAD_ERROR: {
			"statusCode": 404,
			"message": "Unable to upload file",
			"type": "FILE_UPLOAD_ERROR"
		},
		EMAIL_NOT_FOUND: {
			"statusCode": 404,
			"message": "Email does not exist.",
			"type": "EMAIL_NOT_FOUND"
		},
		EMAIL_EXIST: {
			"statusCode": 400,
			"message": "Email Already Exist",
			"type": "EMAIL_EXIST"
		},
		INVALID_CREDENTIALS: {
			"statusCode": 404,
			"message": "Invalid credentials provided",
			"type": "INVALID_CREDENTIALS"
		},
		SOMETHING_WENT_WRONG: {
			statusCode: 404,
			message: "Something Went Wrong",
			type: "SOMETHING_WENT_WRONG",
			error: {}
		},
		SOMETHING_WRONG_TO_GET_DATA: {
			statusCode: 404,
			message: "Something Wrong to get Data",
			type: "SOMETHING_WRONG_TO_GET_DATA",
			error: {}
		},
		DATA_EXIST: {
			"statusCode": 404,
			"message": "Data Already Exist",
			"type": "DATA_EXIST"
		},
		EMAIL_OR_PASSWORD: {
			"statusCode": 404,
			success: false,
			"message": "Email Or Password Don't Match",
			"type": "PWD_NOT_MATCH"
		},
		PWD_NOT_MATCH: {
			"statusCode": 400,
			success: false,
			"message": "Password Don't Match",
			"type": "PWD_NOT_MATCH"
		},
		TOKEN_NOT_MATCH: {
			"statusCode": 400,
			success: false,
			"message": "Verify Token Don't Match",
			"type": "TOKEN_NOT_MATCH"
		},
		STATUS_INACTIVE: {
			"statusCode": 400,
			success: false,
			"message": "User Status is Inactive",
			"type": "STATUS_INACTIVE"
		},
		MISSING_AUTH: {
			"statusCode": 401,
			success: false,
			"message": "Missing Authorization Header",
			"type": "MISSING_AUTH"
		},
		UNAUTHORIZATION_ACCESS: {
			"statusCode": 401,
			success: false,
			"message": "Unauthorized Access",
			"type": "UNAUTHORIZATION_ACCESS"
		},
		INAVLID_TOKEN: {
			statusCode: 401,
			success: false,
			message: "Invalid Token",
			type: "INAVLID_TOKEN",
			error: ''
		},
		UNABLE_TO_UPDATE: {
			"statusCode": 404,
			"message": "Unable To Update",
			"type": "UNABLE_TO_UPDATE"
		},
		UNABLE_TO_DELETE: {
			"statusCode": 404,
			"message": "Unable To Delete",
			"type": "UNABLE_TO_DELETE"
		},
		ID_NOT_PRESENT: {
			"statusCode": 404,
			"message": "ID Not Provided",
			"type": "ID_NOT_PRESENT"
		},
		INVALID_EMAIL: {
			"statusCode": 400,
			"message": "Please enter a valid email address",
			"type": "INVALID_EMAIL"
		},
		INVALID_USER_ROLE: {
			"statusCode": 400,
			"message": "Please enter a valid user role",
			"type": "INVALID_USER_ROLE"
		},
		MISSING_PARAM: {
			"statusCode": 400,
			"message": "Missing paramerters",
			"type": "MISSING_PARAM"
		},
		INVALID_PERMISSION: {
			"statusCode": 400,
			"message": "Requested user doesn't has permission",
			"type": "INVALID_PERMISSION"
		},
		MISSING_ADMIN_ID: {
			"statusCode": 400,
			"message": "Admin id is required",
			"type": "MISSING_ADMIN_ID"
		}
	},

	SUCCESS_MSG: {
		SUCCESS: {
			statusCode: 200,
			message: 'Success',
			success: true,
			type: 'SUCCESS',
			data: {}
		},
		PWD_RECOVERY: {
			statusCode: 200,
			message: 'Success',
			success: true,
			type: 'PWD_RECOVERY'
		},
		REGISTRATION: {
			statusCode: 200,
			message: 'Success',
			success: true,
			type: 'REGISTRATION'
		},
		DELETE: {
			statusCode: 200,
			message: 'Record has been deleted successfully',
			type: 'DELETE'
		}
	},

	SERVER_BASE_URL: "http://localhost:5000/"
};
module.exports = statusMessages;