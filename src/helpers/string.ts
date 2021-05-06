export const generateId = (): string => {
    let result: string = '';
    const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const l: number = chars.length;
    for (let i: number = 0; i < 8; i++) {
        result = result + chars.charAt(Math.floor(Math.random() * l));
    }
    return result;
}