import { ArrowLeft } from "lucide-react";
import { Outlet, useNavigate } from "react-router";

export default function FlowLayout() {
    const navigate = useNavigate()
    return (
        <div className="bg-[url('/bgIll.png')] min-h-[100vh] w-[100%] bg-center bg-cover">
            <div className="bg-[#f5f4fade] w-full min-h-[100vh] relative flex items-center justify-center py-20">
                <Outlet />
                <div onClick={() => navigate(-1)} className="absolute hover:cursor-pointer top-10 left-5 bg-white p-1 rounded-full text-2ndcolor-text shadow-2xl">
                    <ArrowLeft />
                </div>
            </div>
        </div>
    )
}
