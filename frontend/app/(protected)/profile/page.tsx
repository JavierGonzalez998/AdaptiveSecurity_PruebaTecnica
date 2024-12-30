import Divider from "@/components/global/divider/divider"
import ProfileInfo from "./components/profileInfo/profileInfo"
import AdoptedDogs from "./components/adoptedDogs/adoptedDogs"
export default function Profile(){
    return (
        <div>
            <h1 className="text-center font-semibold text-xl my-5">Mi perfil</h1>
            <Divider />
            <ProfileInfo />
            <AdoptedDogs />
        </div>
    )
}