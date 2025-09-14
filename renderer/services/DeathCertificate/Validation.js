import Rules from './Rules.json';

/**
 * TODO: validate form fields by page
 * @params {number} page - The current page number
 * @params {object} formData - The form data to validate
 * @returns {object} - The validation errors, if any
 */
export function validateForm(data, page) {
  const errors = {};
  const rules = Rules[`page${page}`];
  for (const field in rules) {
    const value = data[field];
    const rule = rules[field];

    if (rule.required && (!value || value.toString().trim() === "")) {
      errors[field] = rule.message.required;
      continue;
    }

    if (rule.requiredOneOf) {
      const hasOne = rule.requiredOneOf.some(f => !!data[f]);
      if (!hasOne) {
        errors[field] = rule.message;
      }
    }

    if (rule.requiredIf) {
      if (typeof rule.requiredIf === "object") {
        const { field: conditionField, value: conditionValue } = rule.requiredIf;
        if (data[conditionField] === conditionValue) {
          if (!value || value.toString().trim() === "") {
            errors[field] = rule.message?.requiredIf || rule.message;
          }
        }
      } 
      else if (typeof rule.requiredIf === "string") {
        const conditionField = rule.requiredIf;
        if (data[conditionField]) {
          if (!value || value.toString().trim() === "") {
            errors[field] = rule.message?.requiredIf || rule.message;
          }
        }
      }
    }

    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = rule.message.minLength;
    }

    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = rule.message.maxLength;
    }

    if (rule.type === "enum" && value && !rule.options.includes(value)) {
      errors[field] = rule.message.enum;
    }

    if (rule.type === "date" && value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        errors[field] = rule.message.date;
      }
    }

    if (rule.type === "number" && value) {
      const num = parseFloat(value);
      if (isNaN(num)) {
        errors[field] = rule.message.number;
      } else {
        if (rule.min !== undefined && num < rule.min) {
          errors[field] = rule.message.min;
        }
        if (rule.max !== undefined && num > rule.max) {
          errors[field] = rule.message.max;
        }
      }
    }

  }

  return errors;
}