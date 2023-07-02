// A validate function to validate the form inputs and return the error message and a boolean to indicate if the input is valid or not:

type IvalidateReturnType = {
  isValid: boolean;
  errorMessage: string;
};

type FieldName = "phoneNumber" | "otp" | "name" | "age" | "gender";

export const validate = <T extends FieldName>(
  name: T,
  value: string
): IvalidateReturnType => {
  switch (name) {
    case "phoneNumber":
      if (value.length < 10) {
        return {
          isValid: false,
          errorMessage: "Phone number should be 10 digits",
        };
      }
      return { isValid: true, errorMessage: "" };
    case "otp":
      if (value.length < 6) {
        return {
          isValid: false,
          errorMessage: "OTP should be 6 digits",
        };
      }
      return { isValid: true, errorMessage: "" };

    case "name":
      if (value.length < 3) {
        return {
          isValid: false,
          errorMessage: "Name should be atleast 3 characters",
        };
      }
      return { isValid: true, errorMessage: "" };

    case "age":
      if (value.length < 1) {
        return {
          isValid: false,
          errorMessage: "Age should be atleast 1 characters",
        };
      }
      return { isValid: true, errorMessage: "" };

    case "gender":
      if (value.length < 1) {
        return {
          isValid: false,
          errorMessage: "Gender should be atleast 1 characters",
        };
      }
      return { isValid: true, errorMessage: "" };

    default:
      return { isValid: true, errorMessage: "" };
  }
};
