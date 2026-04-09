import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest) {
    try {
        await connectDb()
        const {role, mobile} = await req.json()
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ message: "Não autenticado" }, { status: 401 })
        }
        const allowedRoles = ["user", "deliveryBoy"] as const
        if (!allowedRoles.includes(role)) {
            return NextResponse.json({ message: "Função inválida" }, { status: 400 })
        }

        const user = await User.findByIdAndUpdate(
            session.user.id,
            { role, mobile},
            { new: true, runValidators: true }
        )
        if (!user) {
            return NextResponse.json(
                {message: "Usuário não encontrado"},
                {status: 400}
            )
        }
        return NextResponse.json(
            user,
            {status: 200}
        )
    } catch (error) {
        console.error("Falha ao editar função e celular", error)
        return NextResponse.json(
            {message: `Erro interno ao editar o perfil`},
            {status: 500}
        )
    }
}