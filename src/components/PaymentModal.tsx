import { useState } from "react";
import { FaGooglePay, FaCreditCard, FaCcVisa } from "react-icons/fa";
import { BsCreditCard2Back } from "react-icons/bs";

interface PaymentModalProps {
    onBack: () => void;
    onClose: () => void;
}

export default function PaymentModal({ onBack, onClose }: PaymentModalProps) {
    const [activeTab, setActiveTab] = useState<"card" | "googlePay">("card");

    return (
        <div className="text-gray-800">
            <div className="flex items-center mb-6">
                <span className="mr-3 text-2xl text-[#e4673b]">
                    <FaCreditCard className="w-8 h-8" />
                </span>
                <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
            </div>

            <div className="flex mb-6">
                <button
                    onClick={() => setActiveTab("card")}
                    className={`flex-1 py-3 px-4 cursor-pointer rounded-l-md text-sm font-medium focus:outline-none transition-colors duration-150 ease-in-out
                                ${activeTab === "card" ? "bg-[#e4673b] text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                >
                    <div className="flex items-center justify-center">
                        <FaCreditCard className="w-5 h-5 mr-2" /> Card
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("googlePay")}
                    className={`flex-1 py-3 px-4 cursor-pointer rounded-r-md text-sm font-medium focus:outline-none transition-colors duration-150 ease-in-out
                                ${activeTab === "googlePay" ? "bg-[#e4673b] text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                >
                    <div className="flex items-center justify-center">
                        <FaGooglePay className="ml-2" size={35} />
                    </div>
                </button>
            </div>

            {activeTab === "card" && (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                        <div className="relative">
                            <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 1234 1234 1234" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-[#e4673b] focus:border-[#e4673b] placeholder-gray-400 text-gray-900" />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#e4673b]">
                                <FaCcVisa className="w-8 h-auto" />
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration date</label>
                            <input type="text" id="expirationDate" name="expirationDate" placeholder="MM / YY" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-[#e4673b] focus:border-[#e4673b] placeholder-gray-400 text-gray-900" />
                        </div>
                        <div>
                            <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700 mb-1">Security code</label>
                            <div className="relative">
                                <input type="text" id="securityCode" name="securityCode" placeholder="CVC" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-[#e4673b] focus:border-[#e4673b] placeholder-gray-400 text-gray-900" />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#e4673b]">
                                    <BsCreditCard2Back className="w-6 h-6" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Enter your country"
                            defaultValue="United Kingdom"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-[#e4673b] focus:border-[#e4673b] placeholder-gray-400 text-gray-900"
                        />
                    </div>
                    <div className="flex items-center mt-6">
                        <input id="saveCard" name="saveCard" type="checkbox" className="h-4 w-4 text-[#e4673b] border-gray-300 rounded bg-gray-50 focus:ring-[#e4673b]" />
                        <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">Save this card as default payment method</label>
                    </div>
                </div>
            )}

            {activeTab === "googlePay" && (
                <div className="text-center py-8 px-4 bg-gray-100 rounded-md">
                    <p className="text-lg font-medium text-gray-800">Google Pay Integration</p>
                    <p className="text-sm text-gray-600 mt-2">This is where Google Pay button or integration would appear.</p>
                    <button className="mt-4 bg-gray-800 text-white py-3 px-6 rounded-md hover:bg-gray-700 transition-colors">
                        Pay with Google Pay
                    </button>
                </div>
            )}

            <div className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <button
                    onClick={onClose}
                    className="w-full sm:flex-1 cursor-pointer bg-[#e4673b] text-white py-3 px-4 rounded-md hover:bg-[#d35f30] transition-colors focus:outline-none focus:ring-2 focus:ring-[#e4673b] focus:ring-opacity-50"
                >
                    Complete Payment
                </button>
                <button
                    onClick={onBack}
                    className="w-full sm:flex-1 cursor-pointer bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                    Back
                </button>
            </div>
        </div>
    );
} 