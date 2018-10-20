'use strict';

module.exports = function(Createorder) {
  Createorder.observe('before save', function filterProperties(context, next) {
    console.log('EL CONTEXT', context.instance);
    calculateFinalPrice(context.instance);
    next();
  });
};


function calculateFinalPrice(order) {

  console.log('la ORDER', order);

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
