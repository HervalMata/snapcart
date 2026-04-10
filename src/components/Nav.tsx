"use client"

import React, { useState, useRef, useEffect } from "react"
import mongoose from 'mongoose'
import Link from "next/link"
import {Menu, Search, ShoppingCartIcon, User, Package, X, LogOut, PlusCircle, Boxes, ClipboardCheck } from 'lucide-react'
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { signOut } from "next-auth/react"

interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    mobile?: string;
    role: "user" | "deliveryBoy" | "admin";
    image?: string;
}

function Nav({ user }: { user: IUser}) {
    const [open, setOpen] = useState(false)
    const [searchBarOpen, setSearchBarOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const profileDropDown = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileDropDown.current && !profileDropDown.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const sidebar = menuOpen ? createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ typr: "spring", stiffness: 100, damping: 14 }}
                className="fixed top-0 left-0 h-full w-[75%] sm:w-[60%] z-9999 bg-linear-to-b from-pink-800/90 via-pink-700/80 to-pink-900/90 backdrop-blur-xl border-r botdrt-pink-400/20 shadow-[0_0_50px_-10px_rgba(0, 255, 100, 0.3)] flex flex-col p-6 text-white"
            >
                <div className="flex justify-between items-center mb-2">
                    <h1 className="font-extrabold text-2xl tracking-wide text-white/90">
                        Painel do Admin
                    </h1>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="text-white/80 hover:text-red-400 text-2xl font-bold transition"
                    >
                        <X />
                    </button>
                </div>
                <div className="flex items-center gap-3 p-3 mt-3 rounded-xl bg-white/10 hover:bg-white/15 transition-all shadow-inner">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-pink-400/60 shadow-lg">
                        {
                            user.image 
                                ? <Image src={user.image} alt="usuário" fill className="object-cover rounded-full" /> 
                                : <User />
                        }
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">{user.name}</h2>
                        <p className="text-xs text-pink-200 capitalize tracking-wide">{user.role}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 font-medium mt-6">
                        <Link 
                                href={""} 
                                className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 hover:pl-4 transition-all"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Adicionar Grocery
                            </Link>
                            <Link 
                                href={""} 
                                className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 hover:pl-4 transition-all"
                            >
                                <Boxes className="w-5 h-5" />
                                Ver Groceries
                            </Link>
                            <Link 
                                href={""} 
                                className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 hover:pl-4 transition-all"
                            >
                                <ClipboardCheck className="w-5 h-5" />
                                Gerenciar Ordens
                            </Link>
                </div>
                <div className="my-5 border-t border-white/20"></div>
                <div 
                    onClick={async () => await signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-3 text-red-300 font-semibold mt-auto hover:bg-red-500/20 p-3 rounded-lg transition-all">
                    <LogOut className="w-5 h-5 text-red-300" />
                    Sair
                </div>
                
            </motion.div>
        </AnimatePresence>,
        document.body
    ) : null

    return (
        <div className="w-[95%] fixed top-4 left-1/2 -tranlate-x-1/2 bg-linear-to-r from-pink-500 to-pink-700 rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center h-20 px-4 md:px-8 z-50">
            <Link 
                href={"/"}
                className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide hover:scale-105 transition-transform"
            >
                SnapCart
            </Link>
            {user.role == "user" && 
                <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
                    <Search className="text-gray-500 w-5 h-5 mr-2" />
                    <input type="text" placeholder="Pesquisar Produtos..." className="w-full outline-none text-gray-700 placeholder-gray-400" />
                </form>
            }
            <div className="flex items-center gap-3 md:gap-6 relative">
                {user.role == "user" && 
                    <>
                        <div 
                            onClick={() => setSearchBarOpen((prev) => !prev)}
                            className="bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition md:hidden">
                            <Search className="text-pink-600 w-6 h-6" />
                        </div>
                        <Link
                            href={""}
                            className="relative bg-white rounded-full w-11 h-11 flex items-center justify-center shadow-md hover:scale-105 transition"
                        >
                            <ShoppingCartIcon className="text-pink-600 w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center rounded-full font-semibold shadow">
                                0
                            </span>
                        </Link>
                    </>
                }

                {user.role == "admin" && 
                    <>
                        <div className="hidden md:flex items-center gap-4">
                            <Link 
                                href={""} 
                                className="flex items-center gap-2 bg-white text-pink-700 font-semibold px-4 py-2 rounded-full hover:bg-pink-100 transition-all"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Adicionar Grocery
                            </Link>
                            <Link 
                                href={""} 
                                className="flex items-center gap-2 bg-white text-pink-700 font-semibold px-4 py-2 rounded-full hover:bg-pink-100 transition-all"
                            >
                                <Boxes className="w-5 h-5" />
                                Ver Groceries
                            </Link>
                            <Link 
                                href={""} 
                                className="flex items-center gap-2 bg-white text-pink-700 font-semibold px-4 py-2 rounded-full hover:bg-pink-100 transition-all"
                            >
                                <ClipboardCheck className="w-5 h-5" />
                                Gerenciar Ordens
                            </Link>
                        </div>
                        <div 
                            onClick={() => setMenuOpen(prev => !prev)}
                            className="md:hidden bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                            <Menu className="text-pink-600 w-6 h-6" />
                        </div>
                    </>
                }

                <div className="relative" ref={profileDropDown}>
                    <div 
                        onClick={() => setOpen(prev => !prev)}
                        className="bg-white rounded-full w-11 h-11 flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform">
                        {
                            user.image 
                                ? <Image src={user.image} alt="usuário" fill className="object-cover rounded-full" /> 
                                : <User />
                        }
                    </div>
                    <AnimatePresence>
                        {
                            open && 
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-999"
                            >
                                <div className="flex items-center gap-3 px-3 py-2 border-b border-gray-100">
                                    <div className="w-10 h-10 relative rounded-full bg-pink-100 flex items-center justify-center overflow-hidden">
                                        {
                                            user.image 
                                                ? <Image src={user.image} alt="usuário" fill className="object-cover rounded-full" /> 
                                                : <User />
                                        }
                                    </div>
                                    <div>
                                        <div className="text-gray-800 font-semibold">{user.name}</div>
                                        <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                                    </div>
                                </div>
                                {user.role == "user" && 
                                    <Link
                                        href={""}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-2 px-3 py-3 hover:bg-pink-50 rounded-lg text-gray-700 font-medium"
                                    >
                                        <Package className="w-5 h-5 text-pink-600" />
                                        Minhas Ordens
                                    </Link>
                                }
                                <button 
                                    onClick={() => {
                                        setOpen(false)
                                        signOut({ callbackUrl: "/login" })
                                    }}
                                    className="flex items-center gap-2 w-full text-left px-3 py-3 hover:bg-red-50 rounded-lg text-gray-700 font-medium">
                                    <LogOut className="w-5 h-5 text-red-600" />
                                    Sair
                                </button>
                            </motion.div>
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {
                            searchBarOpen &&
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-full shadow-lg z-40 flex items-center px-4 py-2"
                            >
                                <Search className="text-gray-500 w-5 h-5 mr-2" />
                                <form className="grow">
                                    <input 
                                        type="text" 
                                        className="w-full outline-none text-gray-700" 
                                        placeholder="Pesquisar Produtos..."
                                    />
                                </form>
                                <button onClick={() => setSearchBarOpen(false)}>
                                    <X className="text-gray-500 w-5 h-5" />
                                </button>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
                
            </div>
            {sidebar}
        </div>
    )
}

export default Nav