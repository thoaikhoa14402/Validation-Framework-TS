import * as PrimitiveValidators from './primitive';
import * as NonPrimitiveValidators from './non-primitive';
import { ValidatorTemplate } from './common/validator.template';

const allPrimitiveValidators = Object.entries(PrimitiveValidators).map(([key, validator]) => ({
    [key]: () => validator() as ValidatorTemplate<any>
}));

const allNonPrimitiveValidators = Object.entries(NonPrimitiveValidators).map(([key, validator]) => ({
    [key]: (objectSchema?: any) => validator(objectSchema) as ValidatorTemplate<any>
}));

const VFT = Object.assign({}, ...[...allPrimitiveValidators, ...allNonPrimitiveValidators]);

export default VFT;