var _; //globals
var ing;

describe('About Applying What We Have Learnt', function() {
    var products;

    beforeEach(function() {
        products = [
            {
                name: 'Sonoma',
                ingredients: ['artichoke', 'sundried tomatoes', 'mushrooms'],
                containsNuts: false
            },
            {
                name: 'Pizza Primavera',
                ingredients: [
                    'roma',
                    'sundried tomatoes',
                    'goats cheese',
                    'rosemary'
                ],
                containsNuts: false
            },
            {
                name: 'South Of The Border',
                ingredients: ['black beans', 'jalapenos', 'mushrooms'],
                containsNuts: false
            },
            {
                name: 'Blue Moon',
                ingredients: ['blue cheese', 'garlic', 'walnuts'],
                containsNuts: true
            },
            {
                name: 'Taste Of Athens',
                ingredients: ['spinach', 'kalamata olives', 'sesame seeds'],
                containsNuts: true
            }
        ];
    });

    /*********************************************************************************/

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function() {
        var i,
            j,
            hasMushrooms,
            productsICanEat = [];

        for (i = 0; i < products.length; i += 1) {
            if (products[i].containsNuts === false) {
                hasMushrooms = false;
                for (j = 0; j < products[i].ingredients.length; j += 1) {
                    if (products[i].ingredients[j] === 'mushrooms') {
                        hasMushrooms = true;
                    }
                }
                if (!hasMushrooms) productsICanEat.push(products[i]);
            }
        }

        expect(productsICanEat.length).toBe(1);
    });

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function() {
        var productsICanEat = [];

        /* solve using filter() & all() / any() */
        productsICanEat = _(products)
            .chain()
            .filter(function(p) {
                return (
                    p.containsNuts === false &&
                    !_(p.ingredients).any(function(i) {
                        return i === 'mushrooms';
                    })
                );
            })
            .value();

        expect(productsICanEat.length).toBe(1);
    });

    /*********************************************************************************/

    it('should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)', function() {
        var sum = 0;
        for (var i = 1; i < 1000; i += 1) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }

        expect(sum).toBe(233168);
    });

    it('should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)', function() {
        var sum = _.range(1, 1000).reduce(function(total, n) {
            return (total += n % 3 === 0 || n % 5 === 0 ? n : 0);
        }, 0); /* try chaining range() and reduce() */

        expect(233168).toBe(sum);
    });

    /*********************************************************************************/
    it('should count the ingredient occurrence (imperative)', function() {
        var ingredientCount = { '{ingredient name}': 0 };

        for (i = 0; i < products.length; i += 1) {
            for (j = 0; j < products[i].ingredients.length; j += 1) {
                ingredientCount[products[i].ingredients[j]] =
                    (ingredientCount[products[i].ingredients[j]] || 0) + 1;
            }
        }

        expect(ingredientCount['mushrooms']).toBe(2);
    });

    it('should count the ingredient occurrence (functional)', function() {
        var ingredientCount = { '{ingredient name}': 0 };

        /* chain() together map(), flatten() and reduce() */
        ingredientCount = _(products)
            .chain()
            .map(function(p) {
                return p.ingredients;
            })
            .flatten()
            .reduce(function(total, elem) {
                total[elem] = (total[elem] || 0) + 1;
                return total;
            }, {})
            .value();
        // ing = ingredientCount;
        expect(ingredientCount['mushrooms']).toBe(2);
    });

    /*********************************************************************************/
    /* UNCOMMENT FOR EXTRA CREDIT */
    /*
  it("should find the largest prime factor of a composite number", function () {

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
