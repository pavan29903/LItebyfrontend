import { useEffect, useState } from "react"
import { Appbar } from "../Components/Appbar"
import { Balance } from "../Components/Balance"
import { Users } from "../Components/Users"
import axios from "axios"

export const Dashboard = () => {

    const [balance , setBalance] = useState()
    const [ user , setUser]  =useState('')

    useEffect(()=>{
          axios.get('http://localhost:3000/api/v1/account/balance',{
            headers:{
                Authorization:"Bearer "+ localStorage.getItem("token") 
            }
         })
            .then(response =>{
                const updatedBalance = response.data.balance.toFixed(0);
                setBalance(updatedBalance)
            })
    },[])
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk")
            .then(response =>{
                const users = response.data.user;
                    const lastUser = users[users.length - 1];
                    setUser(lastUser.firstName);
                
            })
    },[])


    return <div>
        <div className="p-8">
            <Appbar label={"Litepay"} username={user} firstletter={user[0]} />
        </div>
        <div className="m-8">
            <Balance value={balance} />
            <Users></Users> 
        </div>

    </div>
}