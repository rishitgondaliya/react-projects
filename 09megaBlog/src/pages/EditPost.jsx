import { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'

function EditPost() {
  const [post, setPosts] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug)
        .then((post) => {
          if (post) setPosts(post)
        })
    } else navigate('/')
  }, [slug, navigate])

  return post ? (
    <div className="py-8">
      <Container className="max-w-4xl mx-auto p-4 sm:p-6">
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost