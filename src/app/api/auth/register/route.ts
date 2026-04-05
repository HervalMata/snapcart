import connectDb from "@/lib/db"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req:NextRequest) {
    try {
        await connectDb()
        const {name, email, password} = await req.json()
        const existUser = await User.findOne({ email })
        if (existUser) {
            return NextResponse.json(
                {message: "Email já existe!"},
                {status: 400}
            )
        }
        if (password < 6) {
            return NextResponse.json(
                {message: "A senha deve ter pelo menos 6 caracteres!"},
                {status: 400}
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, password: hashedPassword
        })
        return NextResponse.json(
            user,
            {status: 200}
        )
    } catch (error) {
        return NextResponse.json(
            {message: `Erro ao cadastrar o usuário ${error}`},
            {status: 500}
        )
    }
}