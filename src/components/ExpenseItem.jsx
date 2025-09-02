import { toast } from "react-toastify"

const ExpenseItem = (props) => {
    const { item, deleteExpense, editExpense } = props
    const { title, amount, _id: id } = item   
    const type = amount < 0 ? "negative" : "positive"

    const handleDelete = () => {
        deleteExpense(id)  
        toast.success("DELETION SUCCESSFUL")
    }

    const handleEdit = () => {
        editExpense(item)
    }

    return (
        <div className={`expense-item ${type}`}>
            <span className="title">{title}</span>
            <span className="amount">${amount}</span>
            <div className="btn-container">
                <button className="delete-btn" onClick={handleDelete}><b>Delete</b></button>
                <button className="edit-btn" onClick={handleEdit}><b>Edit</b></button>
            </div>
        </div>
    )
}
export default ExpenseItem;
