// const Validator = require("validator");
// const isEmpty = require("./is-empty");

// module.exports = function validateServerCreation(data) {
//   let errors = {};

//   data.name = !isEmpty(data.name) ? data.name : "";
//   data.owner = !isEmpty(data.owner) ? data.owner : "";

//   if (!Validator.isLength(data.name, { min: 1, max: 20 })) {
//     errors.name = "Server must be between 1 and 20 characters";
//   }

//   if (Validator.isEmpty(data.name)) {
//     errors.name = "Server needs a name";
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };
