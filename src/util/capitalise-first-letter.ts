/**
 * Capitalise the first letter of a string
 *
 * @param {string} string
 * @returns {string}
 */
export default function capitaliseFirstLetter(string: string): string {
  return string
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
