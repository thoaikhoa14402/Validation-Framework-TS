import VFT from "../..";

// // ===================== MAX LENGTH VALIDATION =====================
// const maxValidator = VFT.number().integer().min(5).negative();
// try {
//   const result1 = maxValidator.validate(4.4, { stopOnFailure: false }); // expected false

//   console.log("Result of max validator: ", result1);
// } catch (e) {
//   console.log(e);
// }

// // ===================== REGEX VALIDATION =====================
// let regex = /^\d{2}([0369]|1[0123456789][0369]|2[0123456789][0369])$/;
// const regexValidator = VFT.number().matches(regex);

// const isValidRegex = regexValidator.validate(18, { stopOnFailure: false });

// console.log("isValidRegex: ", isValidRegex);

// ===================== CUSTOM VALIDATION =====================
const customValidator = VFT.number()
  .test((value: number, errCtx: any) => {
    if (value > 7) {
      return true;
    }
    return errCtx!.createError({
      message: "Your number is invalid",
      value: value,
    });
  })
  .max(10)
  .integer();

try {
  const customString = customValidator.validate(5, {
    // expected true
    stopOnFailure: false,
  });
  console.log("customValidator: ", customString);
} catch (e) {
  console.log(e);
}

// const customString = customValidator.validate(undefined, {
//   // expected error
//   stopOnFailure: false,
// });
