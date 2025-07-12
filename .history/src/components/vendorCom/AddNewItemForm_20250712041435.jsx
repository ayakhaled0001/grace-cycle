import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { addBag } from "../../redux/AddBagsSlice";
import { addVendorBag } from "../../redux/VendorBagListingSlice";

const CATEGORIES_API = "https://gracecycleapi.azurewebsites.net/api/categories";

// Food and Bag image URLs
const FOOD_IMAGES = [
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1742080370/Koshari_yrafbi.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1742080377/Makarona_Bechamel_dkfnfn.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1742080427/Falafel_rsmkoh.webp",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1742080371/Molokhia_vpdkio.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1742080411/Konafa_mhlz6k.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1741704903/Kahk_knejon.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1742080414/Om_Ali_uwesio.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1742080371/Mahshi_ool4vu.webp",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1741924642/shawarma_hcefow.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1741654724/pistachiobaklava_nuopur.jpg",
];
const BAG_IMAGES = [
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1743696095/Foodies_Bag_v8a6qj.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1743696095/newyear_bag_qna1bg.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1743696095/eid_bag_so8yas.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1743696095/magic_bag_geje1e.jpg",
  "https://res.cloudinary.com/dwlsfsaup/image/upload/v1743696095/RamadanBag_ukx5hd.webp",
];

