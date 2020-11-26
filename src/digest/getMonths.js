export function getMonths(transactions){;
    let lastMonth = "";
    let months = [];
    transactions.forEach(t => {
        const splitDate = t.date.split(".")
        let month = `${splitDate[1]}.${splitDate[2]}`
        if(month !== lastMonth){
            months.push(month)
            lastMonth = month;
        }
    });
    return months;
}