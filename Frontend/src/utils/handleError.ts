import toast from "react-hot-toast"

export const handleError = (error: any, setError: (error: string | null) => void) => {
    if(error.response.data.status === 400 || error.response.data.status === 401 || error.response.data.status === 404){
        setError(error.response.data.error || error.response.data.message)
    }
    else{
        setError("Internal Server Error")
        toast.error("An unexpected error occurred")
    }
}