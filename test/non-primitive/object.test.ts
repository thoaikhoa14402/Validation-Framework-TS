import VFT from "../..";
import errorCtx, { ValidationErrorContext } from "../../common/errors/error.ctx";

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

// try {
//     // const user = userSchema.validate({
//     //     name: {
//     //         firstName: '',
//     //         lastName: 'xyz',
//     //     },
//     //     email: 'none',
//     //     address: null,
//     // }, {stopOnFailure: false}); // expected error

//     const user = userSchema.validate({
//         name: {
//             firstName: 'abc',
//             lastName: 'xyz',
//         },
//         email: 'nguyenthoaidangkhoa@gmail.com',
//         address: 'a'
//     }, {stopOnFailure: false}); // expected true

//     console.log('user: ', user);
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }


try {
    const student = userSchema.clone().shape({
        // name: VFT.object({
        //     firstName: VFT.string().maxLength(2),
        // }),
        studentID: VFT.string().test((value: string, errorCtx: ValidationErrorContext) => {
            if (value.includes('hcmus_student_')) return true;
            return errorCtx.createError({
                message: 'This is not a valid student ID',
            })
        }),
        address: VFT.string().minLength(3, 'must be at least 3 characters long'),
    }).validate({
    name: {
        firstName: 'abc',
        lastName: 'xyz',
    },
    email: '14442002',
    address: 'ab',
    studentID: 'hcmus_student_20127043',
}, {stopOnFailure: false})
console.log('student: ',student);

} catch (err: any) {
    console.log('Error messages: ', err.message);
    console.log('Validation Errors: ', err.validationErrors);
}


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
        email: '14442002',
        address: null
    }, {stopOnFailure: false}); // expected true

    console.log('user: ', user);
} catch (err: any) {
    console.log('Error messages: ', err.message);
    console.log('Validation Errors: ', err.validationErrors);
}