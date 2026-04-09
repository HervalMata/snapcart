"use client"

import React, {useState} from "react"
import { motion } from "motion/react"
import { User, UserCog, Bike, ArrowRight } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"

function EditRoleMobile() {
    const router = useRouter()
    const [roles, setRoles] = useState([
        {id: "admin", label: "Admin", icon: UserCog},
        {id: "user", label: "Usuário", icon: User},
        {id: "deliveryBoy", label: "Entregador", icon: Bike}
    ])
    const [selectedRole, setSelectedRole] = useState("")
    const [mobile, setMobile] = useState("")

    const handleEdit = async () => {
        try {
            await axios.post("/api/user/edit-role-mobile", {
                role: selectedRole,
                mobile: mobile
            })
            router.replace("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen p-6 w-full bg-white">
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
                className="text-3xl md:text-4xl font-extrabold text-pink-700 mt-8"
            >
                Selecione sua função
            </motion.h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
                {roles.map((role) => {
                    const Icon = role.icon
                    const isSelected = selectedRole == role.id
                    return (
                        <motion.button
                            type="button"
                            key={role.id}
                            whileTop={{scale: 0.96}}
                            aria-pressed={isSelected}
                            onClick={() => setSelectedRole(role.id)}
                            className={`flex flex-col items-center justify-center w-48 h-44 rounded-2xl border-2 transition-all ${
                                isSelected
                                    ? "bg-pink-100 border-pink-600 shadow-lg"
                                    : "border-gray-300 bg-white hover:border-pink-400"
                            }`}
                        >
                            <Icon />
                            <span>{role.label}</span>
                        </motion.button>
                    )
                })}
            </div>    
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    delay: 0.5,
                    duration: 0.6,
                }}
                className="flex flex-col items-center mt-10"
            >
                <label  htmlFor="mobile" className="text-gray-700 font-medium mb-2">
                    Digite seu Numero de Celular
                </label>
                <input 
                    type="tel"
                    id="mobile"
                    placeholder="e.x. (21) 999999999"
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-64 md:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outiline-none text-gray-800"
                />
            </motion.div>
            <motion.button
                initial={{
                    y: 20,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    delay: 0.7,
                }}
                disabled={mobile !== 11 || !selectedRole}
                onClick={handleEdit}
                className={`inline-flex items-center gap-2 font-semibold py-3 px-8 rounded-2xl shadow-md transition-all duration-200 w-[200px] mt-20 ${
                                selectedRole && mobile.length === 11
                                    ? "bg-pink-100 border-pink-600 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
                Voltar para a Home
                <ArrowRight />
            </motion.button>
        </div>
    )
}

export default EditRoleMobile