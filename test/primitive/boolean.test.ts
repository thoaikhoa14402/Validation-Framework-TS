import VFT from "../..";

// ===================== TRUE FALSE VALIDATION =====================
const maxValidator = VFT.boolean().truthy();
try {
  const result1 = maxValidator.validate(1, {stopOnFailure: false}); // expected true

  console.log("Result of max validator: ", result1);
} catch (err: any) {
   console.log('Error messages: ', err.message);
   console.log('Validation Errors: ', err.validationErrors);
}