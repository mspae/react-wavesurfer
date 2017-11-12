/**
 * Throws an error if the prop is defined and not an integer or not positive
 *
 * @param {object} props
 * @param {string} propName
 * @param {string} componentName
 * @returns {(Error|void)}
 */
export default function positiveIntegerProptype(
  props: object,
  propName: string,
  componentName: string
): Error | void {
  const value = props[propName];
  if (
    value !== undefined &&
    typeof value === 'number' &&
    (value !== Math.round(value) || value < 0)
  ) {
    return new Error(`Invalid ${propName} supplied to ${componentName},
    expected a positive integer`);
  }

  return null;
}
