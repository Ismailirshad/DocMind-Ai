import api from "@/lib/axios"
import toast from "react-hot-toast"
import { create } from "zustand"

export const documentStore = create((set) =>({
    document: null,
    loading: false,

    uploadDocument: async(formData) => {
        set({loading: true})
        try {
            
            await api.post("api/document/upload", formData, {withCredentials: true})
            console.log("formatda", formData)
            set({loading: false})
            toast.success("Document uploaded successfully")
        } catch (error) {
            set({loading: false})
            toast.error(error.response?.data?.message)
        }
    },
    fetchDocument: async() => {
        try {
            
        } catch (error) {
            
        }
    }

}))