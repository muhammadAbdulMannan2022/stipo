// import { ArrowLeft } from "lucide-react";
// import { useContext } from "react";
import { Outlet } from "react-router";
// import { RouteContext } from "../../App";

export default function FlowLayout() {
  // const navigate = useNavigate()
  // const { setCurrentRoute }: any = useContext(RouteContext)
  return (
    <div className="">
      <div className="w-full min-h-[100vh] relative flex items-center justify-center py-20">
        <Outlet />
        {/* <div onClick={() => {
                    setCurrentRoute()
                    navigate(-1)
                    }} className="absolute hover:cursor-pointer top-10 left-5 bg-white p-1 rounded-full text-2ndcolor-text shadow-2xl">
                    <ArrowLeft />
                </div> */}
      </div>
    </div>
  );
}
