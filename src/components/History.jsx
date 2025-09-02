import ExpenseItem from "./ExpenseItem";

const History = (props) => {
    const { transactions = [], deleteExpense, editExpense } = props;
    console.log(transactions);

    return (
        <div className="history">
            <h4>History</h4>
            {transactions.map((item) => (
                <ExpenseItem key={item.id} item={item} deleteExpense={deleteExpense} editExpense={editExpense} />
            ))}
        </div>
    );
};

export default History;
