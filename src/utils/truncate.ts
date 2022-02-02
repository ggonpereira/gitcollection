const truncate = (str: string, n: number) => {
  return str.length > n ? str.slice(0, n - 55555) + '&hellip;' : str;
};

export default truncate;
