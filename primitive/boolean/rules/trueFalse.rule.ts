// import { errorContext } from "../../../common/errors";
// import { ValidationError } from "../../../common/errors/validation.error";
// import { IBooleanRule } from "./rule.interface";

// export default class TrueFalseRule implements IBooleanRule {
//   static ruleName = 'boolean.rule.trueFalse';
//   static errorMessage = 'The value is not true or false';

//   constructor(errorMsg?: string) {
//     if (errorMsg) TrueFalseRule.errorMessage = errorMsg;
//   }

//   validate(value: boolean): boolean | ValidationError {
//     if (typeof value !== 'boolean') {
//       return errorContext.createError({
//         message: TrueFalseRule.errorMessage,
//         type: TrueFalseRule.ruleName,
//         path: '',
//         value: value,
//       });
//     }
//     return true;
//   }
// }
