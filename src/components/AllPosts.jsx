import React from 'react';
import postsData from '../data/posts.json';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';

const AllPosts = () => {
  const posts = postsData.posts; // Get all posts

  return (
    <div className="App bg-slate-900 text-gray-100">
      <Header />
      <div className="mx-auto max-w-screen-lg px-3 py-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            My <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Posts</span>
          </h1>
          <div className="mt-3 text-gray-200">Latest news, updates and blog posts about my career journey</div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-lg px-3 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const PostCard = ({ post }) => {
  return (
        <Link className="hover:translate-y-1" to={"/info-resume-website/posts/" + post.id}>
      <div className="overflow-hidden rounded-md bg-slate-800">
        <div className="aspect-w-3 aspect-h-2">
          <img
            className="h-full w-full object-cover object-center"
            src={`/info-resume-website/${post.image}`}
            alt={post.alt}
            loading="lazy"
          />
        </div>
        <div className="px-3 pt-4 pb-6 text-center">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <div className="mt-1 text-xs text-gray-400">{post.date}</div>
          <div className="mt-2 text-sm">{post.description}</div>
        </div>
      </div>
    </Link>
  );
};

export default AllPosts;