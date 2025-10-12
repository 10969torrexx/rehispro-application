import { parse, format, isValid } from "date-fns";

export function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeWords(str) {
    if (!str) return '';
    return str.split(' ').map(word => capitalizeFirst(word)).join(' ');
}

export function AllCaps(str) {
    if (!str) return '';
    return str.toUpperCase();
}

export function StringToDate(str) {
    try {
        const formats = [
            "yyyy-MMMM-dd",     
            "MMMM dd, yyyy",    
            "MMM dd, yyyy",
        ];

        for (const fmt of formats) {
            const parsed = parse(str, fmt, new Date());
            if (isValid(parsed)) {
                return format(parsed, "yyyy-MM-dd");
            }
        }

    return null;
    } catch (error) {
        console.error("Error parsing date:", error);
        return null;
    }
}