# Testing Guide for Search, Filter, and Sort Functionality

## Overview

This guide covers testing the search, filter, and sort functionality implemented in the CharityPage. The system now includes:

- Food search with backend integration
- Category filtering using dynamic categories from API
- Price filtering
- Sorting by rating, discount rate (descending), most popular, and price (ascending)
- Pagination support (9 items per page)
- Automatic filter application (no Apply/Cancel buttons needed)

## Prerequisites

1. Ensure the backend API is running at `https://gracecycleapi.azurewebsites.net`
2. Make sure all dependencies are installed (`npm install`)
3. Start the development server (`npm run dev`)

## API Endpoints Used

- **Categories**: `GET /api/categories` - Fetches available food categories
- **Food Search**: `GET /api/web/discover/foods` - Searches and filters foods

## Test Cases

### 1. Categories Loading

**Objective**: Verify that categories are loaded from the backend and displayed in the filter modal.

**Steps**:

1. Navigate to the CharityPage
2. Click the "Filter" button
3. Check the category dropdown in the filter modal

**Expected Results**:

- Categories should load automatically when the page loads
- Category dropdown should show categories from the API (Main Dishes, Healthy, Drinks, Baked goods, Dessert)
- Loading state should be shown while categories are being fetched
- Categories should be selectable by their IDs

**Console Logs to Check**:

- "Fetching categories from: https://gracecycleapi.azurewebsites.net/api/categories"
- "Categories response: [...]"

### 2. Food Search Type Selection

**Objective**: Verify that selecting "Food" search type triggers immediate backend call.

**Steps**:

1. Navigate to the CharityPage
2. In the search bar, change the search type from "All" to "Food"

**Expected Results**:

- Backend call should be made immediately when "Food" is selected
- Food results should be displayed (9 items per page)
- Search bar should show "Food" as selected type

**Console Logs to Check**:

- "Fetching foods from: https://gracecycleapi.azurewebsites.net/api/web/discover/foods?..."
- "Foods response: [...]"

### 3. Search Functionality

**Objective**: Test the search input with different search terms.

**Steps**:

1. Select "Food" search type
2. Enter a search term (e.g., "pizza", "salad", "drink")
3. Click the search button or press Enter

**Expected Results**:

- Search term should be sent to the backend
- Results should be filtered based on the search term
- URL should include the search parameter

**Test Cases**:

- Search for existing food items
- Search for non-existent items (should return empty results)
- Search with special characters
- Search with numbers

### 4. Category Filtering (Automatic)

**Objective**: Test filtering by specific categories with automatic application.

**Steps**:

1. Click the "Filter" button
2. Select a specific category from the dropdown

**Expected Results**:

- Selected category ID should be sent to the backend immediately
- Results should be filtered to show only items from that category
- No need to click "Apply Filters" - it works automatically

**Test Cases**:

- Filter by "Main Dishes" (ID: 1)
- Filter by "Healthy" (ID: 2)
- Filter by "Drinks" (ID: 3)
- Filter by "Baked goods" (ID: 4)
- Filter by "Dessert" (ID: 5)
- Select "All Categories" (should show all items)

### 5. Price Filtering (Automatic)

**Objective**: Test filtering by maximum price with automatic application.

**Steps**:

1. Click the "Filter" button
2. Select a maximum price from the dropdown

**Expected Results**:

- Selected max price should be sent to the backend immediately
- Results should show only items within the price range
- No need to click "Apply Filters" - it works automatically

**Test Cases**:

- Filter by "Less than 20"
- Filter by "Less than 50"
- Filter by "Less than 100"
- Filter by "Less than 150"
- Filter by "Less than 200"
- Select "Any" (should show all items regardless of price)

### 6. Sorting Functionality

**Objective**: Test all sorting options with correct order.

**Steps**:

1. Select "Food" search type to get results
2. Change the sort option in the dropdown

**Expected Results**:

- Backend call should be made immediately when sort changes
- Results should be sorted according to the selected criteria

**Test Cases**:

- **Rating**: Sort by rating (highest first)
- **Discount Rate**: Sort by discount rate (highest discount first - descending)
- **Most Popular**: Sort by popularity
- **Price**: Sort by price (lowest first - ascending)

### 7. Combined Filters

**Objective**: Test multiple filters working together.

**Steps**:

1. Select "Food" search type
2. Enter a search term
3. Apply category filter (automatic)
4. Apply price filter (automatic)
5. Change sort order

**Expected Results**:

- All filters should work together
- Backend should receive all filter parameters
- Results should match all applied criteria

### 8. Pagination (9 items per page)

**Objective**: Test pagination functionality with 9 items per page.

**Steps**:

1. Perform a search that returns more than 9 items
2. Navigate through pages using pagination controls

**Expected Results**:

- Page size should be 9 items per page
- Navigation between pages should work
- Current page should be maintained when applying additional filters

### 9. Filter Modal UI

**Objective**: Verify the filter modal interface.

**Steps**:

1. Click the "Filter" button
2. Check the modal interface

**Expected Results**:

- Modal should open with category and price filters
- No "Apply Filters" or "Cancel" buttons should be present
- Filters should apply immediately when changed
- Close button (×) should be present to close the modal

### 10. Error Handling

**Objective**: Test error scenarios.

**Steps**:

1. Disconnect from the internet
2. Try to perform searches and apply filters

**Expected Results**:

- Error messages should be displayed
- Application should not crash
- Loading states should be handled properly

### 11. UI/UX Testing

**Objective**: Verify the user interface and experience.

**Steps**:

1. Test all interactive elements
2. Verify responsive design
3. Check accessibility

**Expected Results**:

- Search button should be inside the input field
- Filter modal should be properly positioned
- Loading states should be visible
- Error states should be user-friendly
- All buttons should have hover effects

## Console Monitoring

Monitor the browser console for:

- API request URLs
- Response data
- Error messages
- Loading states

## Common Issues and Solutions

### Issue: Categories not loading

**Solution**: Check if the `/api/categories` endpoint is accessible and returning the expected format.

### Issue: Search not working

**Solution**: Verify the `/api/web/discover/foods` endpoint is working and accepts the correct parameters.

### Issue: Filters not applying

**Solution**: Check that all filter parameters are being sent correctly in the API request.

### Issue: Pagination not working

**Solution**: Ensure the backend is returning the correct pagination metadata (totalCount, pageIndex, pageSize).

### Issue: Discount rate sorting not working correctly

**Solution**: Verify that the backend handles the `discountRate` sort parameter correctly and returns items in descending order.

## Performance Testing

- Test with large datasets
- Verify loading times are acceptable
- Check memory usage during extended use

## Browser Compatibility

Test on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Testing

- Test on mobile devices
- Verify touch interactions work properly
- Check responsive design on different screen sizes

## Key Features Summary

- **Page Size**: 9 items per page
- **Automatic Filtering**: No need for Apply/Cancel buttons
- **Sorting**: Rating, Discount Rate (descending), Most Popular, Price (ascending)
- **Pagination**: Automatic with Previous/Next buttons
- **Real-time Updates**: Filters apply immediately when changed
