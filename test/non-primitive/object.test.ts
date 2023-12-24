import VFT from "../..";
import errorCtx, { ValidationErrorContext } from "../../common/errors/error.ctx";

const userSchema = VFT.object({
    name: VFT.object({
        firstName: VFT.string().notEmpty().minLength(2),
        lastName: VFT.string().notEmpty(),
    }),
    age: VFT.number().min(16),
    email: VFT.string().email('must be an valid email address'),
    personalAddress: (value: unknown, errCtx: ValidationErrorContext) => {
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
    },
    company: VFT.object({
        address: VFT.object({
            city: VFT.string().notEmpty(),
            district: VFT.string().notEmpty(),
            zipCode: VFT.string().matches(/^\d{5,6}$/, 'This is not valid ZIP code') // Vietnam's ZIP codes
        }),
        startDate: VFT.date().isValid(),
        title: VFT.string().notEmpty(),
    })
});

// try {
//     const user = userSchema.validate({
//         name: {
//             firstName: 'i',
//             lastName: 'hmn',
//         },
//         email: 'nguyenthoaidangkhoi@gmai.com',
//         age: 16,
//         personalAddress: 'Vo Oanh Street',
//         company: {
//             address: {
//                 city: 'Ho Chi Minh city',
//                 district: 'Binh Thanh District',
//                 zipCode: '@@@',
//             },
//             startDate: '12/24/2022',
//             title: 'Junior',
//         }
//     }, {stopOnFailure: false}); // expected error

//     console.log('user: ', user); // if object is valid
// } catch (err: any) {
//     console.log('Error messages: ', err.message);
//     console.log('Validation Errors: ', err.validationErrors);
// }

try {
    // const student = userSchema.clone().shape({
    //     studentID: VFT.string().test((value: string, errorCtx: ValidationErrorContext) => {
    //         if (value.startsWith('hcmus_student_')) return true;
    //         return errorCtx.createError({
    //             message: 'This is not a valid student ID',
    //         })
    //     }),
    //     age: VFT.number().min(16),
    //     personalAddress: VFT.string().minLength(3, 'must be at least 3 characters long'),
    // }).validate({
    //     name: {
    //         firstName: 'abc',
    //         lastName: 'xyz'
    //     },
    //     age: 16,
    //     email: 'nguyenthoaidangkhoa@gmai.com',
    //     personalAddress: 'Vo Oanh Street',
    //     studentID: 'hcmus_student_20127043',
    //     company: {
    //         address: {
    //             city: 'Ho Chi Minh',
    //             district: 'Binh Thanh District',
    //             zipCode: '70000'
    //         },
    //         startDate: '12/24/2022',
    //         title: 'Junior',
    //     }
    // }, {stopOnFailure: false}) // expected true

    const student = userSchema.clone().shape({
        studentID: VFT.string().test((value: string, errorCtx: ValidationErrorContext) => {
            if (value.startsWith('hcmus_student_')) return true;
            return errorCtx.createError({
                message: 'This is not a valid student ID',
            })
        }),
        age: VFT.number().min(16),
        personalAddress: VFT.string().minLength(3, 'must be at least 3 characters long'),
    }).validate({
        name: {
            firstName: 'abc',
        },
        age: 16,
        email: 'nguyenthoaidangkhoa@gmai.com',
        personalAddress: 'Vo Oanh Street',
        studentID: 'hcmus_student_20127043',
        company: {
            address: {
                city: '',
                district: '',
                zipCode: '70000'
            },
            startDate: '12/24/2022',
            title: 'Junior',
        }
    }, {stopOnFailure: false}) // expected error

    console.log('student: ',student); // if object is valid
    } catch (err: any) {
    console.log('Error messages: ', err.message);
    console.log('Validation Errors: ', err.validationErrors);
}