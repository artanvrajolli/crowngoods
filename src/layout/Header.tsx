import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import CartModal from '../components/CartModal';

export default function Header() {
    const { state } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-[#1a1a1a] fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
                <a href="/" className="flex items-center min-h-16 space-x-3 rtl:space-x-reverse">
                    <img src="./crowngoods_logo.png" className="h-12" alt="Company Logo" />
                </a><div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        onClick={() => setIsCartOpen(true)}
                        className={`relative mr-2.5 cursor-pointer text-white ${state.totalItems > 0 ? 'bg-[#e15726]' : 'bg-transparent'} hover:bg-[#d35f30] focus:ring-4 focus:outline-none focus:ring-[#e15726]/30 font-medium rounded-lg text-sm p-2.5 text-center transition-colors`}
                    >
                        <FiShoppingCart className="w-5 h-5" />
                        {state.totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                {state.totalItems}
                            </span>
                        )}
                    </button>
                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                        </li>
                    </ul>                </div>
            </div>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </nav>
    )
}
