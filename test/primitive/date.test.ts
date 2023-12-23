import VFT from "../..";
import { ValidatorTemplate } from "../../common/validator.template";

// ===================== CHAIN VALIDATION =====================
const dateValidator = VFT.date().isValid();

try {
    const result1 = dateValidator.validate('2024-04-45'); // expected true
    const result2 = dateValidator.validate('2024-04-28', {stopOnFailure: false}); // expected error
    console.log('Result of validation: ', result1);
} catch (err: any) {
    console.log('Error messages: ', err.message);
    console.log('Validation Errors: ', err.validationErrors);
}

