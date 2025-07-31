"use client"

import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router"
import { Menu, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import ToggleSwitch from "../utils/ToggleSwitch"

interface NavLink {
    key: string
    to: string
}

const navLinks: NavLink[] = [
    { key: "home", to: "/" },
    { key: "contact_us", to: "/contact" },
    { key: "privacy", to: "/privacy" },
]

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const drawerRef = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()

    const toggleDrawer = () => setIsOpen(!isOpen)

    const handleClickOutside = (event: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
            document.body.style.overflow = "hidden"
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
            document.body.style.overflow = "unset"
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50 h-[8vh]">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-primary-text font-bold text-xl tracking-wide">
                    {t("navbar.brand")}
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.key}
                            to={link.to}
                            className="text-2ndcolor-text hover:text-indigo-700 transition-colors duration-200 text-lg font-medium"
                        >
                            {t(`navbar.${link.key}`)}
                        </Link>
                    ))}
                    <ToggleSwitch />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <ToggleSwitch />
                    <button
                        onClick={toggleDrawer}
                        className="text-2ndcolor-text hover:text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-text rounded-md p-1"
                        aria-label={isOpen ? t("navbar.close_menu") : t("navbar.open_menu")}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu-drawer"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-white/10 backdrop-blur-sm z-40"
                        onClick={toggleDrawer}
                        aria-hidden="true"
                    />
                    <div
                        id="mobile-menu-drawer"
                        ref={drawerRef}
                        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="flex flex-col p-6 space-y-6 h-full">
                            <button
                                onClick={toggleDrawer}
                                className="self-start text-2ndcolor-text hover:text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-text rounded-md p-1"
                                aria-label={t("navbar.close_menu")}
                            >
                                <X size={28} />
                            </button>
                            <div className="flex flex-col items-center space-y-6 mt-8">
                                <Link to="/" className="text-primary-text font-bold text-2xl tracking-wide">
                                    {t("navbar.brand")}
                                </Link>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.key}
                                        to={link.to}
                                        className="text-2ndcolor-text hover:text-indigo-700 transition-colors duration-200 text-xl font-medium w-full text-center py-2 rounded-md hover:bg-gray-50"
                                        onClick={toggleDrawer}
                                    >
                                        {t(`navbar.${link.key}`)}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </nav>
    )
}

export default Navbar
