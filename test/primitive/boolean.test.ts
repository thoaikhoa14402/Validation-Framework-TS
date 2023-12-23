import VFT from "../..";

// ===================== BOOLEAN VALIDATION =====================
// const maxValidator = VFT.boolean().truthy();
// try {
//   const x = 2;
//   const result1 = maxValidator.validate(x + 1 === 3, {stopOnFailure: false}); // expected true

//   console.log("Result of max validator: ", result1);
// } catch (err: any) {
//    console.log('Error messages: ', err.message);
//    console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== BOOLEAN VALIDATION =====================
const maxValidator = VFT.boolean().truthy();
try {
  const result1 = maxValidator.validate(0, {stopOnFailure: false});
  console.log("Result of max validator: ", result1);
} catch (err: any) {
   console.log('Error messages: ', err.message);
   console.log('Validation Errors: ', err.validationErrors);
}