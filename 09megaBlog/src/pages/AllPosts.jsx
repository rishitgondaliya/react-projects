/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components/index';
import appwriteService from '../appwrite/config';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts([])
      .then((response) => {
        if (response) {
          setPosts(response.documents);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Loading blogs for you...
            </h1>
          </div>
        </div>
      </Container>
    </div>
  }

  if (!posts.length) {
    return <div className="text-center text-3xl my-8">No blogs available</div>;
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
