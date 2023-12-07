"use client";
import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const Profile = ({ userId, name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
 
  const handleNavigateToProfile = () => {
    router.push(`/profile/edit/${userId}?id=${userId}`);
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient capitalize">{name} Profile</span>
      </h1>
      {userId === session?.user.id && (
        <>
          <br />
          <button
            type="button"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleNavigateToProfile}
          >
            Edit My Profile
          </button>
        </>
      )}
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
