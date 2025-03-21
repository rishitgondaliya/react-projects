import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  useEffect(() => {
    console.log("Post Author ID:", post?.userId);
    console.log("Current User ID:", userData?.$id);
    console.log("Is Author:", isAuthor);
    console.log("Post data:", post)
  })

  const deletePost = () => {
    appwriteService.deletePost(post.$id)
      .then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
  };

  if (!post || !userData) {
    return <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Loading your blog...
            </h1>
          </div>
        </div>
      </Container>
    </div>
  }


  return post ? (
    <div className="py-8 w-2/3 mx-auto">
      <Container>
        <div className="w-full mb-6">
          <h1 className="text-2xl ml-4 font-bold">{post.title}</h1>
        </div>
        <div className="w-fit h-[60vh] flex justify-cente mx-auto mb-4 relative border border-black rounded-xl p-2">
          {post.featuredImage ? (
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl"
            />
          ) : (
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/226/872/non_2x/ai-generated-nature-landscapes-background-free-photo.jpg"
              alt="Placeholder"
              className="rounded-xl"
            />
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Link to={`/all-blogs`}>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="browser-css">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
