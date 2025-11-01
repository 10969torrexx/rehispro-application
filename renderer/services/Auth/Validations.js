/**
 * TODO: Implement login ID validation
 *  @param {*} loginId 
 * ! at least 5 characters
 * ! at least one symbol
 * ! at least one uppercase letter
 * @returns 
 */
export function validateLoginId(loginId) {
    const minLength = loginId.length >= 5;
    // const hasSymbol = /[^A-Za-z0-9]/.test(loginId);
    // const hasUppercase = /[A-Z]/.test(loginId);
    const hasNoSpaces = !/\s/.test(loginId);

    const errors = {
        minLength: !minLength ? "Login ID must be at least 5 characters long." : null,
        // hasSymbol: !hasSymbol ? "Login ID must contain at least one symbol." : null,
        // hasUppercase: !hasUppercase ? "Login ID must contain at least one uppercase letter." : null,
        hasNoSpaces: !hasNoSpaces ? "Login ID must not contain spaces." : null
    };

    const filteredErrors = Object.fromEntries(
        Object.entries(errors).filter(([_, value]) => value !== null)
    );

    return {
        isValid: Object.keys(filteredErrors).length === 0,
        errors: Object.keys(filteredErrors).length === 0 ? null : filteredErrors
    };
}

/**
 * TODO: Implement login ID validation
 *  @param {*} loginId 
 * ! at least 5 characters
 * ! at least one symbol
 * ! at least one uppercase letter
 * @returns 
 */
export function validatePassword(password) {
    const minLength = password.length >= 5;
    // const hasSymbol = /[^A-Za-z0-9]/.test(password);
    // const hasUppercase = /[A-Z]/.test(password);
    const hasNoSpaces = !/\s/.test(password);

    const errors = {
        minLength: !minLength ? "Password must be at least 8 characters long." : null,
        // hasSymbol: !hasSymbol ? "Password must contain at least one symbol." : null,
        // hasUppercase: !hasUppercase ? "Password must contain at least one uppercase letter." : null,
        hasNoSpaces: !hasNoSpaces ? "Password must not contain spaces." : null
    };

    const filteredErrors = Object.fromEntries(
        Object.entries(errors).filter(([_, value]) => value !== null)
    );

    return {
        isValid: Object.keys(filteredErrors).length === 0,
        errors: Object.keys(filteredErrors).length === 0 ? null : filteredErrors
    };
}

/**
 * TODO: implement validate confirm password
 * @param {*} password
 * @param {*} confirmPassword
 * @returns
 */
export function validateConfirmPassword(password, confirmPassword) {
    const isEmpty = !confirmPassword;
    const isMatch = password === confirmPassword;

    const errors = {
        empty: isEmpty ? "Confirm Password is required." : null,
        mismatch: !isMatch ? "Passwords do not match." : null,
    };

    const filteredErrors = Object.fromEntries(
        Object.entries(errors).filter(([_, value]) => value !== null)
    );

    return {
        isValid: Object.keys(filteredErrors).length === 0,
        errors: Object.keys(filteredErrors).length === 0 ? null : filteredErrors,
    };
}


//TODO: implement quicker way to validate authentication fields
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
}