import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function Github() {
    const data = useLoaderData()
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     fetch("https://api.github.com/users/rishitgondaliya")
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data);
//       });
//   }, []);
  return (
    <>
      <div className="text-xl flex justify-center w-max mx-auto items-center text-black m-4 p-2">
        <img src={data.avatar_url} alt="avatar" className="size-48 m-4" />
        <div className="ml-4">
          <div className="text-3xl">{data.name}</div>
          <div className="text-2xl">{data.bio}</div>
          <span className="mr-4">Followers : {data.followers}</span>
          <span className="mr-4">Following : {data.following}</span>
          <span className="mr-4">Repositories : {data.public_repos}</span>
        </div>
      </div>
    </>
  );
}

export const githubInfoLoader = async () => {
    let response = await fetch("https://api.github.com/users/rishitgondaliya")
    return response.json()
}
