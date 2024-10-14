// src/components/Blog/BlogPost.js

import './styles.scss'; // Optional: import styles for the blog post

import React from 'react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import blogPostContent from './2023-01-13-neater-views-of-c-stl-containers.md';

const BlogPost = () => {
  return (
    <div className="blog-post">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {blogPostContent}
      </ReactMarkdown>
    </div>
  );
};

export default BlogPost;
