import VFT from "../..";

// ===================== BOOLEAN VALIDATION =====================
const maxValidator = VFT.boolean();
try {
  const x = 2;

  const result1 = maxValidator.validate(x + 1 === 3, {stopOnFailure: false}); // expected true

  console.log("Result of max validator: ", result1);
} catch (err: any) {
   console.log('Error messages: ', err.message);
   console.log('Validation Errors: ', err.validationErrors);
}