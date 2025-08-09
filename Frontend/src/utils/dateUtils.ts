import { format, formatDistanceToNow } from 'date-fns';

// Cache for formatted dates to avoid repeated calculations
const dateCache = new Map<string, string>()

export const formatDate = (date: Date | string): string => {
    const dateKey = typeof date === 'string' ? date : date.toISOString()
    
    if(dateCache.has(dateKey)){
        return dateCache.get(dateKey)!
    }
    
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const formatted = format(dateObj, 'dd/MM/yyyy')

    dateCache.set(dateKey, formatted)
    return formatted
}

export const formatDateTime = (date: Date | string): string =>{
    const dateKey = typeof date === 'string' ? date : date.toISOString()
    
    if(dateCache.has(dateKey)){
        return dateCache.get(dateKey)!
    }
    
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const formatted = format(dateObj, 'dd/MM/yyyy HH:mm')
    
    dateCache.set(dateKey, formatted)
    return formatted
}

export const formatTimeAgo = (date: Date | string): string =>{
    const dateKey = typeof date === 'string' ? date : date.toISOString()
    
    if(dateCache.has(dateKey)){
        return dateCache.get(dateKey)!
    }
    
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const formatted = formatDistanceToNow(dateObj, { addSuffix: true })
    
    dateCache.set(dateKey, formatted)
    return formatted
}

export const formatCurrency = (amount: number): string =>{
    return `₹${amount.toFixed(2)}`
}

export const formatNumber = (num: number): string =>{
    return new Intl.NumberFormat('ta-IN').format(num)
}

// Clear cache periodically to prevent memory leaks
setInterval(() =>{
    dateCache.clear()
}, 5 * 60 * 1000)
