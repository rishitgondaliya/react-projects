/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to get user state
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // New state for loading
    const userData = useSelector((state) => state.auth.userData); // Get the user data from Redux store

    useEffect(() => {
        if (userData) {
            appwriteService.getPosts()
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents);
                    }
                })
                .finally(() => setLoading(false)); // Stop loading once the posts are fetched
        } else {
            setLoading(false); // Stop loading if user is not logged in
        }
    }, [userData]);

    // If the user is not logged in, show login message
    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Please login to see all blogs...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // If the user is logged in and blogs are loading
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
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
        );
    }

    // If no posts are available
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No blogs available at the moment. Please check back later!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // If posts are available
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-1/4 p-2">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
