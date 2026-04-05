import connectDb from "@/lib/db"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req:NextRequest) {
    try {
        await connectDb()
        const {name, email, password} = await req.json()
        if (typeof name !== "string" || !name.trim()) {
            return NextResponse.json(
                {message: "O nome é obrigatório!"},
                {status: 400}
            )
        }
        if (typeof email !== "string" || !email.trim()) {
            return NextResponse.json(
                {message: "O email é obrigatório!"},
                {status: 400}
            )
        }
        const safeName = name.trim()
        const safeEmail = email.trim()
        const existUser = await User.findOne({ email: safeEmail })
        if (existUser) {
            return NextResponse.json(
                {message: "Email já existe!"},
                {status: 400}
            )
        }
        if (typeof password !== "string" || password.length < 6) {
            return NextResponse.json(
                {message: "A senha deve ter pelo menos 6 caracteres!"},
                {status: 400}
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        let user
        try {
            user = await User.create({
                name: safeName, 
                email: safeEmail, 
                password: hashedPassword
            })
        } catch (error: any) {
            if (error?.code === 11000) {
                return NextResponse.json(
                    {message: "Email já existe!"},
                    {status: 409}
                )
            }
            throw error
        }
        
        return NextResponse.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            {status: 201}
        )
    } catch (error) {
        console.error("Erro na API de Cadastro: ", error)
        return NextResponse.json(
            {message: `Erro ao cadastrar o usuário`},
            {status: 500}
        )
    }
}