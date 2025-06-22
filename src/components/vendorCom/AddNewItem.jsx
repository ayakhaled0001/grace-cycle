import React, { useState } from "react";

const AddNewItem = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    originalPrice: "",
    discountPrice: "",
    expiryDate: "",
    condition: "human", // default to 'human'
    image: null,
    description: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Item:", formData);
    // Reset form
    setFormData({
      foodName: "",
      quantity: "",
      originalPrice: "",
      discountPrice: "",
      expiryDate: "",
      condition: "human",
      image: null,
      description: "",
    });
  };

  return (
    <div className="bg-offWhite min-h-screen p-4">
      <h2 className="w-full font-nunitoBold text-2xl text-center p-4 text-[#225A4B]">
        Add New Item
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full p-6 flex flex-col sm:flex-col lg:flex-row min-h-screen gap-9"
      >
        <div className="p-2 w-full sm:full lg:w-1/2">
          <div className="flex flex-col">
            <label htmlFor="foodName" className="font-nunitoBold text-lg">
              Food Name:
            </label>
            <input
              type="text"
              id="foodName"
              className="rounded-lg border-2 bg-offWhite border-[#A6A6A6] focus:border-[#225A4A] focus:outline-none px-2 py-1 w-full"
              value={formData.foodName}
              onChange={(e) =>
                setFormData({ ...formData, foodName: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="quantity" className="font-nunitoBold text-lg">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              className="rounded-lg border-2 bg-offWhite border-[#A6A6A6] focus:border-[#225A4A] focus:outline-none px-2 py-1 w-full"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              required
            />
          </div>
          <div className="flex mt-4 gap-4">
            <div className=" flex flex-col w-1/2">
              <label
                htmlFor="originalPrice"
                className="font-nunitoBold text-lg"
              >
                Original Price:{" "}
              </label>
              <input
                type="number"
                id="originalPrice"
                className="rounded-lg border-2 bg-offWhite border-[#A6A6A6] focus:border-[#225A4A] focus:outline-none px-2 py-1 w-full"
                value={formData.originalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="discountPrice"
                className="font-nunitoBold text-lg"
              >
                Discount Price:{" "}
              </label>
              <input
                type="number"
                id="discountPrice"
                className="rounded-lg border-2 bg-offWhite border-[#A6A6A6] focus:border-[#225A4A] focus:outline-none px-2 py-1 w-full"
                value={formData.discountPrice}
                onChange={(e) =>
                  setFormData({ ...formData, discountPrice: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="expiryDate" className="font-nunitoBold text-lg">
              Expiry Date:
            </label>
            <input
              type="date"
              id="expiryDate"
              className="rounded-lg border-2 bg-offWhite border-[#A6A6A6] focus:border-[#225A4A] focus:outline-none px-2 py-1 w-full"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
              required
            />
          </div>
          <div className="mt-4">
            <label className="font-nunitoBold text-lg">Condition:</label>
            <div className="flex flex-col border-2 border-[#A6A6A6] rounded-lg bg-offWhite p-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value="human"
                  className="mr-2 checked:[accent-color:#225A4A] cursor-pointer w-4 h-4"
                  checked={formData.condition === "human"}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                />
                Suitable for Human
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value="composting"
                  className="mr-2 checked:[accent-color:#225A4A] cursor-pointer w-4 h-4"
                  checked={formData.condition === "composting"}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                />
                Suitable for Composting
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#225A4A] mt-8 font-nunitoBold text-lg w-full rounded-md text-white px-4 py-2"
          >
            Add
          </button>
        </div>
        <div className="p-2 w-full sm:full lg:w-1/2">
          <div className="w-full">
            <label className="font-nunitoBold text-lg">Upload Image:</label>
            <div className="w-full h-44 border-2 border-[#A6A6A6] rounded-lg border-dashed bg-offWhite flex flex-col items-center justify-center">
                <img src="../../../public/icons/upload.svg" alt="upload file" className="w-16"/>
                <p className="font-nunitoBold text-[#A6A6A6] px-2">image must be less than <span className="text-black">2MB</span> in size</p>
              <label
                htmlFor="image"
                className="bg-[#225A4A] mt-1 font-nunitoBold text-lg rounded-md text-white px-4  py-1 cursor-pointer"
              >Upload</label>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="description" className="font-nunitoBold text-lg">
              Add Description:
            </label>
            <textarea
              id="description"
              className="w-full h-40 border-2 border-[#A6A6A6] rounded-lg bg-offWhite flex flex-col items-center justify-center"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>
          <button
            type="button"
            className="text-[#BC0101] border-[#BC0101] border-2 mt-8 font-nunitoBold text-lg w-full rounded-md px-4 py-2"
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
              })
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewItem;
