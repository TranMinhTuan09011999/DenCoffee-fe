export class StringUtil {
    static formatString = (str: any, params: any) => {
        Object.keys(params).forEach(key => {
            str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), params[key]);
        });
        return str;
    }

    static parseString = (value: any): string => {
        return String(value);
    }
}
