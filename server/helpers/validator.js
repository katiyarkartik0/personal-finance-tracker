class Validator {
  constructor() {}
  inputValidation(inputs) {
    const arrayOfInputs = Object.keys(inputs);
    for (let i = 0; i < arrayOfInputs.length; i++) {
      const inputKey = arrayOfInputs[i];
      const input = inputs[inputKey];
      if (!input) {
        return {
          isInputValid: false,
          msg: `${inputKey} field cannot be empty`,
        };
      }
      if (inputKey === "email") {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input) == false
        ) {
          return {
            isInputValid: false,
            msg: "email address entered is not valid",
          };
        }
      }
    }
    return {
      isInputValid: true,
    };
  }
  dateValidation(date) {

    for (const attribute in date) {
      if (typeof date[attribute] !== "number") {
        console.log(date[attribute], typeof date[attribute])
        return {
          isValidDate: false,
          msg: "please enter a valid data type",
        };
      }
      if (attribute === "year") {
        const { year } = date;
        if (year < 0) {
          return {
            isValidDate: false,
            msg: "please enter a valid input of date",
          };
        }
      }
      if (attribute === "month") {
        const { month } = date;

        if (month < 1 || month > 12) {
          return {
            isValidDate: false,
            msg: "please enter a valid input of date",
          };
        }
      }
      if (attribute === "day") {
        const { day } = date;
        if (day < 1 || day > 31) {
          return {
            isValidDate: false,
            msg: "please enter a valid input date",
          };
        }
      }
    }
    return {
      isValidDate: true,
    };
  }
}

module.exports = { Validator };
