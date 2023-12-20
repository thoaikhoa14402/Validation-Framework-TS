import VFT from "../..";

// // ===================== MAX LENGTH VALIDATION =====================
// const maxValidator = VFT.number().integer().min(5).negative();
// try {
//   const result1 = maxValidator.validate(4.4, { stopOnFailure: false }); // expected true
//   // const result1 = maxLengthValidator.validate('123456'); // expected error

//   console.log("Result of max validator: ", result1);
// } catch (e) {
//   console.log(e);
// }

// // ===================== REGEX VALIDATION =====================
// let regex = /^\d{2}([0369]|1[0123456789][0369]|2[0123456789][0369])$/;
// const regexValidator = VFT.number().matches(regex);

// const isValidRegex = regexValidator.validate(18, { stopOnFailure: false });

// // const isValidRegex = regexValidator.validate('1@', { // expected error
// //     stopOnFailure: false
// // });

// console.log("isValidRegex: ", isValidRegex);

// ===================== CUSTOM VALIDATION =====================
const customValidator = VFT.number().test((value: number, errCtx) => {
  if (value > 7) {
    return true;
  }
  return errCtx!.createError({
    message: "Your number is invalid",
    value: value,
  });
}).max(10).integer();

// const customString = customValidator.validate('@20127043', { // expected true
//     stopOnFailure: false
// });

const customString = customValidator.validate(8, {
  // expected error
  stopOnFailure: false,
});

console.log("customValidator: ", customString);
