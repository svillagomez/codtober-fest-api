'use strict';

module.exports = function(Createorder) {
  Createorder.observe('before save', function filterProperties(context, next) {
    console.log('EL CONTEXT', context.instance);
    calculateFinalPrice(context.instance);
    next();
  });
};


function calculateFinalPrice(order) {

  const sizes = [
    'Small',
    'Medium',
    'Large',
  ];

  const ingredients = [
    'Extra cheese',
    'Anchovies',
    'Pineapple',
    'Onions',
    'Caviar',
    'Kobe Beef'
  ];

  if (sizes.includes(order.size)) {

    console.log('aqui se calcula el precio', order);
  }
}
