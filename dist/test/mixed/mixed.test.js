"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const __1 = __importDefault(require("../.."));
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
const mixedValidator = __1.default.mixed((input) => input instanceof mongoose_1.default.Types.ObjectId)
    .addMethod("isEqual", (input, errCtx) => new mongoose_1.default.Types.ObjectId('507f1f77bcf86cd799439011').equals(input)
    ? true
    : errCtx.createError({
        message: "This ObjectId is not equal to ObjectId('507f1f77bcf86cd799439011')",
        value: input,
    }));
const chainValidator = mixedValidator.isEqual();
try {
    const result2 = chainValidator.validate('@@@', {
        stopOnFailure: false,
    }); // expected error when checking with type constraint
    // const result2 = chainValidator.validate(new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'), {
    //   stopOnFailure: false,
    // }); // expected error when checking with isEqual method
    // const result2 = chainValidator.validate(new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'), {
    //   stopOnFailure: false,
    // }); // expected true
    console.log("Result of mixed validator: ", result2);
}
catch (err) {
    console.log("Error messages: ", err.message);
    console.log("Validation Errors: ", err.validationErrors);
}
