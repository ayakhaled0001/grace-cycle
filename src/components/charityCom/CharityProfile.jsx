import React from "react";
import HomeNav from "../homeCom/HomeNav";
import { useRef, useState } from "react";

const charityData = {
  name: "Charity",
  orgName: "Alkhayr Charity",
  email: "alshalul123@gmail.com",
  phone: "0101 234 5678",
  password: "Alkhayr4567#",
  address: "Egypt, Cairo, wast albalad, Ahmed Ourabi Street",
  bio: "A charity that works to help the needy. We seek to expand social solidarity among people.",
  avatar: "/public/homeMedia/usericon.png",
};

export default function CharityProfile() {
  const [avatar, setAvatar] = useState(charityData.avatar);
  const fileInputRef = useRef(null);
  const [isEditingOrgName, setIsEditingOrgName] = useState(false);
  const [orgName, setOrgName] = useState(charityData.orgName);

  // عند اختيار صورة جديدة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target.result); // عرض الصورة الجديدة مباشرة
        // يمكنك هنا إرسال الصورة للباك إذا أردت
      };
      reader.readAsDataURL(file);
    }
  };

  // عند الضغط على الصورة
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveOrgName = () => {
    setIsEditingOrgName(false);
    // يمكنك هنا إرسال orgName للباكند إذا أردت
  };

  return (
    <>
      <HomeNav backgroundColor="bg-[#EEEADF]" />
      <div className="min-h-screen bg-[#F9F8F3] py-8 px-2 md:px-8 font-nunitoBold">
        <h2 className="text-lg md:text-xl font-nunitoBold text-[#225A4B] mb-6 w-[80%] mx-auto">
          Profile
        </h2>
        {/* Profile Card */}
        <div className="bg-transparent rounded-lg border border-[#E5E5E5] shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8  mx-auto mb-6  w-[80%]">
          <img
            src={avatar}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#E5E5E5] cursor-pointer"
            onClick={handleImageClick}
            title="Click to change profile picture"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-1">
              <div>
                <div className="text-lg font-bold text-[#225A4B]">
                  {charityData.name}
                </div>
                <div className="text-sm text-gray-500">
                  {isEditingOrgName ? (
                    <input
                      className="text-sm text-gray-500 border rounded px-2 py-1"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    orgName
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Personal Info Card */}
        <div className="bg-transparent rounded-lg border border-[#E5E5E5] shadow-sm p-4 md:p-6 mx-auto w-[80%]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-md font-bold text-xl">
              Personal information
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="mb-4 p-3">
              <span className="text-[#225A4B]">Email address</span>
              <div className="font-semibold text-black">
                {charityData.email}
              </div>
            </div>
            <div className="mb-4 p-3">
              <span className="text-[#225A4B] text-lg">Phone</span>
              <div className="font-semibold text-gray-800">
                {charityData.phone}
              </div>
            </div>
            <div className="mb-4 p-3">
              <span className="text-[#225A4B] text-lg">Password</span>
              <div className="font-semibold text-gray-800">
                {charityData.password}
              </div>
            </div>
            <div className="md:col-span-2 mb-4 p-3">
              <span className="text-[#225A4B] text-lg">Address</span>
              <div className="font-semibold text-gray-800">
                {charityData.address}
              </div>
            </div>
            <div className="md:col-span-2 mb-4 p-3">
              <span className="text-[#225A4B] text-lg">Bio</span>
              <div className="text-gray-700">{charityData.bio}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
