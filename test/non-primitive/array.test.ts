import VFT from "../..";

// ===================== LENGTH VALIDATION =====================
const maxLengthValidator = VFT.array()
  .maxLength(5)
  .length(2)
  .of(VFT.string().notEmpty());
try {
  const result1 = maxLengthValidator.validate(["1", "2", "3", "4"], {
    stopOnFailure: false,
  }); // expected true
  console.log("Result of max length validator: ", result1);
} catch (err: any) {
    console.log('Error messages: ', err.message);
    console.log('Validation Errors: ', err.validationErrors);
}

// ===================== MIN LENGTH VALIDATION =====================
// const minLengthValidator = VFT.array()
//   .minLength(2)
//   .length(4)
//   .of(VFT.string().notEmpty());
// try {
//   const result1 = minLengthValidator.validate(["1", "2", "3", "4"], { // expected true
//     stopOnFailure: false,
//   }); // expected true
//   console.log("Result of max length validator: ", result1);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== MIN LENGTH VALIDATION =====================
// const minLengthValidator2 = VFT.array()
//   .minLength(2)
//   .length(4)
//   .of(VFT.string().notEmpty());
// try {
//   const result1 = minLengthValidator2.validate(["1"], { // expected false
//     stopOnFailure: false,
//   }); // expected true
//   console.log("Result of max length validator: ", result1);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

