import { useEffect, useState } from "react"

const BalanceContainer = (props) => {
    const { transactions } = props
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    useEffect(() => {
        let inc = 0
        let exp = 0
        transactions.forEach((txn) => {
            if (txn.amount < 0) {
                exp += Number(txn.amount)
            }
            else {
                inc += Number(txn.amount)
            }
        })
        setIncome(inc)
        setExpense(exp)
    }, [transactions])
    return (
        <div className="balance-container">
            <div className="currency-item">
                <div className="title">Income</div>
                <div className="amount green">${income}</div>
            </div>
            <div className="currency-item">
                <div className="title">Expense</div>
                <div className="amount red">${expense}</div>
            </div>
            <div className="currency-item">
                <div className="title">Balance</div>
                <div className="amount">${income + expense}</div>
            </div>
        </div>
    )
}
export default BalanceContainer