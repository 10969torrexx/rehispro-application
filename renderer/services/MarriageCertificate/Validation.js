import Rules from './Rules.json'

export function validateForm(data, page) {
    const errors = {};
    const rules = Rules[`page${page}`];
    for (const field in rules) {
        const value = data[field];
        const rule = rules[field];

        if (page === 5) {
            if (data.certification === "LICENSE") {
                ["marriageLicenseNo", "marriageIssuedOn", "marriageIssuedAt"].forEach(f => {
                    if (rules[f]) rules[f].required = true;
                });
                if (rules.executiveOrder) rules.executiveOrder.required = false;
            }
            else if (data.certification === "NOLICENSE") {
                if (rules.executiveOrder) rules.executiveOrder.required = true;
                ["marriageLicenseNo", "marriageIssuedOn", "marriageIssuedAt"].forEach(f => {
                    if (rules[f]) rules[f].required = false;
                });
            }
            else if (data.certification === "OTHERS") {
                if (rules.executiveOrder) rules.executiveOrder.required = false;
                ["marriageLicenseNo", "marriageIssuedOn", "marriageIssuedAt"].forEach(f => {
                    if (rules[f]) rules[f].required = false;
                });
            }
            else {
                // If no option selected at all
                errors.certification = "Please select an option (a, b, or c).";
            }
        }


        if (page === 9) {
            // Statement 1
            if (data.statement1OptionA) {
                ["statement1MarriageWith", "statement1PlaceA", "statement1DateA"].forEach(f => {
                    if (rules[f]) rules[f].required = true;
                });
            }
            if (data.statement1OptionB) {
                ["statement1MarriageBetween", "statement1PlaceB", "statement1DateB"].forEach(f => {
                    if (rules[f]) rules[f].required = true;
                });
            }

            // Statement 2 - ceremony type (at least one must be checked)
            const ceremonyFields = ["ceremonyReligious", "ceremonyCivil", "ceremonyMuslim", "ceremonyTribal"];
            const ceremonySelected = ceremonyFields.some(f => data[f] === true);
            if (!ceremonySelected) {
                errors.ceremony = "At least one ceremony type must be selected.";
            }

            // Statement 3
            if (data.marriageWithLicense) {
                ["marriageLicenseNo", "marriageIssuedOn", "marriageIssuedAt"].forEach(f => {
                    if (rules[f]) rules[f].required = true;
                });
            }
            if (data.marriageUnderArticle) {
                ["articleNumber"].forEach(f => {
                    if (rules[f]) rules[f].required = true;
                });
            }
        }

        if (rule.required && (!value || value.toString().trim() === "")) {
            errors[field] = rule.message.required;
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

        if (rule.type === "time" && value) {
            const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
            if (!timeRegex.test(value)) {
                errors[field] = rule.message.time;
            }
        }

        if (rule.type === "boolean") {
            if (rule.required && value !== true) {
                errors[field] = rule.message.required;
            } else if (value !== undefined && typeof value !== "boolean") {
                errors[field] = rule.message.boolean;
            }
        }

    }

    return errors;
}