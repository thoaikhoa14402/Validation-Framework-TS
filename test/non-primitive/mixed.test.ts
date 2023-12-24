import VFT from "../..";

type test = {
  id: string, value: number
}
const customValidator = VFT.mixed().addMethod("isEven", (x: test) => x.id === 'id_1');

const chainValidator = customValidator.isEven();

try {
  const result1 = chainValidator.validate({ id: "id_1", value: 2 }, {
    stopOnFailure: false,
  }); // expected true

  // const result1 = chainValidator.validate({ id: 5, value: 2 }, {
  //   stopOnFailure: false,
  // }); // expected false

  console.log("Result of mixed validator: ", result1);
} catch (err: any) {
  console.log("Error messages: ", err.message);
  console.log("Validation Errors: ", err.validationErrors);
}
