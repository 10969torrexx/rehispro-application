import Rules from './Rules.json';

export const validate = (data) => {
    const errors = {};

    for (const [field, rules] of Object.entries(Rules)) {
        const value = data[field]?.trim?.() || '';

        let regex = null;
        if (rules.pattern) {
            try {
                regex = new RegExp(rules.pattern);
            } catch (e) {
                console.error(`Invalid regex for ${field}:`, e);
            }
        }

        if (rules.required && !value) {
            errors[field] = rules.message.required || "This field is required.";
        } 
        else if (rules.minLength && value.length < rules.minLength) {
            errors[field] = rules.message.minLength || `Minimum length is ${rules.minLength}.`;
        } 
        else if (rules.maxLength && value.length > rules.maxLength) {
            errors[field] = rules.message.maxLength || `Maximum length is ${rules.maxLength}.`;
        } 
        else if (regex && !regex.test(value)) {
            errors[field] = rules.message.pattern || "Invalid format.";
        }
    }

    return errors;
};