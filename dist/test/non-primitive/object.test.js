"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../.."));
const userSchema = __1.default.object({
    name: __1.default.object({
        firstName: __1.default.string().notEmpty().minLength(2),
        lastName: __1.default.string().notEmpty(),
    }),
    age: __1.default.number().min(16),
    email: __1.default.string().email("must be an valid email address"),
    personalAddress: (value, errCtx) => {
        if (value === null) {
            return errCtx.createError({
                message: "Your address must not be null",
                value: value,
            });
        }
        // Value is not null, so use a string validator to validate it.
        if (value) {
            return __1.default.string()
                .notEmpty()
                .validate(value, { stopOnFailure: false });
        }
    },
    company: __1.default.object({
        address: __1.default.object({
            city: __1.default.string().notEmpty("city must be not empty"),
            district: __1.default.string().notEmpty("district must be not empty"),
            zipCode: __1.default.string().matches(/^\d{5,6}$/, "This is not valid ZIP code"), // Vietnam's ZIP codes
        }),
        startDate: __1.default.date().isValid(),
        title: __1.default.string().notEmpty(),
    }),
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
    const student = userSchema
        .clone()
        .shape({
        studentID: __1.default.string().test((value, errorCtx) => {
            if (value.startsWith("hcmus_student_"))
                return true;
            return errorCtx.createError({
                message: "This is not a valid student ID",
            });
        }),
        age: __1.default.number().min(16),
        personalAddress: __1.default.string().minLength(3, "must be at least 3 characters long"),
        school: (value, errorCtx) => {
            if (value.startsWith("University Of Science"))
                return true;
            return errorCtx.createError({
                message: "Invalid university name.",
                path: "school",
                value: value,
            });
        },
    })
        .validate({
        name: {
            firstName: "abc",
        },
        age: 16,
        email: "nguyenthoaidangkhoa@gmai.com",
        personalAddress: "Vo Oanh Street",
        studentID: "hcmus_student_20127043",
        company: {
            address: {
                city: "",
                district: "",
                zipCode: "70000",
            },
            startDate: "12/24/2022",
            title: "Junior",
        },
        school: "!University Of Science",
    }, { stopOnFailure: false }); // expected error
    console.log("student: ", student); // if object is valid
}
catch (err) {
    console.log("Error messages: ", err.message);
    console.log("Validation Errors: ", err.validationErrors);
}
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
