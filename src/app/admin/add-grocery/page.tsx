"use client"

import React, { useState, ChangeEvent, FormEvent } from "react"
import { ArrowLeft, PlusCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"
import Image from "next/image"
import axios from "axios"

const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Rice, Atta & Grains",
    "Snacks & Biscuits",
    "Spices & Masales",
    "Beverages & Drinks",
    "Personal Care",
    "Houswhold Essentials",
    "Instant & Packaged Food",
    "Baby & Pet Care"
]

const units = [
            "kg", "g", "liter", "ml", "piece", "pack"
]

function AddGrocery() {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [unit, setUnit] = useState("")
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState<string | null>()
    const [backendImage, setBackendImage] = useState<File | null>()

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length == 0) return
        const file = files[0]
        setBackendImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("category", category)
            formData.append("unit", unit)
            formData.append("price", price)
            if (backendImage) {
                formData.append("imsge", backendImage)
            }
            const result = await axios.post("/api/admin/add-grocery", formData)
            console.log(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 to-white py-16 px-4 relative">
            <Link 
                href={"/"}
                className="absolute top-6 left-6 flex items-center gap-2 text-pink-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-pink-100 hover:shadow-lg transition-all"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:flex">Voltar para a Home</span>
            </Link>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-pink-100 p-8"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center gap-3">
                        <PlusCircle className="text-pink-600 w-8 h-8" />
                        <h1 className="">
                            Adicionar Alimento
                        </h1>
                        <p className="text-gray-500 text-sm mt-2 text-center">
                            Preencha os detalhes abaixo para adicionar um alimento
                        </p>
                    </div>
                    <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                                 Nome da Alimento
                                <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text"
                                id="name"
                                placeholder="e.x. leite..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Categoria
                                    <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                                >
                                    <option>Selecione a Categoria</option>
                                    {categories.map((cat)=> (
                                        <option value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Unidades
                                    <span className="text-red-500">*</span>
                                </label>
                                <select 
                                    name="unit"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                                >
                                    <option>Selecione a Unidade</option>
                                    {units.map((unit)=> (
                                        <option value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
                                 Preço da Alimento
                                <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number"
                                id="text"
                                placeholder="e.x. 120"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row itwms-center gap-5">
                            <label htmlFor="image" className="cursor-pointer flex items-center justify-center gap-2 bg-pink-50 text-pink-700 font-semibold border border-pink-200 rounded-xl px-6 py-3 hover:bg-pink-100 transition-all w-full sm:w-auto">
                                 <Upload className="w-5 h-5" /> Carregar Foto da Alimento
                            </label>
                            <input 
                                type="file"
                                accept="image/*"
                                id="image"
                                hidden
                                onChange={handleImageChange}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                            />
                            {preview && <Image src={preview} width={100} height={100} alt="imagem" className="rounded-xl shadow-md border border-gray-200 object-cover" />}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={loading}
                            className="mt-4 w-full bg-linear-to-r ffrom-pink-500 to-pink-700 text-white font-semibold py-3 rounded-xl shadow-xl hover:shadow-xl disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Adicionar Alimento"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default AddGrocery