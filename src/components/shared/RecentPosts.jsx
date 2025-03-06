import React from 'react';
import postsData from '../../data/posts.json';
import { Link } from 'react-router-dom';

const RecentPosts = () => {
  const posts = postsData.posts.slice(0, 3);

  return (
    <div className="mx-auto max-w-screen-lg px-3 py-6">
      <div className="mb-6 text-2xl font-bold">
        <div className="flex items-baseline justify-between">
          <div>
            Recent <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Posts</span>
          </div>
          <div className="text-sm">
            <Link to="/posts">View all Posts →</Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const PostCard = ({ post }) => {
  return (
    <a className="hover:translate-y-1" href={"/posts/" + post.id}>
      <div className="overflow-hidden rounded-md bg-slate-800">
        <div className="aspect-w-3 aspect-h-2">
          <img
            className="h-full w-full object-cover object-center"
            src={`../${post.image}`}
            alt={post.alt}
            loading="lazy"
          />
        </div>
        <div className="px-3 pt-4 pb-6 text-center">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <div className="mt-1 text-xs text-gray-400">{post.date}</div>
          <div className="mt-2 text-sm">{post.description}</div>
        </div>
      </div>
    </a>
  );
};

export default RecentPosts;