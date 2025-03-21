/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function Postcard({ $id, title, featuredImage }) {
    const imageUrl = featuredImage
        ? appwriteService.getFilePreview(featuredImage)
        : "https://static.vecteezy.com/system/resources/previews/036/226/872/non_2x/ai-generated-nature-landscapes-background-free-photo.jpg";
    return (
        <Link to={`/post/${$id}`}>
            <div className="bg-[#f1f0d8] w-full rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={imageUrl} alt={title} className="rounded-xl"/>
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    )
}

export default Postcard