import validator from 'validator';

class DValidator {

  /**
   * Given input must be a valid name
   * - More than or equal to two chars
   * - input will be trimmed before validate
   * @param input String to validate
   */
  static isName(input) {
    DValidator.forceToString(input);
    return validator.isLength(input, {
      min: 2,
      max: 100,
    });
  }

  static forceToString(input) {
    if (typeof input !== 'string') {
      return `${input}`;
    }

    return input;
  }
}

export default DValidator;
