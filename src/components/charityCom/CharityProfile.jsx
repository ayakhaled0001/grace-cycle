import React from "react";
import HomeNav from "../homeCom/HomeNav";

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
  return (
    <>
      <HomeNav backgroundColor="#F9F8F3" />
      <div className="min-h-screen bg-[#F9F8F3] py-8 px-2 md:px-8">
        <h2 className="text-lg md:text-xl font-nunitoBold text-[#225A4B] mb-6">
          Profile
        </h2>
        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 max-w-2xl mx-auto mb-6">
          <img
            src={charityData.avatar}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#E5E5E5]"
          />
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-1">
              <div>
                <div className="text-lg font-bold text-[#225A4B]">
                  {charityData.name}
                </div>
                <div className="text-sm text-gray-500">
                  {charityData.orgName}
                </div>
              </div>
              <button className="flex items-center gap-1 bg-[#225A4B] hover:bg-[#174032] text-white px-3 py-1 rounded-md text-sm font-semibold transition-colors">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5 20h14v2H5v-2zm14.71-13.29a1 1 0 0 0-1.42 0l-1.34 1.34 2.12 2.12 1.34-1.34a1 1 0 0 0 0-1.42l-.7-.7zm-2.05 2.76-2.12-2.12L6 15.59V18h2.41l9.25-9.53z"
                  />
                </svg>
                Edit
              </button>
            </div>
          </div>
        </div>
        {/* Personal Info Card */}
        <div className="bg-white rounded-lg border border-[#E5E5E5] shadow-sm p-4 md:p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="text-md font-bold text-[#225A4B]">
              Personal information
            </div>
            <button className="flex items-center gap-1 bg-[#225A4B] hover:bg-[#174032] text-white px-3 py-1 rounded-md text-sm font-semibold transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5 20h14v2H5v-2zm14.71-13.29a1 1 0 0 0-1.42 0l-1.34 1.34 2.12 2.12 1.34-1.34a1 1 0 0 0 0-1.42l-.7-.7zm-2.05 2.76-2.12-2.12L6 15.59V18h2.41l9.25-9.53z"
                />
              </svg>
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="text-gray-500">Email address</span>
              <div className="font-semibold text-gray-800">
                {charityData.email}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Phone</span>
              <div className="font-semibold text-gray-800">
                {charityData.phone}
              </div>
            </div>
            <div>
              <span className="text-gray-500">Password</span>
              <div className="font-semibold text-gray-800">
                {charityData.password}
              </div>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-500">Address</span>
              <div className="font-semibold text-gray-800">
                {charityData.address}
              </div>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-500">Bio</span>
              <div className="text-gray-700">{charityData.bio}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
