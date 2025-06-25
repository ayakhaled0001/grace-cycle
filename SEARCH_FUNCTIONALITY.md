# Search, Filter, and Sort Functionality Implementation

## ✅ المطلوب المنجز

### 1. 🔍 SearchBar Component

- ✅ إضافة state للتحكم في:

  - قيمة البحث (search term)
  - نوع البحث (All, Food, Vendor, Bag)
  - السورت (rating, price, discount, etc.)
  - الفلاتر (CategoryId, MaxPrice)

- ✅ وظائف البحث:
  - عند تغيير نوع البحث: يتم إرسال request فوري للباك
  - عند الضغط على زر البحث: يتم إرسال request مع شروط البحث
  - عند تغيير السورت: يتم إرسال request جديد مع السورت الجديد
  - عند تغيير الفلتر: يتم إرسال request جديد مع الفلتر الجديد

### 2. 🍱 FoodResults Component

- ✅ استقبال نتائج البحث من Redux
- ✅ عرض النتائج على هيئة Grid
- ✅ عرض Skeleton أثناء التحميل
- ✅ إضافة Pagination (10 عناصر لكل صفحة)
- ✅ دعم عرض نتائج مختلفة (Food, Vendor, Bag)

### 3. 🧠 Redux Slice (FoodFilterSlice)

- ✅ إضافة fetchAllFoods مع parameters:
  - search, sort, categoryId, maxPrice, pageIndex, pageSize
- ✅ إضافة fetchAllVendors و fetchAllBags
- ✅ Store يحتوي على:
  - البيانات (allFoods, allVendors, allBags)
  - total count
  - loading و error
  - حالة البحث النشط

### 4. 📄 CharityPage.jsx

- ✅ الوضع الافتراضي: عرض كل الأقسام القديمة
- ✅ عند البحث أو الفلترة: إخفاء الأقسام وعرض FoodResults
- ✅ زر Clear Search لإرجاع الصفحة للحالة الأصلية

### 5. 🎛️ FilterModal Component

- ✅ Filter by Category:
  - All, Main Dishes, Baked Goods, Drinks, Dessert
- ✅ Filter by Max Price:
  - Any, Less than 20, 50, 100, 150, 200
- ✅ Apply Filters button يرسل request فوري للباك

## 🔄 Flow العمل

### عند اختيار نوع البحث:

1. اليوزر يختار "Food" → يتم إرسال request فوري للباك
2. اليوزر يختار "Vendor" → يتم إرسال request فوري للباك
3. اليوزر يختار "Bag" → يتم إرسال request فوري للباك
4. اليوزر يختار "All" → يتم مسح النتائج والعودة للصفحة الأصلية

### عند البحث:

1. اليوزر يكتب في حقل البحث
2. يضغط على زر البحث أو Enter
3. يتم إرسال request للباك مع شروط البحث

### عند السورت:

1. اليوزر يغير السورت
2. يتم إرسال request فوري للباك مع السورت الجديد

### عند الفلترة:

1. اليوزر يفتح FilterModal
2. يختار الفلاتر المطلوبة
3. يضغط على "Apply Filters"
4. يتم إرسال request فوري للباك مع الفلاتر

## 🎯 API Endpoints المستخدمة

- **Food**: `https://gracecycleapi.azurewebsites.net/api/web/discover/foods`
- **Vendors**: `https://gracecycleapi.azurewebsites.net/api/web/discover/vendors`
- **Bags**: `https://gracecycleapi.azurewebsites.net/api/web/discover/bags`

## 📱 Pagination

- كل صفحة تعرض 10 عناصر
- عند تغيير الصفحة يتم إرسال request جديد للباك
- عرض أزرار Previous/Next مع أرقام الصفحات

## 🎨 UI/UX Features

- Loading skeletons أثناء التحميل
- Error handling مع رسائل واضحة
- Clear Search button لإرجاع الصفحة للحالة الأصلية
- Responsive design متوافق مع جميع الشاشات
- Hover effects على الأزرار والروابط

## 🔧 Debugging Features

- Console logs لمراقبة API requests والـ responses
- Error handling شامل مع رسائل واضحة
- Fallback values للبيانات المفقودة
