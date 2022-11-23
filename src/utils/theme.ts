// ----------------------------------------------------------------------

/** add alpha to HEX color */
export const alpha = (hexColor: string, opacity: number) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);

  if (!result) {
    return 'rgba(0, 0, 0, 1)';
  }

  return (
    'rgba(' +
    parseInt(result[1], 16) +
    ', ' +
    parseInt(result[2], 16) +
    ', ' +
    parseInt(result[3], 16) +
    ', ' +
    opacity +
    ')'
  );
};
