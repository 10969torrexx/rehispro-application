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
    const hasSymbol = /[^A-Za-z0-9]/.test(loginId);
    const hasUppercase = /[A-Z]/.test(loginId);
    const hasNoSpaces = !/\s/.test(loginId);

    const errors = {
        minLength: !minLength ? "Login ID must be at least 5 characters long." : null,
        hasSymbol: !hasSymbol ? "Login ID must contain at least one symbol." : null,
        hasUppercase: !hasUppercase ? "Login ID must contain at least one uppercase letter." : null,
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
    const minLength = password.length >= 8;
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNoSpaces = !/\s/.test(password);

    const errors = {
        minLength: !minLength ? "Password must be at least 8 characters long." : null,
        hasSymbol: !hasSymbol ? "Password must contain at least one symbol." : null,
        hasUppercase: !hasUppercase ? "Password must contain at least one uppercase letter." : null,
        hasNoSpaces: !hasNoSpaces ? "Password must not contain spaces." : null
    };

    console.log({
        minLength,
        hasSymbol,
        hasUppercase,
        hasNoSpaces,
        password,
    });


    const filteredErrors = Object.fromEntries(
        Object.entries(errors).filter(([_, value]) => value !== null)
    );

    return {
        isValid: Object.keys(filteredErrors).length === 0,
        errors: Object.keys(filteredErrors).length === 0 ? null : filteredErrors
    };
}

