"use client";

import { useState, useEffect, useCallback } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post?._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  let timer = null;

  const debounceSearch = useCallback((callback, delay) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback();
    }, delay);
  }, []);

  const search = (searchString) => {
    if (searchString !== "") {
      const searchResults = posts.filter(
        (post) =>
          post.creator.username.includes(searchString) ||
          post.creator.email.includes(searchString) ||
          post.prompt.includes(searchString) ||
          post.tag.includes(searchString)
      );
      setFilteredPosts(searchResults);
    } else {
      setFilteredPosts(posts);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    debounceSearch(() => search(e.target.value), 1000);
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
    setFilteredPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
