import IrisTheme from './IrisTheme';

const getColor = (color, weight, type = 'solid') => {
  if (color && weight) {
    var upperCase = color ? color.toUpperCase() : null;
    if (IrisTheme[upperCase + weight]) {
      if (type != 'outline') {
        if (weight >= 400) {
          if (
            upperCase == 'YELLOW' ||
            (upperCase == 'ORANGE' && weight == 400)
          ) {
            var textColor = IrisTheme.Text600;
          } else {
            var textColor = IrisTheme.Text100;
          }
        } else {
          var textColor = IrisTheme.Text600;
        }
      } else {
        if (weight == 600) {
          var textColor = IrisTheme.Text100;
        } else {
          var textColor = IrisTheme[upperCase + weight];
        }
      }
    } else {
      if (type == 'outline') {
        var textColor = IrisTheme.PRIMARY400;
        var finalColor = IrisTheme.PRIMARY400;
        return {finalColor, textColor};
      } else {
        var textColor = IrisTheme.Text100;
        var finalColor = IrisTheme.PRIMARY400;
        return {finalColor, textColor};
      }
    }
    var finalColor = IrisTheme[upperCase + weight];
    return {finalColor, textColor};
  } else {
    if (weight) {
      if (type == 'outline') {
        if (weight == 600) {
          var finalColor = IrisTheme.PRIMARY400;
          var textColor = IrisTheme.Text100;
          return {finalColor, textColor};
        } else {
          var finalColor = IrisTheme.PRIMARY400;
          var textColor = IrisTheme.PRIMARY400;
          return {finalColor, textColor};
        }
      } else {
        if (weight == 600) {
          var finalColor = IrisTheme.PRIMARY600;
          var textColor = IrisTheme.Text100;
          return {finalColor, textColor};
        } else {
          var finalColor = IrisTheme.PRIMARY400;
          var textColor = IrisTheme.Text100;
          return {finalColor, textColor};
        }
      }
    } else {
      if (type == 'outline') {
        var textColor = IrisTheme.PRIMARY400;
        var finalColor = IrisTheme.PRIMARY400;
        return {finalColor, textColor};
      } else {
        var textColor = IrisTheme.Text100;
        var finalColor = IrisTheme.PRIMARY400;
        return {finalColor, textColor};
      }
    }
  }
};

export {getColor};
