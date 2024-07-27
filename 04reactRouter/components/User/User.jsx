import { useParams } from "react-router-dom"

export default function User(){
    const {userId} = useParams();
    return(
        <>
        <div className="bg-gray-200 text-2xl p-4 text-black text-center">
            User: {userId}
        </div>
        </>
    )
}