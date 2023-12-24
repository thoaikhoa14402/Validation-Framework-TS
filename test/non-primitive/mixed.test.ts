import VFT from "../..";

VFT.mixed().addMethod(VFT.number(), "isEven", (x: number) => x % 2 === 0);

const chainValidator = VFT.number();

try {
  const result1 = chainValidator.validate(4, {
    stopOnFailure: false,
  }); // expected true
  console.log("Result of mixed validator: ", result1);
} catch (err: any) {
  console.log("Error messages: ", err.message);
  console.log("Validation Errors: ", err.validationErrors);
}
