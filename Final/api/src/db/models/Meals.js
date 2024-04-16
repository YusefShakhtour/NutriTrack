module.exports = class Meal {
  meals_id = null;
  user_id = null;


  constructor(data) {
    this.rec_id = data.rec_id;
    this.user_id = data.user_id;
    this.name = data.name;
    this.fat = data.fat;
    this.protein = data.protein;
    this.carbs = data.carbs;
    this.cals = data.cals;
  }
}