import VFT from "../..";
import { ValidationErrorContext } from "../../common/errors/error.ctx";

// ===================== TRUE FALSE VALIDATION BY BOOLEAN=====================
// const boolValidator = VFT.boolean().truthy();
// try {
//   // const result1 = boolValidator.validate(true, {stopOnFailure: false}); // expected true
//   const result1 = boolValidator.validate(false, {stopOnFailure: false}); // expected false
//   console.log("Result of boolean validator: ", result1);
// } catch (err: any) {
//    console.log('Error messages: ', err.message);
//    console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== TRUE FALSE VALIDATION BY FUNCTION=====================
// const boolValidator = VFT.boolean();

// const isPrime: (num: number) => boolean = num => {
//   for (let i: number = 2, s = Math.sqrt(num); i <= s; i++) {
//     if (num % i === 0) return false;
//   }
//   return num > 1;
// }

// const incrementNumber: (num: number) => number = num =>{
//   return num++;
// }

// try {
//   // const result1 = boolValidator.validate(isPrime(7), {stopOnFailure: false}); // expected true
//   const result1 = boolValidator.validate(incrementNumber(7), { stopOnFailure: false }); // expected false
//   console.log("Result of boolean validator: ", result1);
// } catch (err: any) {
//   console.log('Error messages: ', err.message);
//   console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== TRUE FALSE VALIDATION BY TERNARY OPERATOR =====================
// const boolValidator = VFT.boolean();

// const num: number = 0;

// try {
//   //check whether num is equal to 0
//   // const result1 = boolValidator.validate(num === 0 ? true : false, {stopOnFailure: false}); // expected true
//   // const result1 = boolValidator.validate(num === 0, {stopOnFailure: false}); // expected true
//   const result1 = boolValidator.validate(num === 0 ? "true" : "false", { stopOnFailure: false }); // expected false
//   console.log("Result of boolean validator: ", result1);
// } catch (err: any) {
//   console.log('Error messages: ', err.message);
//   console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== MIXED VALIDATION =====================
// const b = VFT.boolean().addMethod(
//   "isCheck",
//   (value: boolean, errCtx: ValidationErrorContext) => {
//     return value
//       ? true
//       : errCtx!.createError({
//           message: "The value is false",
//           value: value.toString(),
//         });
//   }
// );

// const boolValidator = b.isCheck();

// try {
//   const result1 = boolValidator.validate(false, { stopOnFailure: false });
//   console.log("Result of boolean validator: ", result1);
// } catch (err: any) {
//   console.log("Error messages: ", err.message);
//   console.log("Validation Errors: ", err.validationErrors);
// }
