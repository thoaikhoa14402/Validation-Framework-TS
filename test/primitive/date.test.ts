import VFT from "../..";
import { ValidatorTemplate } from "../../common/validator.template";

// ===================== CHAIN VALIDATION =====================
// const dateValidator = VFT.date().isValid();

// ===================== CHECK DATE IS VALID FORMAT YYYY/MM/DD =====================
// try {
//     const result1 = dateValidator.validate('2024/04/28'); // expected true
//     // const result2 = dateValidator.validate('2024/04/45', {stopOnFailure: false}); // expected error
//     console.log('Result of validation: ', result1);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== CHECK DATE IS VALID FORMAT MM/DD/YYYY=====================
// const dateValidator = VFT.date().isValid();
// try {
//     const result1 = dateValidator.validate('04/28/2024'); // expected true
//     // const result2 = dateValidator.validate('04/45/2024', {stopOnFailure: false}); // expected error
//     console.log('Result of validation: ', result1);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== CHECK DATE IS EQUAL TO THRESHOLD =====================
// const dateValidator = VFT.date().isValid().equal("04/28/2025");
// try {
//     const result1 = dateValidator.validate('04/28/2025'); // expected true
//     // const result2 = dateValidator.validate('04/45/2024', {stopOnFailure: false}); // expected error
//     // console.log('Result of validation: ', result1);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== CHECK DATE IS LATER TO THRESHOLD =====================
// const dateValidator = VFT.date().isValid().later("04/28/2025");
// try {
//     const result1 = dateValidator.validate('04/28/2026'); // expected true
//     // const result2 = dateValidator.validate('04/28/2024', {stopOnFailure: false}); // expected error
//     console.log('Result of validation: ', result1);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== CHECK DATE IS EARLIER TO THRESHOLD =====================
// const dateValidator = VFT.date().isValid().earlier("04/28/2025");
// try {
//     const result1 = dateValidator.validate('04/28/2024'); // expected true
//     const result2 = dateValidator.validate('04/28/2026', {stopOnFailure: false}); // expected error
//     console.log('Result of validation: ', result1);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== CHECK DATE IS IN DECEMBER =====================
// const dateValidator = VFT.date().isValid().later("12/01/2023").earlier("12/31/2023");
// try {
//     // const result1 = dateValidator.validate('12/23/2023'); // expected true
//     const result2 = dateValidator.validate('01/04/2024', {stopOnFailure: false}); // expected error
//     // console.log('Result of validation: ', result1);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

//===================== CHECK DATE IS IN DECEMBER =====================
// const dateValidator = VFT.date().isValid().later("12/01/2023").earlier("12/31/2023");
// try {
//     // const result1 = dateValidator.validate('12/23/2023'); // expected true
//     const result2 = dateValidator.validate('01/04/2024', {stopOnFailure: false}); // expected error
//     // console.log('Result of validation: ', result1);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

// ===================== CHECK DATE IS IN LEAP YEAR =====================
const dateValidator2 = VFT.date().isValid().leapYear();
try {
    // const result1 = dateValidator2.validate('12/23/2023'); // expected false
    const result2 = dateValidator2.validate('01/04/2024', {stopOnFailure: false}); // expected true
    // console.log('Result of validation: ', result1);
} catch (err: any) {
    console.log('Error messages: ', err.message);
    console.log('Validation Errors: ', err.validationErrors);
}
