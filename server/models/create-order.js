'use strict';
const app = require('../../server/server');

module.exports = function(Createorder) {
  Createorder.observe('before save', async function filterProperties(context, next) {
    calculateFinalPrice(context.instance);

    const ingredientsCounter = await app.models.ingredientsCount.find();

    if (ingredientsCounter.length === 0) {
      console.log('add model counter');
      const IngredientsCounter = app.models.ingredientsCount;

      await IngredientsCounter.create({
        'cheese': 0,
        'anchovies': 0,
        'pineapple' : 0,
        'onions': 0,
      })
    }
    return Promise.resolve(context.instance);
  });

  Createorder.observe('after save', async function filterProperties(context, next) {
    const counts = await app.models.ingredientsCount.find();
    return Promise.resolve(context.instance);

  });

};


function calculateFinalPrice(order) {
  const pricesPerSize = [
    {'name': 'Small', 'price': 5},
    {'name': 'Medium', 'price': 8},
    {'name': 'Large', 'price': 11},
  ];

  const pricesPerIngredient = [
    {'name': 'Extra cheese', 'price': 1},
    {'name': 'Anchovies', 'price': 2},
    {'name': 'Pineapple', 'price': 1},
    {'name': 'Onions', 'price': 1},
    {'name': 'Caviar', 'price': 5},
    {'name': 'Kobe Beef', 'price': 10},
  ];

  let calculatedTotal = 0;

  pricesPerSize.forEach(pricePerSize => {
    if (pricePerSize.name === order.size) {
      calculatedTotal += pricePerSize.price;
    }
  });

  pricesPerIngredient.forEach(priceIngredient => {
    if (order.ingredients.includes(priceIngredient.name)) {
      calculatedTotal += priceIngredient.price;
    }
  });

  order.total = calculatedTotal;
}
