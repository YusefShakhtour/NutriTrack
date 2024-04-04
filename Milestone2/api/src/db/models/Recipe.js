module.exports = class Recipe {
  rec_id = null;
  user_id = null;
  name = null;
  fat = null;
  protein = null;
  carbs = null;
  calories = null;

  constructor(data) {
    this.rec_id = data.rec_id;
    this.user_id = data.user_id;
    this.name = data.name;
    this.fat = data.fat;
    this.protein = data.protein;
    this.carbs = data.carbs;
    this.calories = data.calories;
  }
}