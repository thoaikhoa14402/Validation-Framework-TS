"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../.."));
// ===================== MAX LENGTH VALIDATION =====================
// const maxValidator = VFT.number().integer().min(5).negative();
// try {
//   const result1 = maxValidator.validate(4.4); // expected false
//   console.log("Result of max validator: ", result1);
// } catch (err: any) {
//    console.log('Error messages: ', err.message);
//    console.log('Validation Errors: ', err.validationErrors);
// }
// // ===================== REGEX VALIDATION =====================
// let regex = /^\d{2}([0369]|1[0123456789][0369]|2[0123456789][0369])$/;
// const regexValidator = VFT.number().matches(regex);
// try {
//     const result2 = regexValidator.validate(18);
//     console.log("Result of regex validator: ", result2);
// } catch(err: any) {
// console.log('Error messages: ', err.message);
// console.log('Validation Errors: ', err.validationErrors);
// }
// ===================== CUSTOM VALIDATION =====================
// const customValidator = VFT.number().test((value: number, errCtx: any) => {
//   if (value > 7) {
//     return true;
//   }
//   return errCtx!.createError({
//     message: `Your number is less than ${value}`,
//     value: value,
//   });
// }).max(10).integer();
// try {
//   const customString = customValidator.validate(8); // expected true
//   // const customString = customValidator.validate('@20127043'); // expected error
//   console.log('Result of custom validator: ', customString);
// } catch (err: any) {
// console.log('Error messages: ', err.message);
// console.log('Validation Errors: ', err.validationErrors);
// }
// ===================== SPECIAL CASE =====================
// try {
//     const customString = customValidator.validate(undefined);
//     console.log("Result of custom validator: ", customString);
// } catch(err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }
// ===================== RANGE VALIDATION =====================
// const maxValidator = VFT.number().integer().min(5).range(5, 8);
// try {
//   const result1 = maxValidator.validate(7); // expected false
//   console.log("Result of max validator: ", result1);
// } catch (err: any) {
//    console.log('Error messages: ', err.message);
//    console.log('Validation Errors: ', err.validationErrors);
// }
// ===================== DECIMAL VALIDATION =====================
// const maxValidator = VFT.number().decimal();
// try {
// //   const result1 = maxValidator.validate(123.456); // expected true
//   const result1 = maxValidator.validate(7); // expected false
//   console.log("Result of max validator: ", result1);
// } catch (err: any) {
//    console.log('Error messages: ', err.message);
//    console.log('Validation Errors: ', err.validationErrors);
// }
// ===================== POSITIVE VALIDATION TRUE =====================
// const positiveValidator = VFT.number().positive();
// try {
//   const positiveResult = positiveValidator.validate(1); // expected true
//   console.log("Result of positive validator: ", positiveResult);
// } catch (err: any) {
//   console.log('Error messages: ', err.message);
//   console.log('Validation Errors: ', err.validationErrors);
// }
// ===================== POSITIVE VALIDATION FALSE =====================
// const positiveValidator2 = VFT.number().positive();
// try {
//   const positiveResult = positiveValidator.validate(-1); // expected false
//   console.log("Result of positive validator: ", positiveResult);
// } catch (err: any) {
//   console.log('Error messages: ', err.message);
//   console.log('Validation Errors: ', err.validationErrors);
// }
// ===================== NEGATIVE VALIDATION TRUE =====================
// const negativeValidator = VFT.number().negative();
// try {
//   const positiveResult = negativeValidator.validate(-1); // expected true
//   console.log("Result of positive validator: ", positiveResult);
// } catch (err: any) {
//   console.log('Error messages: ', err.message);
//   console.log('Validation Errors: ', err.validationErrors);
// }
// ===================== NEGATIVE VALIDATION FALSE =====================
// const negtiveValidator2 = VFT.number().negative();
// try {
//   const positiveResult = negtiveValidator2.validate(1); // expected false
//   console.log("Result of positive validator: ", positiveResult);
// } catch (err: any) {
//   console.log('Error messages: ', err.message);
//   console.log('Validation Errors: ', err.validationErrors);
// }
// ===================== ADDMETHOD VALIDATION TRUE =====================
const mixedValidator = __1.default.number()
    .addMethod("isGreater", (value, errCtx) => {
    return value > 3
        ? true
        : errCtx.createError({
            message: "The number is not greater than the allowed value.",
            value: value,
        });
})
    .addMethod("isLess", (value, errCtx) => {
    return value < 5
        ? true
        : errCtx.createError({
            message: "The number is not less than the allowed value.",
            value: value,
        });
});
const chainValidator = mixedValidator.isGreater().isLess().negative();
try {
    const result1 = chainValidator.validate(2, { stopOnFailure: false });
    console.log("Result of mixed validator: ", result1);
}
catch (err) {
    console.log("Error messages: ", err.message);
    console.log("Validation Errors: ", err.validationErrors);
}
