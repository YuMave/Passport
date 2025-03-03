import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const isAdmin = user && (user.role === 'admin' || user.role === 'officer');

    return (
        <header className="bg-blue-800 text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold">
                            Passport Services
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="hover:text-blue-200 transition duration-300">
                            Home
                        </Link>
                        <Link to="/services" className="hover:text-blue-200 transition duration-300">
                            Services
                        </Link>
                        <Link to="/track" className="hover:text-blue-200 transition duration-300">
                            Track Application
                        </Link>
                        <Link to="/contact" className="hover:text-blue-200 transition duration-300">
                            Contact
                        </Link>
                        {!isAuthenticated ? (
                            <div className="flex space-x-2">
                                <Link 
                                    to="/login" 
                                    className="bg-white text-blue-800 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={toggleProfileDropdown}
                                    className="flex items-center space-x-1 hover:text-blue-200 transition duration-300"
                                >
                                    <span>{user.firstName}</span>
                                    <ChevronDown size={16} />
                                </button>
                                
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
                                        <Link 
                                            to="/dashboard" 
                                            className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link 
                                            to="/profile" 
                                            className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
                                        >
                                            Profile
                                        </Link>
                                        {isAdmin && (
                                            <Link 
                                                to="/admin" 
                                                className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
                                            >
                                                Admin Panel
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-300"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white focus:outline-none"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <nav className="flex flex-col space-y-3">
                            <Link to="/" className="hover:text-blue-200 transition duration-300">
                                Home
                            </Link>
                            <Link to="/services" className="hover:text-blue-200 transition duration-300">
                                Services
                            </Link>
                            <Link to="/track" className="hover:text-blue-200 transition duration-300">
                                Track Application
                            </Link>
                            <Link to="/contact" className="hover:text-blue-200 transition duration-300">
                                Contact
                            </Link>
                            {!isAuthenticated ? (
                                <div className="flex flex-col space-y-2 pt-3">
                                    <Link 
                                        to="/login" 
                                        className="bg-white text-blue-800 px-4 py-2 rounded-md text-center hover:bg-blue-100 transition duration-300"
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to="/register" 
                                        className="bg-blue-600 px-4 py-2 rounded-md text-center hover:bg-blue-700 transition duration-300"
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={toggleProfileDropdown}
                                        className="flex items-center space-x-1 hover:text-blue-200 transition duration-300"
                                    >
                                        <span>{user.firstName}</span>
                                        <ChevronDown size={16} />
                                    </button>
                                    
                                    {isProfileDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
                                            <Link 
                                                to="/dashboard" 
                                                className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
                                            >
                                                Dashboard
                                            </Link>
                                            <Link 
                                                to="/profile" 
                                                className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
                                            >
                                                Profile
                                            </Link>
                                            {isAdmin && (
                                                <Link 
                                                    to="/admin" 
                                                    className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
                                                >
                                                    Admin Panel
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-300"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;