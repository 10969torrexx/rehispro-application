import { parse, format, isValid } from "date-fns";

export function capitalizeFirst(str) {
    if (!str) return '';
    const lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function capitalizeWords(str) {
    if (!str) return '';
    return str.split(' ').map(word => capitalizeFirst(word)).join(' ');
}

export function AllCaps(str) {
    if (!str) return '';
    return str.toUpperCase();
}

export function TitleCase(str) {
    if (!str) return '';
    return str.trim()
    .replace(/\s+/g, ' ') 
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}

export function StringToDate(str) {
    try {
        if (!str) return '';

        const formats = [
            "yyyy-MMMM-dd",     
            "MMMM dd, yyyy",    
            "MMM dd, yyyy",
            "dd MMMM yyyy",
        ];

        for (const fmt of formats) {
            const parsed = parse(str.trim().replace(/\s+/g, ' '), fmt, new Date());
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