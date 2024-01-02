import VFT from "../..";
import { ValidationErrorContext } from "../../common/errors/error.ctx";

const mixedValidator = VFT.mixed()
  .addMethod("isEqual", (value: string, errCtx: any) =>
    value === "test"
      ? true
      : errCtx!.createError({
          message: "The string is not equal to test",
          value: value,
        })
  )
  .addMethod("isNotEqual", (value: string, errCtx: ValidationErrorContext) =>
    value !== "test"
      ? true
      : errCtx!.createError({
          message: "The string is equal to test",
          value: value,
        })
  );

const chainValidator = mixedValidator.isEqual().isNotEqual();

try {
  const result1 = chainValidator.validate("test", {
    stopOnFailure: false,
  });

  console.log("Result of mixed validator: ", result1);
} catch (err: any) {
  console.log("Error messages: ", err.message);
  console.log("Validation Errors: ", err.validationErrors);
}
