export function getMonths(transactions){;
    let lastMonth = "";
    let months = [];
    transactions.forEach(t => {
        const [d, m, y] = t.date.split('.')
        let month = `.${m}.${y}`
        if(month !== lastMonth){
            months.push(month)
            lastMonth = month;
        }
    });
    return months;
}