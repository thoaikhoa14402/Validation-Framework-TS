import VFT from "../..";
import { ValidationErrorContext } from "../../common/errors/error.ctx";

const userSchema = VFT.object({
    name: VFT.object({
        firstName: VFT.string().notEmpty(),
        lastName: VFT.string().notEmpty(),
    }),
    email: VFT.string().email('must be an valid email address'),
    address: (value: unknown, errCtx: ValidationErrorContext) => {
        if (value === null) {
            return errCtx.createError({
                message: 'Your address must not be null',
                value: value,
            })
        } 
        // Value is not null, so use a string validator to validate it.
        if (value) {
            return VFT.string().notEmpty().validate(value as string, {stopOnFailure: false});
        }
    }
});

try {
    // const user = userSchema.validate({
    //     name: {
    //         firstName: '',
    //         lastName: 'xyz',
    //     },
    //     email: 'none',
    //     address: null,
    // }, {stopOnFailure: false}); // expected error

    const user = userSchema.validate({
        name: {
            firstName: 'abc',
            lastName: 'xyz',
        },
        email: 'nguyenthoaidangkhoa@gmail.com',
        address: 'a'
    }, {stopOnFailure: false}); // expected true

    console.log('user: ', user);
} catch (err: any) {
    console.log('Error messages: ', err.message);
    console.log('Validation Errors: ', err.validationErrors);
}

