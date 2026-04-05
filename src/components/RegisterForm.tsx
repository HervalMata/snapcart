"use client"

import React, { useState } from 'react'
import { ArrowLeft, Leaf, User, Mail, Key } from 'lucide-react'
import { motion } from 'motion'

type propType = {
    previousStep: (s: number) => void
}

function RegisterForm({ previousStep }: propType) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
            <div 
                className="absolute top-6 left-6 flex items-center gap-2 text-pink-700 hover:text-pink-800 transition-colors cursor-pointer"
                onClick={() => previousStep(1)}
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Voltar</span>
            </div>
            <motion.h1 
                initial={{
                    y: 10,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="text-4xl font-extrabold text-pink-700 mb-2"
            >
                Criar Conta
            </motion.h1>
            <p className="text-gray-600 mb-8 flex items-center">
                Junte-se ao SnapCart agora <Leaf className="w-5 h-5 text-pink-600" />
            </p>
            <motion.form
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="flex flex-col gap-5 w-full max-w-sm"
            >
                <div className="relative">
                    <User className="absolute left-3.5 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Digite seu nome" 
                        className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-pink-500 focus:outline-none" 
                        onChange={() => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="relative">
                    <Mail className="absolute left-3.5 w-5 h-5 text-gray-400" />
                    <input 
                        type="email" 
                        placeholder="Digite seu email" 
                        className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-pink-500 focus:outline-none" 
                        onChange={() => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="relative">
                    <Key className="absolute left-3.5 w-5 h-5 text-gray-400" />
                    <input 
                        type="password" 
                        placeholder="Digite sua senha" 
                        className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-pink-500 focus:outline-none" 
                        onChange={() => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
            </motion.form>
        </div>
    )
}

export default RegisterForm