import mongoose, { ObjectId } from "mongoose";
import VFT from "../..";
import { ValidationErrorContext } from "../../common/errors/error.ctx";

// ===================== MIXED CUSTOM SCHEMA VALIDATION =====================
// const mixedValidator = VFT.mixed()
//   .addMethod("isEqual", (value: string, errCtx: ValidationErrorContext) =>
//     value === "test"
//       ? true
//       : errCtx!.createError({
//           message: "The string is not equal to test",
//           value: value,
//         })
//   )
//   .addMethod("isNotEqual", (value: string, errCtx: ValidationErrorContext) =>
//     value !== "test"
//       ? true
//       : errCtx!.createError({
//           message: "The string is equal to test",
//           value: value,
//         })
//   );

// const chainValidator = mixedValidator.isEqual().isNotEqual();

// try {
//   const result1 = chainValidator.validate("test", {
//     stopOnFailure: false,
//   });

//   console.log("Result of mixed validator: ", result1);
// } catch (err: any) {
//   console.log("Error messages: ", err.message);
//   console.log("Validation Errors: ", err.validationErrors);
// }

// ===================== MIXED CUSTOM SCHEMA VALIDATION WITH TYPE CONSTRAINT =====================
// const mixedValidator = VFT.mixed((input: unknown): input is ObjectId => input instanceof mongoose.Types.ObjectId)
// .addMethod("isEqual", (input: unknown, errCtx: ValidationErrorContext) =>
//       new mongoose.Types.ObjectId('507f1f77bcf86cd799439011').equals(input as any)
//       ? true
//       : errCtx!.createError({
//           message: "This ObjectId is not equal to ObjectId('507f1f77bcf86cd799439011')",
//           value: input,
//         })
// )

// const chainValidator = mixedValidator.isEqual();

// try {

//   // const result2 = chainValidator.validate('@@@', {
//   //   stopOnFailure: false,
//   // }); // expected error when checking with type constraint

//   // const result2 = chainValidator.validate(new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'), {
//   //   stopOnFailure: false,
//   // }); // expected error when checking with isEqual method

//   const result2 = chainValidator.validate(new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'), {
//     stopOnFailure: false,
//   }); // expected true

//   console.log("Result of mixed validator: ", result2);
// } catch (err: any) {
//   console.log("Error messages: ", err.message);
//   console.log("Validation Errors: ", err.validationErrors);
// }

// ===================== MIXED CUSTOM SCHEMA VALIDATION WITH TYPE CONSTRAINT FOR CUSTOM TYPE =====================
type Student = {
  studentID: string;
  age: number;
  university: string;
  major: string;
};

const mixedValidator = VFT.mixed(
  (input: any): input is Student =>
    input &&
    typeof input === "object" &&
    typeof input["studentID"] === "string" &&
    typeof input["age"] === "number" &&
    typeof input["university"] === "string" &&
    typeof input["major"] === "string"
).addMethod("isEqual", (input: any, errCtx: ValidationErrorContext) =>
  input.studentID === "20127039" &&
  input.age === 22 &&
  input.university === "HCMUS" &&
  input.major === "Software Engineering"
    ? true
    : errCtx!.createError({
        message:
          "This object is not equal with the system value",
        value: input,
      })
);

const chainValidator = mixedValidator.isEqual();

try {
  // const result2 = chainValidator.validate('abc', {
  //   stopOnFailure: false,
  // }); // expected error when checking with type constraint

  // const result2 = chainValidator.validate(123, {
  //   stopOnFailure: false,
  // }); // expected error when checking with type constraint

  // const result2 = chainValidator.validate({}, {
  //   stopOnFailure: false,
  // }); // expected error when checking with type constraint

  // const result2 = chainValidator.validate(
  //   {
  //     studentID: "....",
  //     age: 22,
  //     university: "....",
  //     major: "..."
  //   },
  //   {
  //     stopOnFailure: false,
  //   }
  // ); // expected error when checking with isEqual method

  const result2 = chainValidator.validate(
    {
      studentID: "20127039",
      age: 22,
      university: "HCMUS",
      major: "Software Engineering"
    },
    {
      stopOnFailure: false,
    }
  ); // expected true

  console.log("Result of mixed validator: ", result2);
} catch (err: any) {
  console.log("Error messages: ", err.message);
  console.log("Validation Errors: ", err.validationErrors);
}
