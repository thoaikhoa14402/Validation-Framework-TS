import VFT from "../..";
import { ValidatorTemplate } from "../../common/validator.template";

// ===================== CHAIN VALIDATION =====================
const chainValidator = VFT.string().notEmpty().minLength(5, 'must be at least 5 characters long').email('must be a valid email address');

try {
    const result1 = chainValidator.validate('nguyenthoaidangkhoa@gmail.com'); // expected true
    // const result1 = chainValidator.validate('@@@', {stopOnFailure: false}); // expected error
    console.log('Result of validation: ', result1);
} catch (err: any) {
    console.log('Error messages: ', err.message);
    console.log('Validation Errors: ', err.validationErrors);
}


// ===================== MAX LENGTH VALIDATION =====================
// const maxLengthValidator = VFT.string().maxLength(5, 'must be at most 5 characters long');

// try {
//     // const result1 = maxLengthValidator.validate('12345'); // expected true
//     const result1 = maxLengthValidator.validate('123456'); // expected error
//     console.log('Result of max length validation: ', result1);
// } catch (err: any) {
    // console.log('Error messages: ', err.message);
    // console.log('Validation Errors: ', err.validationErrors);
// }


// ===================== MIN LENGTH VALIDATION =====================
// const minLengthValidator = VFT.string().minLength(5, 'must be at least 5 characters long');

// try {
//     // const result2 = minLengthValidator.validate('12345'); // expected true
//     const result2 = minLengthValidator.validate('1234'); // expected error
//     console.log('Result of min length validator: ', result2);
// } catch (err: any) {
//    console.log('Error messages: ', err.message);
//    console.log('Validation Errors: ', err.validationErrors);
// }


// ===================== EMAIL VALIDATION =====================
// const emailValidator = VFT.string().email('must be a valid email address');

// try {
//     // const result3 = emailValidator.validate('20127043@student.hcmus.edu.vn'); // expected true
//     const result3 = emailValidator.validate('20127043'); // expected error
//     console.log('Result of email validator: ', result3);
// } catch(err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }


// ===================== NOT EMPTY VALIDATION =====================
// const notEmptyValidator = VFT.string().notEmpty('must be not empty');

// try {
//     // const result3 = notEmptyValidator.validate('20127043@student.hcmus.edu.vn'); // expected true
//     const result3 = notEmptyValidator.validate(''); // expected error
//     console.log('Result of not empty: ', result3);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }


// ===================== ARBITRARY REGEX VALIDATION =====================
// let validIP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

// const regexValidator = VFT.string().matches(validIP, 'must be a valid IP address');

// try {
// // const result4 = regexValidator.validate('127.0.0.1'); // expected true
// const result4 = regexValidator.validate('0903861717'); // expected error
// console.log('Result of regex validator: ', result4);
// } catch(err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }


// ===================== CUSTOM VALIDATION ===================== 
// const customValidator = VFT.string().test((value: string, errCtx: any) => {
//     if (value.startsWith('@')) {
//         return true;
//     }
//     return errCtx!.createError({message: 'Your string is invalid', value: value})
// });

// try {
// // const customString = customValidator.validate('@20127043'); // expected true 
// const customString = customValidator.validate('20127043'); // expected error 
// console.log('Result of custom validator: ', customString);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== UPPERCASE CASE =====================
// const upperCaseValidator = VFT.string().upperCase();
// try {
//     const customString = upperCaseValidator.validate('aBc');
//     console.log("Result of custom validator: ", customString);
// } catch(err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

//===================== SPECIAL CHARACTER CASE =====================
const upperCaseValidator = VFT.string().upperCase().specialCharacter();
try {
    const customString = upperCaseValidator.validate('abc#');
    console.log("Result of custom validator: ", customString);
} catch(err: any) {
    console.log('Error messages: ', err.message);
    console.log('Validation Errors: ', err.validationErrors);
}

// ===================== SPECIAL CASE =====================
// try {
//     const customString = customValidator.validate(undefined);
//     console.log("Result of custom validator: ", customString);
// } catch(err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }
