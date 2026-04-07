"use client"

import React, { useState } from 'react'
import { ArrowLeft, Leaf, User, Mail, Lock, EyeOff, EyeIcon, LogIn, Loader2 } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import googleImage from "@/assets/google.png"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"

type propType = {
    previousStep: (s: number) => void
}

function RegisterForm({ previousStep }: propType) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await axios.post("/api/auth/register", {
                name, email, password
            })
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

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
                onSubmit={handleRegister}
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
                {error && (
                    <p role="alert" className="text-sm text-red-600">
                        {error}
                    </p>
                )}
                <div className="relative">
                    <User className="absolute left-3.5 top-3.75 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="relative">
                    <Mail className="absolute left-3.5 top-3.75 w-5 h-5 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Digite seu email"
                        className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-3.5 top-3.75  w-5 h-5 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    { showPassword
                        ? <EyeOff className="absolute right-3 top-3.75 w-5 h-5 text-pink-500 cursor-pointer" onClick={() => setShowPassword(false)} />
                        : <EyeIcon className="absolute right-3 top-3.75 w-5 h-5 text-pink-500 cursor-pointer" onClick={() => setShowPassword(true)} />
                    }
                </div>
                {
                    (() => {
                        const formValidation = name !== "" && email !== "" && password !== ""
                        return <button
                            className={`w-full font-semibold py-3b rounded-xl transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 ${
                                formValidation
                                    ? "bg-pink-600 hover:bg-pink-700 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-pointer-not-allowed"
                            }`}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Cadastrar"}
                        </button>
                    }) ()
                }
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                    <span className="flex-1 h-px bg-gray-200"></span>
                    OU
                    <span className="flex-1 h-px bg-gray-200"></span>
                </div>
                <button
                    disabled={loading}
                    onClick={() => signIn("google")}

                    className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200">
                    <Image src={googleImage} width={20} height={20} alt='Google' />
                    Continuar com Google
                </button>
            </motion.form>
            <p onClick={() => router.push("/login")} className="cursor-pointer text-gray-600 mt-6 text-sm flex items-center gap-1">Já tem uma conta ? <LogIn className="w-4 h-4" /> <span className="text-pink-400"> Cadastrar-se</span></p>
        </div>
    )
}

export default RegisterForm
