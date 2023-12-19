import VFT from "../..";

type LineItem = {
    name: string;
    manufacturer: string;
}

type PurchaseRequest = {
    token: string;
    line_item: LineItem;
    /**
     * Customer has the option to tell us a date by which they need the order.
     */
    needed_by: string | null;
}

const objectValidatorEx = VFT.object({
    token: VFT.object({
        age1: VFT.string().email(),
        age2: VFT.string().email(),
    }),
    line_item: VFT.object({
        // name: VFT.string().notEmpty(),
        // manufacturer: VFT.string().notEmpty()
        name: VFT.string().email(),
        manufacturer: VFT.string().email()
    }),
    needed_by: (value: unknown) => {
        if (value === null) {
            return { ok: true, value: null };
        }
        // Value is not null, so use a string validator to validate it.
        // if (value) {
        //     return VFT.string().notEmpty().validate(value, {stopOnFailure: true});
        // }
    }
});


// const test_1b = objectValidatorEx.clone().shape({
//     token: VFT.string().notEmpty().email(),
//     newProp: VFT.string().notEmpty(),
// }).validate({
//     token: "token",
//     line_item: {
//         name: "Widget",
//         manufacturer: "Foo Co."
//     },
//     needed_by: null,
//     newProp: 'New_Prob.',
// }); // { ok: true, value: ... }

const test_1 = objectValidatorEx.validate({
    token: {
        age1: 'nguyenthoaidangkhoa@gmail.com',
        age2: '2',
    },
    line_item: {
        name: "khangdinh@gmail.com",
        manufacturer: "Foo Co."
    },
    needed_by: null
}, {
    stopOnFailure: false,
}); // { ok: true, value: ... }



// const test_2 = objectValidatorEx.validate({
//     token: "token",
//     line_item: {
//         name: "Widget",
//         manufacturer: "Foo Co."
//     },
//     needed_by: null
// }); // { ok: true, value: ... }

// const test_3 = objectValidatorEx.validate({
//     token: "token",
//     needed_by: null
// }); // { ok: false, message: "Value is missing expected property line_item." }

// const test_4 = objectValidatorEx.validate("foo"); // { ok: false, message: "Value must be an object but was string." }


console.log('Test 1: ', test_1);
// console.log('Test 1b: ', test_1b);
// console.log('Test 2: ', test_2);
// console.log('Test 3: ', test_3);
// console.log('Test 4: ', test_4);
