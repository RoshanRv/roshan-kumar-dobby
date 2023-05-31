import { create } from "zustand"

type User = {
    name: string
    email: string
}

interface UseUser {
    user: User | null
    setUser: (user: User | null) => void
}

const useUser = create<UseUser>()((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}))

export default useUser
