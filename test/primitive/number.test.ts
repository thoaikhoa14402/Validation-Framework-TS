import VFT from "../..";

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
const maxValidator = VFT.number().integer().min(5).range(5, 8);
try {
  const result1 = maxValidator.validate(9); // expected false

  console.log("Result of max validator: ", result1);
} catch (err: any) {
   console.log('Error messages: ', err.message);
   console.log('Validation Errors: ', err.validationErrors);
}