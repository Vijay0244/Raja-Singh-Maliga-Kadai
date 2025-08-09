import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: Date | string): string =>{
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, 'dd/MM/yyyy')
};

export const formatDateTime = (date: Date | string): string =>{
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, 'dd/MM/yyyy HH:mm')
};

export const formatTimeAgo = (date: Date | string): string =>{
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return formatDistanceToNow(dateObj, { addSuffix: true })
};

export const formatCurrency = (amount: number): string =>{
    return `₹${amount.toFixed(2)}`
}

export const formatNumber = (num: number): string =>{
    return new Intl.NumberFormat('ta-IN').format(num)
};
