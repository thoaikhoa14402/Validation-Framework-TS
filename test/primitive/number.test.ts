import VFT from "../..";
import { ValidationErrorContext } from "../../common/errors/error.ctx";

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
//   const positiveResult = positiveValidator2.validate(-1); // expected false
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
// const mixedValidator = VFT.number()
//   .addMethod("isGreater", (value: number, errCtx: ValidationErrorContext) => {
//     return value > 3
//       ? true
//       : errCtx!.createError({
//           message: "The number is not greater than the allowed value.",
//           value: value,
//         });
//   })
//   .addMethod("isLess", (value: number, errCtx: ValidationErrorContext) => {
//     return value < 5
//       ? true
//       : errCtx!.createError({
//           message: "The number is not less than the allowed value.",
//           value: value,
//         });
//   });

// const chainValidator = mixedValidator.isGreater().isLess().negative();
// try {
//   const result1 = chainValidator.validate(2, { stopOnFailure: false });
//   console.log("Result of mixed validator: ", result1);
// } catch (err: any) {
//   console.log("Error messages: ", err.message);
//   console.log("Validation Errors: ", err.validationErrors);
// }

// ===================== CHAIN METHOD =====================
// const validator = VFT.number().negative().min(-1).max(0.1);
// try {
//   // const result1 = validator.validate(-1.1, { stopOnFailure: false }); // expected false
//   // const result1 = validator.validate(-1.0, { stopOnFailure: false }); // expected true
//   // const result1 = validator.validate(-0.9999, { stopOnFailure: false }); // expected true
//   // const result1 = validator.validate(0, { stopOnFailure: false }); // expected false
//   const result1 = validator.validate(0.11, { stopOnFailure: false }); // expected false

//   console.log("Result of positive validator: ", result1);
// } catch (err: any) {
//   console.log('Error messages: ', err.message);
//   console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== CHAIN METHOD 2 =====================
// const validator = VFT.number().negative().min(-1).max(0.1).range(-0.5, 0.01);
// try {
//   // const result1 = validator.validate(-1.1, { stopOnFailure: false });
//   // const result1 = validator.validate(-0.49, { stopOnFailure: false }); // true
//   const result1 = validator.validate(0, { stopOnFailure: false });

//   console.log("Result of positive validator: ", result1);
// } catch (err: any) {
//   console.log('Error messages: ', err.message);
//   console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== CHAIN METHOD 3 =====================
// const mixedValidator = VFT.number()
//   .addMethod("isGreaterThan3", (value: number, errCtx: ValidationErrorContext) => {
//     return value > 3
//       ? true
//       : errCtx!.createError({
//           message: "The number is not greater than the allowed value.",
//           value: value,
//         });
//   })
//   .addMethod("isLessThan5", (value: number, errCtx: ValidationErrorContext) => {
//     return value < 5
//       ? true
//       : errCtx!.createError({
//           message: "The number is not less than the allowed value.",
//           value: value,
//         });
//   });

// const chainValidator = mixedValidator.isGreaterThan3().isLessThan5().positive().max(4.5).min(3.5);
// try {
//   // const result1 = chainValidator.validate(4.4, { stopOnFailure: false }); // true
//   // const result1 = chainValidator.validate(4.51, { stopOnFailure: false }); // false
//   // const result1 = chainValidator.validate(4.4, { stopOnFailure: false }); // true
//   // const result1 = chainValidator.validate(3.1, { stopOnFailure: false }); // false
//   // const result1 = chainValidator.validate(3.51, { stopOnFailure: false }); // true
//   const result1 = chainValidator.validate(1.9999, { stopOnFailure: false }); // false


//   console.log("Result of mixed validator: ", result1);
// } catch (err: any) {
//   console.log("Error messages: ", err.message);
//   console.log("Validation Errors: ", err.validationErrors);
// }
