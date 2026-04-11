import { auth } from "@/auth"
import uploadOnCloudinary from "@/lib/cloudinary"
import connectDb from "@/lib/db"
import Grocery from "@/models/grocery.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest) {
    try {
        const conn = await connectDb()
        if (!conn) {
            return NextResponse.json(
                { message: "Serviço de banco de dados indisponivel" },
                { status: 503 }
            )
        }
        const session = await auth()
        if (session?.user?.role !== "admin") {
            return NextResponse.json(
                { message: "Você não é administrador" },
                { status: 403}
            )
        }
        const formData = await req.formData()
        const name = formData.get("name") 
        const category = formData.get("category") 
        const unit = formData.get("unit") 
        const price = formData.get("price") 
        const file = formData.get("file") as Blob | null

        const isInvalidText =
            typeof name !== "string" || !name.trim() ||
            typeof category !== "string" || !category.trim() ||
            typeof unit !== "string" || !unit.trim() ||
            typeof price !== "string" || !price.trim()

        if (isInvalidText ||!(file instanceof Blob) || file.size === 0) {
            return NextResponse.json(
                { message: "Campos obrigatórios faltando" },
                { status: 400}
            )
        }
        const imageUrl = await uploadOnCloudinary(file)
        if (!imageUrl) {
            return NextResponse.json(
                { message: "Falha ao carregar a imagem" },
                { status: 500}
            )
        }
        const grocery = await Grocery.create({
            name: name as string, 
            category: category as string, 
            unit: unit as string, 
            price: price as string, 
            image: imageUrl
        })
        return NextResponse.json(
            grocery,
            { status: 200}
        )
    } catch (error) {
        console.error("Error ao Adicionar hort-fruti", error)
        return NextResponse.json(
            { message: `Error ao Adicionar hort-fruti` },
            { status: 500}
        )
    }
}