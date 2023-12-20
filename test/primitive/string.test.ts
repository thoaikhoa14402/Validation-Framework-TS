import VFT from "../..";
import { ValidatorTemplate } from "../../common/validator-template";

// ===================== MAX LENGTH VALIDATION =====================
// const maxLengthValidator = VFT.string().maxLength(5, 'must be at most 5 characters long');

// const result1 = maxLengthValidator.validate('12345'); // expected true
// // const result1 = maxLengthValidator.validate('123456'); // expected error

// console.log('Result of max length validator: ', result1);


// ===================== MIN LENGTH VALIDATION =====================
// const minLengthValidator = VFT.string().minLength(5, 'must be at least 5 characters long');

// const result2 = minLengthValidator.validate('12345'); // expected true
// // const result2 = minLengthValidator.validate('1234'); // expected error


// console.log('Result of min length validator: ', result2);


// ===================== EMAIL VALIDATION =====================
// const emailValidator = VFT.string().email('must be a valid email address');

// const result3 = emailValidator.validate('20127043@student.hcmus.edu.vn'); // expected true
// // const result3 = emailValidator.validate('20127043'); // expected error


// console.log('Result of email validator: ', result3);


// ===================== NOT EMPTY VALIDATION =====================
// const emailValidator = VFT.string().notEmpty();

// const result3 = emailValidator.validate('20127043@student.hcmus.edu.vn'); // expected true
// // const result3 = emailValidator.validate(''); // expected error


// console.log('Result of email validator: ', result3);


// ===================== ARBITRARY REGEX VALIDATION =====================
let zipCodeRegex = /\d{5}(-\d{4})?/;
const regexValidator = VFT.string().matches(zipCodeRegex);

// const isValidRegex = regexValidator.validate('90210', { // expected true
//     stopOnFailure: false
// });

const isValidRegex = regexValidator.validate('1@', { // expected error
    stopOnFailure: false
});

console.log('isValidRegex: ', isValidRegex);


// ===================== CUSTOM VALIDATION ===================== 
// const customValidator = VFT.string().test((value: string, errCtx: any) => {
//     if (value.startsWith('@')) {
//         return true;
//     }
//     return errCtx!.createError({message: 'Your string is invalid', value: value})
// });

// // const customString = customValidator.validate('@20127043', { // expected true
// //     stopOnFailure: false
// // });

// const customString = customValidator.validate('@20127043', { // expected error
//     stopOnFailure: false
// });


// console.log('customValidator: ', customString);