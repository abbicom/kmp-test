export interface Color {
    id?: string;
    hex: string;
    r?: number;
    g?: number;
    b?: number;
};

export interface RGB {
    r: number;
    g: number;
    b: number;
};

export interface HSL {
    h: number;
    s: number;
    l: number;
};

export const hexToRGB = (hex: string): RGB => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
        r: result ? parseInt(result[1], 16) : 0,
        g: result ? parseInt(result[2], 16) : 0,
        b: result ? parseInt(result[3], 16) : 0
    };
};

export const hexToHSL = (hex: string): HSL => {
    let {r, g, b} = hexToRGB(hex);
    r /= 255;
    g /= 255;
    b /= 255;
    const max: number = Math.max(r, g, b);
    const min: number = Math.min(r, g, b);
    let h: number = 0;
    let s: number = 0;
    let l: number = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return {
        h: h,
        s: s,
        l: l
    };
};