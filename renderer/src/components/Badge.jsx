import { capitalizeFirst } from '@myTools';
export default function Badge({ status, color, textsize = 'xs' }) {
    const bgColor = {
        blue: 'bg-blue-100 text-blue-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
    };

    return (
        <span className={`px-2 py-1 inline-flex text-${textsize} leading-5 font-semibold rounded-full ${bgColor[color] || 'bg-gray-100 text-gray-800'}`}>
            {capitalizeFirst(status)}
        </span>
    );
}