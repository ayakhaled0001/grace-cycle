import React, { useState } from 'react';

const AddNewItem = () => {
    
    const [formData, setFormData] = useState({
        foodName: '',
        quantity: '',
        originalPrice: '',
        discountPrice: '',
        expiryDate: '',
        condition: 'human', // default to 'human'
        image: null,
        description: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New Item:', formData);
        // Reset form
        setFormData({
            foodName: '',
            quantity: '',
            originalPrice: '',
            discountPrice: '',
            expiryDate: '',
            condition: 'human',
            image: null,
            description: ''
        });
    };

    return (
        <div className='bg-blue-100 flex flex-col items-center justify-center min-h-screen'>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit} className="bg-red-500 w-full max-w-2xl p-6 rounded-lg shadow-md flex flex-col gap-4">
                <div>
                    <label htmlFor="foodName">Food Name:</label>
                    <input
                        type="text"
                        id="foodName"
                        value={formData.foodName}
                        onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="originalPrice">Original Price:</label>
                    <input
                        type="number"
                        id="originalPrice"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="discountPrice">Discount Price:</label>
                    <input
                        type="number"
                        id="discountPrice"
                        value={formData.discountPrice}
                        onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="expiryDate">Expiry Date:</label>
                    <input
                        type="date"
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Condition:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="condition"
                                value="human"
                                checked={formData.condition === 'human'}
                                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                            />
                            Suitable for Human
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="condition"
                                value="composting"
                                checked={formData.condition === 'composting'}
                                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                            />
                            Suitable for Composting
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2"
                        onClick={() => setFormData({
                            foodName: '',
                            quantity: '',
                            originalPrice: '',
                            discountPrice: '',
                            expiryDate: '',
                            condition: 'human',
                            image: null,
                            description: ''
                        })}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewItem;