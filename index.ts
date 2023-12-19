import * as PrimitiveValidators from './primitive';
import * as NonPrimitiveValidators from './non-primitive';

const VFT = Object.assign({}, ...[PrimitiveValidators, NonPrimitiveValidators]);

export default VFT;