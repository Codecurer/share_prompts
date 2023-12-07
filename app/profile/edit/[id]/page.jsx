"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const EditMyProfile = () => {
  const searchParams = useSearchParams();
  const profileId = searchParams.get("id");
  const router = useRouter();

  const [profileData, setProfileData] = React.useState(null);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/users/${profileId}/edit`);
      const data = await response.json();
      setProfileData(data);
    };

    if (profileId) getPromptDetails();
  }, [profileId]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`/api/users/${profileId}/edit`, {
          method: "PATCH",
          body: JSON.stringify({
            username: profileData?.username,
          }),
        });
  
        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } 
  }
 
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Profile</span>
      </h1>
      <p className="desc text-left max-w-md">Update your profile</p>

      <form
        onSubmit={handleUpdateProfile}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Username <span className="font-normal">(@{profileData?.username})</span>
          </span>
          <input
            value={profileData?.username}
            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
            type="text"
            placeholder="John leo"
            className="form_input"
            required
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={false}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditMyProfile;
