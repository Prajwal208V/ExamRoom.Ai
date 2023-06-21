import React, {forwardRef, useMemo} from 'react';
import DefaultTextInput from './DefaultTextinput';
// import MultilineInput from './MultilineInput';
// import DualShiftInput from './DualShiftInput';
// import UnitTypeInput from './UnitTypeInput';
// import ChipsetInput from './ChipsetInput';
// import DualFieldInput from './DualFieldInput';

const IrisTextInput = forwardRef(({type = '', ...restProps} = {}, ref) => {
  switch (type) {
    // case 'multiline':
    //   return <MultilineInput {...restProps} />;
    // case 'dualShift':
    //   return <DualShiftInput {...restProps} />;
    // case 'unit':
    //   return <UnitTypeInput {...restProps} />;
    // // case 'masked':
    // //   return <MaskedInput {...restProps} />;
    // case 'chipset':
    //   return <ChipsetInput {...restProps} />;
    // case 'dualField':
    //   return <DualFieldInput {...restProps} />;
    default:
      return <DefaultTextInput {...restProps} ref={ref} />;
  }
});

export default IrisTextInput;
