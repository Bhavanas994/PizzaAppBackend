const AppError = require("./appError");

class BadRequestError extends AppError {
    constructor(invalidParams) {

       let  message = "";
            invalidParams.forEach( params  => 
            message += `${params}\n`);
       
            super(`The request has the following invalid paramters \n${invalidParams}`,400);
    }
}

module.exports = BadRequestError;