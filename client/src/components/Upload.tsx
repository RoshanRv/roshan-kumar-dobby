import axios from "axios"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import useUser from "../store/useUser"

const Upload = ({
    setShowModal,
    setUpdate,
}: {
    setShowModal: (val: boolean) => void
    setUpdate: any
}) => {
    const [imgName, setImgName] = useState("")
    const [img, setImg] = useState<File | null>(null)

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        setImg(e.target.files ? e.target.files[0] : null)
    }

    const user = useUser((s) => s.user)

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("image", img as Blob)
        // formData.append("name", imgName)
        try {
            if (user) {
                const img = await axios.post(
                    `${
                        import.meta.env.VITE_SERVER_ENDPOINT
                    }/api/upload/${imgName}?email=${user.email}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                if (img) {
                    setUpdate((e: any) => !e)
                    setShowModal(false)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="flex justify-center h-full w-full items-center bg-black/20 backdrop-blur-sm fixed top-0 left-0">
            {/* Form */}
            <div className="bg-white shadow-xl p-5 flex flex-col gap-y-3  rounded-md lg:w-5/12 relative">
                <h1 className="font-semibold text-3xl mb-4">Upload Image</h1>
                <IoMdClose
                    onClick={() => setShowModal(false)}
                    className="absolute top-5 right-5 text-3xl cursor-pointer"
                />
                {/* name */}
                <input
                    value={imgName}
                    onChange={(e) => setImgName(e.target.value)}
                    type="text"
                    className="p-3 border-2 border-gray-400 rounded-md  placeholder:text-gray-500 outline-0 w-full"
                    placeholder="Image Name"
                />
                {/* file */}
                <input
                    type="file"
                    onChange={handleImage}
                    className="appearance-none cursor-pointer p-2 rounded-lg w-full opacity-0 z-50 "
                />
                <button className="w-full rounded-lg p-2 py-3 active:scale-95 transition-all font-semibold text-white bg-gradient-to-br from-gray-700 to-gray-900 outline-0 -translate-y-12">
                    Select Image
                </button>
                <button
                    onClick={handleUpload}
                    className="w-full rounded-lg p-2 py-3 active:scale-95 transition-all font-semibold text-white bg-gradient-to-br from-gray-700 to-gray-900 outline-0 -mt-10"
                >
                    Upload Image
                </button>
            </div>
        </div>
    )
}

export default Upload
