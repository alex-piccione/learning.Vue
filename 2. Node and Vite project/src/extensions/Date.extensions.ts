declare global {
    interface Date {
        shortDate():string
    }
}

export function extendDate() {

    Date.prototype.shortDate = function(this: Date): string {
        const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        };
    
        //return this.toLocaleDateString('en-US', options);
        return this.toLocaleDateString(/*locales*/undefined, options);
    }

}