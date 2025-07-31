import { Outlet } from "react-router";

export default function FlowLayout() {
    return (
        <div className="bg-[url('/bgIll.png')] min-h-[100vh] w-[100%] bg-center bg-cover">
            <div className="bg-[#f5f4fade] w-full h-full relative flex items-center justify-center py-20">
                <Outlet />
            </div>
        </div>
    )
}
