function Unauthorized() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-red-600">
                Acesso Negado
            </h1>
            <p className="mt-2 text-gray-700">
                Você não tem acesso a esta página.
            </p>
        </div>
    )
}

export default Unauthorized