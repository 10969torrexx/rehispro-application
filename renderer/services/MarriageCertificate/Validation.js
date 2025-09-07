import Rules from './Rules.json'

export function validateForm(data, page){
    const errors = {};
    const rules = Rules[`page${page}`];
    for (const field in rules) {
        const value = data[field];
        const rule = rules[field];

        if (rule.required && (!value || value.toString().trim() === "")) {
            errors[field] = rule.message.required;
        }

        if (rule.minLength && value && value.length < rule.minLength) {
            errors[field] = rule.message.minLength;
        }

        if (rule.maxLength && value && value.length > rule.maxLength) {
            errors[field] = rule.message.maxLength;
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

        if (rule.type === "date" && value) {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                errors[field] = rule.message.date;
            }
        }

    }

    return errors;
}