import { SparklesIcon } from "@heroicons/react/solid";
import React from "react";
import Input from "./Input";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Post from "./Post";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { signOut, useSession } from "next-auth/react";

const Feed = ({ isOpen, setIsOpen, postId, setPostId }) => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  // MESSY
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //     (snapshot) => {
  //       setPosts(snapshot.docs);
  //     }
  //   );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [db]);

  // CLEAN
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
          <SparklesIcon className="h-5 text-white" />
        </div>
        <div className="flex flex-1 justify-end">
          <img
            src={session.user.image}
            alt=""
            className=" sm:hidden h-10 w-10 rounded-full xl:mr-2.5 " onClick={signOut}
          />
        </div>
      </div>
      <Input />
      <div className="pb-72">
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              post={post.data()}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              postId={postId}
              setPostId={setPostId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
