import { useEffect } from "react"
import { IoMdLogIn } from "react-icons/io"
import { BiLogOutCircle } from "react-icons/bi"
import { Link } from "react-router-dom"
import useUser from "../store/useUser"
import { shallow } from "zustand/shallow"

const Header = () => {
    const { setUser, user } = useUser(
        ({ setUser, user }) => ({ setUser, user }),
        shallow
    )

    useEffect(() => {
        const locUser = localStorage.getItem("user")

        if (locUser) {
            const user = JSON.parse(locUser)
            setUser(user)
        }
    }, [])

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    return (
        <header className="flex justify-between px-10 py-6 w-full items-center bg-transparent absolute top-0 text-white border-b">
            <Link to={"/"}>
                <h1 className="text-3xl font-semibold">Picseum</h1>
            </Link>
            {!user ? (
                <Link to={"/signin"}>
                    <IoMdLogIn className="text-3xl" />
                </Link>
            ) : (
                <div className="flex gap-x-4 items-center">
                    <h1 className="px-1 text-white text-lg font-semibold">
                        {user.name}
                    </h1>
                    <BiLogOutCircle
                        onClick={handleLogout}
                        className="text-3xl cursor-pointer"
                    />
                </div>
            )}
        </header>
    )
}

export default Header
