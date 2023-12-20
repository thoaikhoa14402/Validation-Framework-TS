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
} catch (e) {
  console.log(e);
}
