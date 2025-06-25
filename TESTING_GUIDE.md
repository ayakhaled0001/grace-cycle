# Testing Guide for Search, Filter, and Sort Functionality

## Overview

This guide covers testing the search, filter, and sort functionality implemented in the CharityPage. The system now includes:

- Food search with backend integration
- Vendor search with backend integration
- Category filtering using dynamic categories from API
- Price filtering (for food only)
- Sorting by rating, discount rate (descending), most popular, and price (ascending) for food
- Sorting by rating, most popular, and distance for vendors
- Pagination support (9 items per page)
- Automatic filter application (no Apply/Cancel buttons needed)

## Prerequisites

1. Ensure the backend API is running at `https://gracecycleapi.azurewebsites.net`
2. Make sure all dependencies are installed (`npm install`)
3. Start the development server (`npm run dev`)

## API Endpoints Used

- **Food Categories**: `GET /api/categories` - Fetches available food categories
- **Vendor Categories**: `GET /api/Vendors/vendortypes` - Fetches available vendor categories
- **Food Search**: `GET /api/web/discover/foods` - Searches and filters foods
- **Vendor Search**: `GET /api/web/discover/vendors` - Searches and filters vendors

## Test Cases

### 1. Categories Loading

**Objective**: Verify that both food and vendor categories are loaded from the backend.

**Steps**:

1. Navigate to the CharityPage
2. Click the "Filter" button
3. Check the category dropdown in the filter modal

**Expected Results**:

- Categories should load automatically when the page loads
- Category dropdown should show appropriate categories based on search type
- Loading state should be shown while categories are being fetched

**Console Logs to Check**:

- "Fetching categories from: https://gracecycleapi.azurewebsites.net/api/categories"
- "Fetching vendor categories from: https://gracecycleapi.azurewebsites.net/api/Vendors/vendortypes"

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

### 3. Vendor Search Type Selection

**Objective**: Verify that selecting "Vendor" search type triggers immediate backend call.

**Steps**:

1. Navigate to the CharityPage
2. In the search bar, change the search type from "All" to "Vendor"

**Expected Results**:

- Backend call should be made immediately when "Vendor" is selected
- Vendor results should be displayed (9 items per page)
- Search bar should show "Vendor" as selected type
- Sort options should change to vendor-specific options

**Console Logs to Check**:

- "Fetching vendors from: https://gracecycleapi.azurewebsites.net/api/web/discover/vendors?..."
- "Vendors response: [...]"

### 4. Search Functionality

**Objective**: Test the search input with different search terms for both food and vendors.

**Steps**:

1. Select "Food" or "Vendor" search type
2. Enter a search term (e.g., "pizza", "restaurant", "cafe")
3. Click the search button or press Enter

**Expected Results**:

- Search term should be sent to the backend
- Results should be filtered based on the search term
- URL should include the search parameter

**Test Cases**:

- Search for existing food items
- Search for existing vendors
- Search for non-existent items (should return empty results)
- Search with special characters
- Search with numbers

### 5. Category Filtering (Automatic)

**Objective**: Test filtering by specific categories with automatic application.

**Steps**:

1. Click the "Filter" button
2. Select a specific category from the dropdown

**Expected Results**:

- Selected category ID should be sent to the backend immediately
- Results should be filtered to show only items from that category
- No need to click "Apply Filters" - it works automatically
- Category name should appear in the results header

**Test Cases**:

- Filter food by food categories (Main Dishes, Healthy, Drinks, etc.)
- Filter vendors by vendor categories
- Select "All Categories" (should show all items)

### 6. Price Filtering (Food Only)

**Objective**: Test filtering by maximum price (food only).

**Steps**:

1. Select "Food" search type
2. Click the "Filter" button
3. Select a maximum price from the dropdown

**Expected Results**:

- Price filter should only appear for food search
- Selected max price should be sent to the backend immediately
- Results should show only items within the price range

**Test Cases**:

- Filter by "Less than 20"
- Filter by "Less than 50"
- Filter by "Less than 100"
- Filter by "Less than 150"
- Filter by "Less than 200"
- Select "Any" (should show all items regardless of price)

### 7. Sorting Functionality

**Objective**: Test all sorting options with correct order.

**Steps**:

1. Select "Food" or "Vendor" search type to get results
2. Change the sort option in the dropdown

**Expected Results**:

- Backend call should be made immediately when sort changes
- Results should be sorted according to the selected criteria
- Sort options should be different for food vs vendors

**Test Cases for Food**:

- **Rating**: Sort by rating (highest first)
- **Discount Rate**: Sort by discount rate (highest discount first - descending)
- **Most Popular**: Sort by popularity
- **Price**: Sort by price (lowest first - ascending)

**Test Cases for Vendors**:

- **Rating**: Sort by rating (highest first)
- **Most Popular**: Sort by popularity
- **Distance**: Sort by distance (closest first)

### 8. Combined Filters

**Objective**: Test multiple filters working together.

**Steps**:

1. Select "Food" or "Vendor" search type
2. Enter a search term
3. Apply category filter (automatic)
4. Apply price filter (food only)
5. Change sort order

**Expected Results**:

- All filters should work together
- Backend should receive all filter parameters
- Results should match all applied criteria

### 9. Pagination (9 items per page)

**Objective**: Test pagination functionality with 9 items per page.

**Steps**:

1. Perform a search that returns more than 9 items
2. Navigate through pages using pagination controls

**Expected Results**:

- Page size should be 9 items per page
- Navigation between pages should work
- Current page should be maintained when applying additional filters

### 10. Filter Modal UI

**Objective**: Verify the filter modal interface.

**Steps**:

1. Click the "Filter" button
2. Check the modal interface for different search types

**Expected Results**:

- Modal should open with appropriate filters based on search type
- Food search: Category and Price filters
- Vendor search: Category filter only
- No "Apply Filters" or "Cancel" buttons should be present
- Filters should apply immediately when changed
- Close button (×) should be present to close the modal
- Clicking outside modal should close it

### 11. Search Type Switching

**Objective**: Test switching between different search types.

**Steps**:

1. Start with "Food" search type
2. Switch to "Vendor" search type
3. Switch back to "Food"
4. Switch to "All"

**Expected Results**:

- Sort options should change appropriately
- Filter options should change appropriately
- Results should clear when switching to "All"
- State should be maintained when switching between "Food" and "Vendor"

### 12. Error Handling

**Objective**: Test error scenarios.

**Steps**:

1. Disconnect from the internet
2. Try to perform searches and apply filters

**Expected Results**:

- Error messages should be displayed
- Application should not crash
- Loading states should be handled properly

### 13. UI/UX Testing

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
