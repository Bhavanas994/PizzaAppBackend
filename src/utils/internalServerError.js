const AppError = require("./appError");

class InternalServerError extends AppError {
    constructor() {
       
            super(`Its not you its our server where Something went wrong `,500);
    }
}

module.exports = InternalServerError;