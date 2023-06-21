// Function To Sort An Array With Reference To Another
export function sortAccording(arrayParam, referenceArray) {
  const result = arrayParam.slice().sort((a, b) => {
    return referenceArray.indexOf(a) - referenceArray.indexOf(b);
  });
  return result;
}

export function isValidUrl(url = '') {
  const pattern = new RegExp(
    /^((http[s]?|ftp):\/)?\/?([^:/\s]+)((\/\w+)*\/)([\w\-.]+[^#?\s]+)(.*)?(#[\w-]+)?$/,
  );
  return pattern?.test(url?.toString());
}

export function sortObjArray(key) {
  return (a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  };
}
