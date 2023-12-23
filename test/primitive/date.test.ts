import VFT from "../..";
import { ValidatorTemplate } from "../../common/validator.template";

// ===================== CHAIN VALIDATION =====================
const dateValidator = VFT.date().isValid();

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
try {
    const result1 = dateValidator.validate('04/28/2024'); // expected true
    // const result2 = dateValidator.validate('04/45/2024', {stopOnFailure: false}); // expected error
    console.log('Result of validation: ', result1);
} catch (err: any) {
    console.log('Error messages: ', err.message);
    console.log('Validation Errors: ', err.validationErrors);
}

