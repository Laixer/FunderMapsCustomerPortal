/* eslint-disable @typescript-eslint/no-var-requires */

export declare const VENDOR: string;

export type VendorConfig = {
    name: string,
    style: {
        mapboxPrimaryColor: string,
    },
    logo: string,
    home: {
        title: string,
        subtitle: string,
        content: string,
        image: string
    },
    final: {
        content: string
    }
}

const vendor: VendorConfig = require(`../vendors/${VENDOR}/vendor.config`).default
export default vendor