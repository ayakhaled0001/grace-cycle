import React from "react";
import HomeNav from "../homeCom/HomeNav";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const defaultCharityData = {
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
  // بيانات المستخدم
  const [charityData, setCharityData] = useState(defaultCharityData);
  const [avatar, setAvatar] = useState(defaultCharityData.avatar);
  const fileInputRef = useRef(null);
  const [isEditingOrgName, setIsEditingOrgName] = useState(false);
  const [orgName, setOrgName] = useState(defaultCharityData.orgName);
  const navigate = useNavigate();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(charityData);

  // عند تحميل الصفحة: اقرأ البيانات من localStorage إذا وجدت
  useEffect(() => {
    const savedData = localStorage.getItem("charityProfileData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCharityData(parsed);
      setEditData(parsed);
      setOrgName(parsed.orgName);
      setAvatar(localStorage.getItem("charityProfileAvatar") || parsed.avatar);
    } else {
      setEditData(defaultCharityData);
    }
    // الصورة
    const savedAvatar = localStorage.getItem("charityProfileAvatar");
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  // عند اختيار صورة جديدة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target.result); // عرض الصورة الجديدة مباشرة
        localStorage.setItem("charityProfileAvatar", ev.target.result); // حفظها
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

  // زر Logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BC0101",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      navigate("/login");
    }
  };

  // Modal handlers
  const handleOpenModal = () => {
    setEditData({ ...charityData });
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUpdates = () => {
    setCharityData(editData);
    setOrgName(editData.orgName);
    localStorage.setItem("charityProfileData", JSON.stringify(editData));
    setShowModal(false);
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
        {/* Settings Section */}
        <div className="bg-transparent rounded-lg border border-[#E5E5E5] shadow-sm p-4 md:p-6 mx-auto w-[80%] mt-6">
          <div className="text-md font-bold text-xl mb-4">Settings</div>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLogout}
              className="font-nunitoBold border-solid border-[#BC0101] border-2 w-full text-[#BC0101] rounded-[11px] hover:bg-[#BC0101] hover:text-white transition-all text-center py-2"
            >
              Logout
            </button>
            <button
              className="font-nunitoBold border-solid border-btnsGreen border-2 w-full text-btnsGreen rounded-[11px] hover:bg-btnsGreen hover:text-white transition-all text-center py-2"
              onClick={handleOpenModal}
            >
              Update your information
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4 text-[#225A4B]">
                Update your information
              </h2>
              <div className="flex flex-col gap-3">
                <label className="text-[#225A4B] font-semibold">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="text-[#225A4B] font-semibold">
                  Organization Name
                  <input
                    type="text"
                    name="orgName"
                    value={editData.orgName}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="text-[#225A4B] font-semibold">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="text-[#225A4B] font-semibold">
                  Phone
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="text-[#225A4B] font-semibold">
                  Password
                  <input
                    type="text"
                    name="password"
                    value={editData.password}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="text-[#225A4B] font-semibold">
                  Address
                  <input
                    type="text"
                    name="address"
                    value={editData.address}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
                <label className="text-[#225A4B] font-semibold">
                  Bio
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleEditChange}
                    className="w-full border rounded px-2 py-1 mt-1"
                  />
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUpdates}
                  className="px-4 py-2 rounded bg-btnsGreen text-white hover:bg-green-700 font-semibold"
                >
                  Save Updates
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
