import { getAllTransactions } from "../api/transaction";

const History = ()=>{
    const fetchTransactions = async() =>{
        const response = await getAllTransactions();
        const result = await response.json();
        console.log(result);
    }
    fetchTransactions();
    return (
        <p className="text-3xl font-bold underline">hello world</p>
    )
}

export default History;