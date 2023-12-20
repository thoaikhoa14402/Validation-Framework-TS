import VFT from "../..";

const userSchema = VFT.object({
    name: VFT.object({
        firstName: VFT.string().notEmpty(),
        lastName: VFT.string().notEmpty(),
    }),
    email: VFT.string().email('must be an valid email address'),
    address: (value: unknown) => {
        if (value === null) {
            return { ok: true, value: null };
        }
        // Value is not null, so use a string validator to validate it.
        if (value) {
            return VFT.string().notEmpty().validate(value as string, {stopOnFailure: true});
        }
    }
});

const test_1 = userSchema.validate({
    name: {
        firstName: 'abc',
        lastName: 'xyz',
    },
    email: 'none',
    address: 'a'
})