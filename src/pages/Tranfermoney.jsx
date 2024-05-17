import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SendMoney = () => {
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const name = query.get("name");
    const id = query.get('id');

    const handleTransfer = async () => {
        setLoading(true);
        try {
            await axios.post('https://litepay-backend.onrender.com/api/v1/account/transfer', {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setPaymentSuccess(true);

            setAmount(0);
        } catch (error) {
            console.error("Error transferring money:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClosePopup = () => {
        setPaymentSuccess(false);
        navigate("/dashboard");
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => {
                                        setAmount(e.target.value)
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                    value={amount}
                                />
                            </div>
                            <button
                                onClick={handleTransfer}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                                disabled={loading}
                            >
                                {loading ? 'Transferring...' : 'Initiate Transfer'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {paymentSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <p className="text-green-500 text-2xl font-semibold">Payment Successful!</p>
                        <button
                            onClick={handleClosePopup}
                            className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
