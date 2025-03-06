import React from 'react';
import { useParams } from 'react-router-dom';
import postsData from '../data/posts.json';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';

const PostPage = () => {
  const { id } = useParams();
  const post = postsData.posts.find(p => p.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  // Convert newlines to JSX line breaks and '>' to list items
  const formatText = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('>')) {
        return (
          <li key={index} className="list-none ml-4 text-gray-300">
            {line.substring(1).trim()}
          </li>
        );
      }
      return line.trim() ? (
        <p key={index} className="mb-4">
          {line}
        </p>
      ) : <br key={index} />;
    });
  };

  return (
    <>
    <Header />
    <div className="mx-auto max-w-screen-lg px-3 py-6">
      <h1 className="text-center text-3xl font-bold">{post.title}</h1>
      
      <div className="mt-2 text-center text-sm text-gray-400">
        Posted on {post.date}
      </div>

      <div className="mx-auto mt-5 max-w-prose">
        <div className="aspect-w-3 aspect-h-2">
          <img
            className="h-full w-full rounded-lg object-cover object-center"
            src={`/info-resume-website/${post.image}`}
            alt={post.alt}
            loading="lazy"
          />
        </div>

        <div className="prose prose-invert mt-8 prose-img:rounded-lg">
          <div className="text-gray-300">
            {post.detailed ? (
              formatText(post.detailed)
            ) : (
              <p>{post.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PostPage;