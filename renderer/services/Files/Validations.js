import Rules from './Rules.json';
/**
 * TODO: validate the uploaded file
 * @params {file} - The file data
 */
export function validateForm(data) {
    const errors = {};
    const rules = Rules;
    for(const field in rules) {
        const value = data[field];
        const rule = rules[field];

        if (rule.required && (!value || value.length === 0)) {
            errors[field] = rule.message.required;
        }

        const files = Array.isArray(value) ? value : [value];
        for (const file of files) {
            const extension = file.name.split(".").pop().toLowerCase();
            const sizeMB = file.size / (1024 * 1024);

            if (!rule.type.includes(extension)) {
                errors[field] = rule.message.type;
                break;
            }

            if (sizeMB > rule.size) {
                errors[field] = rule.message.size;
                break;
            }
        }
    }

    return errors;
}
