import Address from "@/types/Address";

export function formatAddress(address: Address): string {
    return _formatAddress(address)
}

export function formatAddressWithMarkup(address: Address, inputValue: string): string {
    let formatted = _formatAddress(address)
    const indexOf = formatted.toLowerCase().indexOf(inputValue.toLowerCase())

    formatted = formatted.length > 32
        ? formatted.substr(0, 32 - 1) + '&hellip;'
        : formatted;

    if (indexOf >= 0) {
        const length: number = inputValue.length as number
        const end: number = indexOf + length
        return [formatted.slice(0, indexOf), '<strong>', formatted.slice(indexOf, end), '</strong>', formatted.slice(end, formatted.length)].join('')
    }
    return formatted
}

export function hex_to_ascii(str1: string): string {
    const hex = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

function _formatAddress(address: Address): string {
    return `${address.street} ${address.buildingNumber}${(address.postalCode) ? `, ${address.postalCode}` : ''}, ${address.city}`.replace(/\s\s+/g, '')
}
