/**
 * @function underLineFixHTML
 * @summary Used for fixing underline issue in iOS
 * @param {string} text
 * @returns {string} result - fixed HTML Code
 */
export const underLineFixHTML = (text = '') =>
  `<div style="font-family:Helvetica;">${text}</div>`;

/**
 * @typedef {Array<Object>} fontSizes
 * @summary Unifying font sizes used across the entire App.
 * @author Aswin Lakshmanan <aswin.lakshmanan@cloudphysician.net>
 */
const fontSizes = {
  10: {fontSize: 10},
  12: {fontSize: 12},
  14: {fontSize: 14},
  16: {fontSize: 16},
  18: {fontSize: 18},
  20: {fontSize: 20},
  22: {fontSize: 22},
  24: {fontSize: 24},
  26: {fontSize: 26},
  28: {fontSize: 28},
  30: {fontSize: 30},
};

/**
 * @typedef {Object} fontStyles
 * @summary most commonly used font styles grouped together
 * @author Aswin Lakshmanan <aswin.lakshmanan@cloudphysician.net>
 */
const fontStyles = {
  thin: {
    fontFamily: 'Roboto-Thin',
    fontWeight: '100',
  },
  thinItalic: {
    fontFamily: 'Roboto-ThinItalic',
    fontWeight: '100',
  },
  light: {
    fontFamily: 'Roboto-Light',
    fontWeight: '300',
  },
  lightItalic: {
    fontFamily: 'Roboto-LightItalic',
    fontWeight: '300',
  },
  normal: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
  },
  italic: {
    fontFamily: 'Roboto-Italic',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
  },
  mediumItalic: {
    fontFamily: 'Roboto-MediumItalic',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
  },
  boldItalic: {
    fontFamily: 'Roboto-BoldItalic',
    fontWeight: '700',
  },
  black: {
    fontFamily: 'Roboto-Black',
    fontWeight: '900',
  },
  blackItalic: {
    fontFamily: 'Roboto-BlackItalic',
    fontWeight: '900',
  },
};

const fonts = {
  size: fontSizes,
  style: fontStyles,
};

export default fonts;