const AddNewItemForm = ({ type }) => {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    originalPrice: "",
    discountPrice: "",
    expiryDate: "",
    condition: "human",
    image: null,
    description: "",
    selectedItems: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const {
  //   loading: addBagLoading,
  //   success: addBagSuccess,
  //   error: addBagError,
  // } = useSelector((state) => state.addBag);

  // Helper to get token
  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    setLoadingCategories(true);
    fetch(CATEGORIES_API)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
        setCategoriesError(null);
      })
      .catch((err) => {
        setCategoriesError("Failed to load categories");
        setCategories([]);
      })
      .finally(() => setLoadingCategories(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check image size (max 2MB)
    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Image size too large",
        text: "Image size must be less than 2MB",
        confirmButtonText: "OK",
      });
      return;
    }

    // Map selectedItems (category names) to their IDs
    const selectedCategoryIds = categories
      .filter((cat) => formData.selectedItems.includes(cat.name))
      .map((cat) => cat.id || cat._id);

    let picUrl = "";
    let usedMatchedImage = false;
    if (formData.image) {
      // Check for a match in FOOD_IMAGES or BAG_IMAGES by file name (case-insensitive, no extension)
      const fileName = formData.image.name.split(".")[0].toLowerCase();
      if (type === "bag") {
        // Try to match bag image by name
        const foundBagImg = BAG_IMAGES.find((url) => {
          // extract the name part from the url before extension
          const match = url.match(/\/([^\/]+)\.[a-zA-Z0-9]+$/);
          if (match) {
            return match[1].toLowerCase() === fileName;
          }
          return url.toLowerCase().includes(fileName);
        });
        if (foundBagImg) {
          picUrl = foundBagImg;
          usedMatchedImage = true;
        }
      } else {
        // Try to match food image by name
        const foundFoodImg = FOOD_IMAGES.find((url) => {
          const match = url.match(/\/([^\/]+)\.[a-zA-Z0-9]+$/);
          if (match) {
            return match[1].toLowerCase() === fileName;
          }
          return url.toLowerCase().includes(fileName);
        });
        if (foundFoodImg) {
          picUrl = foundFoodImg;
          usedMatchedImage = true;
        }
      }
    }
    if (formData.image && !usedMatchedImage) {
      setUploadingImage(true);
      const data = new FormData();
      data.append("file", formData.image);
      data.append("upload_preset", "graceCycle"); // اسم الـ Upload Preset
      data.append("folder", "graceCycle_uploads"); // اسم المجلد في Cloudinary
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dwlsfsaup/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        if (res.status === 401) {
          setUploadingImage(false);
          Swal.fire({
            icon: "error",
            title: "Image upload failed!",
            text: "Cloudinary credentials are incorrect or upload_preset is not Unsigned. Please check settings.",
            confirmButtonText: "OK",
          });
          // Use default image link
          picUrl =
            "https://res.cloudinary.com/dwlsfsaup/image/upload/v1752178118/Mansaf_wuhtz6.jpg";
        } else {
          const imgData = await res.json();
          picUrl = imgData.secure_url || "";
        }
      } catch (err) {
        setUploadingImage(false);
        Swal.fire({
          icon: "error",
          title: "Image upload failed!",
          text: "An error occurred during image upload. A default image will be used.",
          confirmButtonText: "OK",
        });
        // Use default image link
        picUrl =
          "https://res.cloudinary.com/dwlsfsaup/image/upload/v1752178118/Mansaf_wuhtz6.jpg";
      }
      setUploadingImage(false);
    }
    // If no image uploaded or selected, use a random link by type
    if (!picUrl) {
      if (type === "bag") {
        picUrl = BAG_IMAGES[Math.floor(Math.random() * BAG_IMAGES.length)];
      } else {
        // Try to find a food image by name
        const normalizedName = formData.foodName
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "");
        const foundImg = FOOD_IMAGES.find((url) =>
          url.toLowerCase().includes(normalizedName)
        );
        if (foundImg) {
          picUrl = foundImg;
        } else {
          picUrl = FOOD_IMAGES[Math.floor(Math.random() * FOOD_IMAGES.length)];
        }
      }
    }

    // Prepare the payload based on type
    let payload;

    if (type === "bag") {
      // Bag payload structure - ensure all required fields are present
      payload = {
        name: formData.foodName || "",
        description: formData.description || "",
        picUrl: picUrl || "",
        quantity: Number(formData.quantity) || 0,
        newPrice: Number(formData.discountPrice) || 0,
        foodIds:
          selectedCategoryIds && selectedCategoryIds.length > 0
            ? selectedCategoryIds
            : [1, 2, 3], // Default food IDs if none selected
      };

      // Validate required fields
      if (
        !payload.name ||
        !payload.picUrl ||
        payload.quantity <= 0 ||
        payload.newPrice <= 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Missing Required Fields",
          text: "Please fill in all required fields: Bag Name, Quantity, and Price.",
          confirmButtonText: "OK",
        });
        return;
      }
    } else {
      // Food item payload structure
      payload = {
        Name: formData.foodName,
        Description: formData.description,
        PicUrl: picUrl,
        Quantity: Number(formData.quantity),
        UnitPrice: Number(formData.originalPrice),
        NewPrice: Number(formData.discountPrice),
        CategoryIds: selectedCategoryIds,
      };
    }

    // Extract food name from PicUrl (before extension)
    let extractedFoodName = "";
    if (picUrl) {
      const match = picUrl.match(/\/([^\/]+)\.[a-zA-Z0-9]+$/);
      if (match) {
        extractedFoodName = match[1];
      }
    }
    console.log("Payload to be sent:", payload);
    console.log("Selected PicUrl:", picUrl);
    console.log("Extracted food name from PicUrl:", extractedFoodName);

    // Get token and check
    const token = getToken();
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized!",
        text: "Please log in first to add a product.",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      if (type === "bag") {
        // Temporarily disabled - use fetch for bags too
        const res = await fetch(
          "https://gracecycleapi.azurewebsites.net/api/Bags/add-Bag",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error("Failed to add bag. Please try again.");
        await Swal.fire({
          icon: "success",
          title: "Bag added successfully!",
          text: "Bag has been added to your listings.",
          confirmButtonText: "OK",
        });
      } else {
        // Use fetch for adding food items (existing logic)
        const res = await fetch(
          "https://gracecycleapi.azurewebsites.net/api/Foods/add-food",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok)
          throw new Error("Failed to add product. Please try again.");
        await Swal.fire({
          icon: "success",
          title: "Added successfully!",
          text: "Product added successfully.",
          confirmButtonText: "OK",
        });
      }
      navigate("/VendorPage/myListings");
    } catch (err) {
      console.error("API Error:", err);
      let errorMessage = "An error occurred during addition.";

      if (err.message) {
        errorMessage = err.message;
      } else if (err.payload) {
        errorMessage = err.payload;
      } else if (err.error) {
        errorMessage = err.error;
      }

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        confirmButtonText: "OK",
      });
    }
  };

  const handleItemSelect = (item) => {
    setFormData((prev) => {
      const exists = prev.selectedItems.includes(item);
      return {
        ...prev,
        selectedItems: exists
          ? prev.selectedItems.filter((i) => i !== item)
          : [...prev.selectedItems, item],
      };
    });
  };

  return (
    <>
      <div
        className="font-bold text-xl md:text-2xl text-center mb-8 text-[#BC0101] tracking-wide font-nunitoExtralight rounded-lg animate-bounce"
        style={{ letterSpacing: "0.04em" }}>
        Join us in reducing food waste! <br />
        Every item you add makes a difference
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <label className="font-nunitoBold text-lg">
            {type === "bag" ? "Bag Name" : "Product Name"}
            <input
              type="text"
              className="rounded-lg border-2 bg-offWhite border-[#A6A6A6] focus:border-[#225A4A] focus:outline-none px-2 py-1 w-full mt-1"
              value={formData.foodName}
              onChange={(e) =>
                setFormData({ ...formData, foodName: e.target.value })
              }
              required
            />
          </label>
          <label className="font-nunitoBold text-lg">
            {type === "bag" ? "Number of it" : "Quantity"}
            <input
              type="number"
              className="rounded-lg border-2 bg-offWhite border-[#A6A6A6] focus:border-[#225A4A] focus:outline-none px-2 py-1 w-full mt-1"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
            />
          </label>
          <div className="flex gap-4">
            <label className="font-nunitoBold text-lg w-1/2">
              Original Price
              <input
                type="number"
                className="rounded-lg border-2 bg-offWhite border-[#A6A6A6] focus:border-[#225A4A] focus:outline-none px-2 py-1 w-full mt-1"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: e.target.value })
                }
                required
              />
            </label>
            <label className="font-nunitoBold text-lg w-1/2">
              Discounted Price
              <input
                type="number"
                className="rounded-lg border-2 bg-offWhite border-[#A6A6A6] focus:border-[#225A4A] focus:outline-none px-2 py-1 w-full mt-1"
                value={formData.discountPrice}
                onChange={(e) =>
                  setFormData({ ...formData, discountPrice: e.target.value })
                }
                required
              />
            </label>
          </div>
          {(type === "bag" || type === "product") && (
            <label className="font-nunitoBold text-lg">
              Select items
              <div className="border-2 border-[#225A4A] rounded-lg bg-offWhite h-32 overflow-y-auto mt-1 flex flex-col gap-2 p-2 w-full">
                {loadingCategories && (
                  <span className="text-gray-500">Loading...</span>
                )}
                {categoriesError && (
                  <span className="text-red-500">{categoriesError}</span>
                )}
                {!loadingCategories &&
                  !categoriesError &&
                  categories.length === 0 && (
                    <span className="text-gray-500">
                      No categories available
                    </span>
                  )}
                {!loadingCategories &&
                  !categoriesError &&
                  categories.map((cat) => (
                    <label
                      key={cat.id || cat._id || cat.name}
                      className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.selectedItems.includes(cat.name)}
                        onChange={() => handleItemSelect(cat.name)}
                        className="w-5 h-5 accent-[#225A4A]"
                      />
                      <span className="text-base">{cat.name}</span>
                    </label>
                  ))}
              </div>
            </label>
          )}
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-4">
          <label className="font-nunitoBold text-lg">
            Upload Image
            <div className="w-full h-44 border-2 border-[#A6A6A6] rounded-lg border-dashed bg-offWhite flex flex-col items-center justify-center mt-1 relative overflow-hidden">
              {uploadingImage ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#225A4A]"></div>
                  <p className="mt-2">Uploading image...</p>
                </div>
              ) : imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="absolute top-0 left-0 w-full h-44 object-cover rounded-lg z-10"
                  style={{ borderRadius: "0.5rem" }}
                />
              ) : (
                <>
                  <img
                    src="/icons/upload.svg"
                    alt="upload file"
                    className="w-16"
                  />
                  <p className="font-nunitoBold text-[#A6A6A6] px-2">
                    Image must be less than{" "}
                    <span className="text-black">2MB</span> in size
                  </p>
                  <label
                    htmlFor="image"
                    className="bg-[#225A4A] mt-1 font-nunitoBold text-lg rounded-md text-white px-4 py-1 cursor-pointer">
                    Upload
                  </label>
                </>
              )}
              <input
                type="file"
                id="image"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormData({ ...formData, image: file });
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  } else {
                    setImagePreview(null);
                  }
                }}
              />
            </div>
          </label>
          <label className="font-nunitoBold text-lg">
            Add Description
            <textarea
              className="w-full h-40 border-2 border-[#A6A6A6] rounded-lg bg-offWhite flex flex-col items-center justify-center mt-1 p-2"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </label>
          <div className="flex gap-4 mt-4 w-full">
            <button
              type="submit"
              className="bg-[#225A4A] font-nunitoBold text-lg w-1/2 rounded-md text-white px-4 py-2"
              disabled={uploadingImage}>
              {uploadingImage
                ? "Adding..."
                : `Add ${type === "bag" ? "Bag" : "Item"}`}
            </button>
            <button
              type="button"
              className="text-[#BC0101] border-[#BC0101] border-2 font-nunitoBold text-lg w-1/2 rounded-md px-4 py-2"
              onClick={() =>
                setFormData({
                  foodName: "",
                  quantity: "",
                  originalPrice: "",
                  discountPrice: "",
                  expiryDate: "",
                  condition: "human",
                  image: null,
                  description: "",
                  selectedItems: [],
                })
              }
              disabled={uploadingImage}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddNewItemForm;
