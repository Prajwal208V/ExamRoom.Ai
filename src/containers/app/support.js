import {reduxEncrypt} from '../environment/LoginPasswordKey';
import {createTransform} from 'redux-persist';
import {AES, enc} from 'crypto-js';

/**
 * @typedef {Object} storeMigration
 * @property {Number} version - If you are changing the structure of persists,
 * It's going to effect users unless they clear storage. So when major changes in structure,
 * you can specify how the old state from device(Stored in ASync store) must migrate to new State.
 * @author Prajwal V
 */
export const storeMigration = {
  0: state => ({...state}), // This is Migration for Version 0 & state is user persisted state,
};

/**
 * @function initializeTransformer
 * @summary A transformer function for redux persist lock the app true when Rehydration(Redux persist resets state from Storage)
 * @author Prajwal V
 */
export const initializeTransformer = createTransform(
  inBoundState => inBoundState,
  (outboundState, key) => ({
    ...outboundState,
    ...(key === 'app' ? {locked: true} : {}),
  }),
  {whitelist: ['app']},
);

/**
 * @function reduxEncryption
 * @summary A transformer function for redux persist to encrypt and decrypt the Persisted store(Store that's been saved to Async Storage) on Rehydrate.
 * @author Prajwal V
 */

export const reduxEncryption = createTransform(
  (inboundState, key) => {
    if (!inboundState) {
      return inboundState;
    }
    const cryptedText = AES.encrypt(JSON.stringify(inboundState), reduxEncrypt);

    return cryptedText.toString();
  },
  (outboundState, key) => {
    if (!outboundState) {
      return outboundState;
    }
    const bytes = AES.decrypt(outboundState, reduxEncrypt);
    const decrypted = bytes.toString(enc.Utf8);

    return JSON.parse(decrypted);
  },
);
