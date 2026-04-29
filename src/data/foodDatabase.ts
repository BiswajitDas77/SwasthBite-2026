export interface FoodItem {
  id: string;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Beverage';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  serving: string;
  isSatvik: boolean;
}

export const FOOD_DATABASE: FoodItem[] = [
  // BREAKFAST
  { id: 'b1', name: 'Poha', category: 'Breakfast', calories: 250, protein: 4, carbs: 45, fats: 6, fiber: 3, serving: '1 bowl', isSatvik: true },
  { id: 'b2', name: 'Idli', category: 'Breakfast', calories: 58, protein: 2, carbs: 12, fats: 0.1, fiber: 1, serving: '1 piece', isSatvik: true },
  { id: 'b3', name: 'Masala Dosa', category: 'Breakfast', calories: 350, protein: 6, carbs: 55, fats: 12, fiber: 4, serving: '1 medium', isSatvik: true },
  { id: 'b4', name: 'Aloo Paratha', category: 'Breakfast', calories: 290, protein: 6, carbs: 40, fats: 14, fiber: 4, serving: '1 piece', isSatvik: false },
  { id: 'b5', name: 'Upma', category: 'Breakfast', calories: 190, protein: 4, carbs: 35, fats: 4, fiber: 3, serving: '1 bowl', isSatvik: true },
  { id: 'b6', name: 'Besan Chilla', category: 'Breakfast', calories: 180, protein: 10, carbs: 25, fats: 5, fiber: 6, serving: '1 piece', isSatvik: true },

  // LUNCH/DINNER
  { id: 'l1', name: 'Dal Tadka', category: 'Lunch', calories: 150, protein: 8, carbs: 20, fats: 5, fiber: 7, serving: '1 bowl', isSatvik: true },
  { id: 'l2', name: 'Roti (Whole Wheat)', category: 'Lunch', calories: 85, protein: 3, carbs: 18, fats: 0.5, fiber: 3, serving: '1 piece', isSatvik: true },
  { id: 'l3', name: 'Paneer Butter Masala', category: 'Lunch', calories: 320, protein: 14, carbs: 10, fats: 26, fiber: 2, serving: '1 bowl', isSatvik: false },
  { id: 'l4', name: 'Jeera Rice', category: 'Lunch', calories: 200, protein: 4, carbs: 40, fats: 3, fiber: 1, serving: '1 bowl', isSatvik: true },
  { id: 'l5', name: 'Rajma Masala', category: 'Lunch', calories: 180, protein: 9, carbs: 25, fats: 4, fiber: 10, serving: '1 bowl', isSatvik: true },
  { id: 'l6', name: 'Bhindi Masala', category: 'Lunch', calories: 120, protein: 3, carbs: 15, fats: 6, fiber: 5, serving: '1 bowl', isSatvik: true },
  { id: 'l7', name: 'Chicken Curry (Indian)', category: 'Lunch', calories: 280, protein: 25, carbs: 8, fats: 16, fiber: 2, serving: '1 bowl', isSatvik: false },
  { id: 'l8', name: 'Palak Paneer', category: 'Lunch', calories: 210, protein: 12, carbs: 8, fats: 15, fiber: 4, serving: '1 bowl', isSatvik: true },

  // SNACKS
  { id: 's1', name: 'Roasted Makhana', category: 'Snack', calories: 110, protein: 3, carbs: 20, fats: 2, fiber: 4, serving: '1 cup', isSatvik: true },
  { id: 's2', name: 'Samosa', category: 'Snack', calories: 260, protein: 4, carbs: 32, fats: 14, fiber: 2, serving: '1 piece', isSatvik: false },
  { id: 's3', name: 'Dhokla', category: 'Snack', calories: 160, protein: 6, carbs: 25, fats: 4, fiber: 2, serving: '2 pieces', isSatvik: true },
  { id: 's4', name: 'Mixed Nuts', category: 'Snack', calories: 170, protein: 6, carbs: 6, fats: 15, fiber: 3, serving: '30g', isSatvik: true },
  
  // BEVERAGES
  { id: 'v1', name: 'Masala Chai', category: 'Beverage', calories: 90, protein: 3, carbs: 15, fats: 2, fiber: 0, serving: '1 cup', isSatvik: false },
  { id: 'v2', name: 'Buttermilk (Chaas)', category: 'Beverage', calories: 40, protein: 2, carbs: 4, fats: 1.5, fiber: 0, serving: '1 glass', isSatvik: true },
  { id: 'v3', name: 'Coconut Water', category: 'Beverage', calories: 45, protein: 1, carbs: 10, fats: 0, fiber: 2, serving: '1 glass', isSatvik: true },
];
