import React, { useEffect, useState } from "react"
import { RiImageAddLine } from "react-icons/ri"
import Upload from "../components/Upload"
import useUser from "../store/useUser"
import axios from "axios"
import { Buffer } from "buffer"
import { Link } from "react-router-dom"

type Props = {}

interface ImageProps {
    name: string
    data: {
        type: string
        data: number[]
    }
}

const Home = ({}: Props) => {
    const [showModal, setShowModal] = useState(false)
    const user = useUser((s) => s.user)
    const [isLoading, setIsLoading] = useState(false)

    const [update, setUpdate] = useState(false)
    const [images, setImages] = useState<ImageProps[]>([])
    const [filteredImages, setFilteredImages] = useState<ImageProps[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    const fetchImages = async () => {
        setIsLoading(true)
        try {
            if (user) {
                const images = await axios.get<ImageProps[]>(
                    `${import.meta.env.VITE_SERVER_ENDPOINT}/api/upload/${
                        user.email
                    }`
                )

                setImages(images.data)
                setFilteredImages(images.data)
                console.log(images.data)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [update, user])

    useEffect(() => {
        if (searchTerm.trim().length === 0) {
            setFilteredImages(images)
        } else {
            const filter = images.filter((im) =>
                im.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredImages(filter)
        }
    }, [searchTerm])

    return (
        <main className="pt-24 px-10 min-h-screen w-full items-center bg-gradient-to-br from-gray-700 to-gray-900 pb-10">
            <div className="flex justify-between mt-6 items-center">
                <h1 className="text-white font-semibold text-3xl ">
                    Your Photos
                </h1>
                {/* search */}
                {user && (
                    <div>
                        <input
                            type="search"
                            className="p-3 rounded-lg bg-white border-2 border-black outline-none w-80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Images"
                        />
                    </div>
                )}
                {user && (
                    <button
                        onClick={() => setShowModal((e) => !e)}
                        className="bg-white rounded-lg p-2 shadow-lg"
                    >
                        <RiImageAddLine className="text-3xl text-whte" />
                    </button>
                )}
            </div>
            {/*    Images  */}
            <div className="grid w-max mx-auto grid-cols-3 mt-10 gap-6">
                {filteredImages &&
                    user &&
                    filteredImages.map((img, i) => {
                        return (
                            <div key={i} className="p-3 rounded-md bg-white">
                                <img
                                    alt="Image"
                                    className="h-80 w-80"
                                    src={`data:image/jpeg;base64,${Buffer.from(
                                        img.data.data
                                    ).toString("base64")}`}
                                />
                                <p className="text-xl font-semibold text-center py-2">
                                    {img.name}
                                </p>
                            </div>
                        )
                    })}
            </div>
            {/* Spinner */}
            {images.length == 0 && isLoading && (
                <div className="w-12 h-12 rounded-full border-4 border-white border-t-black animate-spin mx-auto mt-4 "></div>
            )}
            {/* Sign In Btn */}
            {!user && (
                <Link to={"/signin"}>
                    <button className=" bg-white  rounded-lg p-2 py-3 active:scale-95 transition-all font-semibold text-black flex justify-center outline-0  px-20 text-2xl mx-auto mt-20">
                        SignIn
                    </button>
                </Link>
            )}
            {/* Image Upload Modal */}
            {showModal && (
                <Upload setUpdate={setUpdate} setShowModal={setShowModal} />
            )}
        </main>
    )
}

export default Home
