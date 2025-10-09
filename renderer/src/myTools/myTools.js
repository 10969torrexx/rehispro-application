import { parse } from "date-fns";
import { format } from "date-fns";

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
    try{
        return format(parse(str, "yyyy-MMMM-dd", new Date()), "yyyy-MM-dd");
    } catch(error) {
        return null;
    }
}