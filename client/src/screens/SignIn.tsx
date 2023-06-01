import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useUser from "../store/useUser"

type Props = {}

const SignIn = ({}: Props) => {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const setUser = useUser((s) => s.setUser)

    const handleSignIn = async () => {
        setLoading(true)
        try {
            const user = await axios.get(
                `${"https://roshan-kumar-dobby-api.onrender.com"}/api/user?email=${email}&password=${password}`,
                {
                    withCredentials: true,
                }
            )
            if (user) {
                localStorage.setItem("user", JSON.stringify(user.data))
                setUser(user.data)
                navigate("/")
            }
        } catch (e: any) {
            console.log(e)
            setErr(e.response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="pt-24 px-10 h-screen w-full  bg-gradient-to-br from-gray-700 to-gray-900 flex justify-center items-center">
            {/* Form */}
            <div className="bg-white shadow-xl p-5 flex flex-col gap-y-4  rounded-md w-full lg:w-5/12 ">
                <h1 className="font-semibold text-3xl">SignIn</h1>

                {/* email */}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="p-3 border-2 border-gray-400 rounded-md  placeholder:text-gray-500 outline-0 w-full"
                    placeholder="Email"
                />
                {/* password */}
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="p-3 border-2 border-gray-400 rounded-md  placeholder:text-gray-500 outline-0 w-full"
                    placeholder="Password"
                />
                {err && (
                    <h1 className="bg-red-700 text-white p-2 font-semibold text-center ">
                        {err}
                    </h1>
                )}

                {loading && (
                    <div className="w-12 h-12 rounded-full border-4 border-white border-t-black animate-spin mx-auto mt-4 "></div>
                )}

                <button
                    onClick={handleSignIn}
                    className="w-full rounded-lg p-2 py-3 active:scale-95 transition-all font-semibold text-white bg-gradient-to-br from-gray-700 to-gray-900 outline-0"
                >
                    SignIn
                </button>
                <Link to={"/signup"}>
                    <p className="text-center capitalize text-sm cursor-pointer text-gray-700 hover:underline underline-offset-4">
                        Don't Have A Account? SignUp
                    </p>
                </Link>
            </div>
        </main>
    )
}

export default SignIn
