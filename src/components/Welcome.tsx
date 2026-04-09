"use client"

import {motion} from "motion/react"
import { ShoppingBasket, Bike, ArrowRight } from "lucide-react"

type propType = {
    nextStep: (s: number) => void
}

function Welcome({ nextStep }: propType) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 2,
                }}
                className="flex items-center gap-3"
            >
                <ShoppingBasket className="w-10 h-10 text-pink-600" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700">
                    SnapCart
                </h1>
            </motion.div>
            <motion.p
                initial={{
                    opacity: 0,
                    y: 10
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.6,
                    delay: 0.3
                }}
                className="mt-4 text-gray-700 text-lg md:text-xl max-w-lg"
            >
                    Sua Loja de laços e acessórios
            </motion.p>
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0
                }}
                animate={{
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    duration: 2,
                    delay: 0.5
                }}
                className="flex items-center justify-center gap-10 mt-10"
            >
                <ShoppingBasket className="w-24 h-24 md:w-32 md:h-32 text-pink-600" />
                <Bike className="w-24 h-24 md:w-32 md:h-32 text-pink-600" />
            </motion.div>
            <motion.button
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 1
                }}
                transition={{
                    duration: 2,
                    delay: 0.5
                }}
                className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-=md transition-all duration-200 mt-10"
                onClick={() => nextStep(2)}
            >
                Próximo
                <ArrowRight className="w-24 h-24 md:w-32 md:h-32 text-pink-600" />
            </motion.button>
        </div>
    )
}

export default Welcome
