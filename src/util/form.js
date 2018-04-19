const disabledDate = (date) => {
  return date && date.valueOf() > Date.now();
};

export {
  disabledDate
};
