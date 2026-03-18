const AppError = require("./appError");

class UnAuthorisedError extends AppError {
    constructor(resource) {
        // properties []
        // let notFoundProperties = ""; 
        // properties.forEach( property  => 
        //     notFoundProperties += `${property} , `);
            super(`User is not authorised properly `,401);
    }
}

module.exports = UnAuthorisedError;