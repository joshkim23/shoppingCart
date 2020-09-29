const groceryList = [
    {
        groceryItem: "Chicken Breast",
        forTextPricePerUnit: "$5.99/lb",
        pricePerUnit: 5.99
    }, {
        groceryItem: "Ribeye Meat",
        forTextPricePerUnit: "14.99/lb",
        pricePerUnit: 14.99
    }, {
        groceryItem: "Digiorno Pizza",
        forTextPricePerUnit: "$4.99/box",
        pricePerUnit: 4.99
    }, {
        groceryItem: "Corona 12 Pack",
        forTextPricePerUnit: "$12.99/pack",
        pricePerUnit: 12.99
    }, {
        groceryItem: "Coke 48 Pack",
        forTextPricePerUnit: "$19.99/box",
        pricePerUnit: 19.99
    }
];

// add shopping cart item names 
const names = document.querySelectorAll(".item-name");

const updateItems = () => {
    for(let i=0; i<names.length; i++) {
        const name = names[i];
        name.innerHTML = groceryList[i].groceryItem + " (" + groceryList[i].forTextPricePerUnit + ")";
    }
};
updateItems();


// array of id's for each type
const quantityInputID = ["quantity1", "quantity2", "quantity3", "quantity4", "quantity5"];
const subtractID = ["minus1", "minus2", "minus3", "minus4", "minus5"];
const addID = ["plus1", "plus2", "plus3", "plus4", "plus5"];
const itemSubTotalID = ["sub1", "sub2", "sub3", "sub4", "sub5"];

//make an array of elements that are grabbed by id according to type
const quantIdEl = makeElementArray(quantityInputID);
const minusBtnEl = makeElementArray(subtractID);
const plusBtnEl = makeElementArray(addID);
const liSubtotalEl = makeElementArray(itemSubTotalID);

// function that creates the array of elements for a given type
function makeElementArray(idArray) {
    let array = [];
    for (let i=0; i<groceryList.length; i++) {
        array[i] = document.getElementById(idArray[i]);
    }
    return array;
};


// create event listeners for each button 
function makeEventListeners() {
    for (let j = 0; j<groceryList.length; j++) {
        quantIdEl[j].addEventListener('input', (e)=> {
            // makes it so if user deletes their input it goes to 0 instead of NaN
            if (quantIdEl[j].value) {
                quantIdEl[j].value = parseInt(e.target.value);
                liSubtotalEl[j].innerHTML = "$" + (groceryList[j].pricePerUnit * quantIdEl[j].value).toFixed(2);
            } else {
                quantIdEl[j].value = 0;
                liSubtotalEl[j].innerHTML = "$" + (groceryList[j].pricePerUnit * quantIdEl[j].value).toFixed(2);
            }
            updateTotals();
        });

        minusBtnEl[j].addEventListener('click', ()=> {
            // if the minus button is pushed before any quantity input the value is default to 0. 
            if (!quantIdEl[j].value) {
                quantIdEl[j].value = 0;
            }

            let quant = parseInt(quantIdEl[j].value); //need to define this first, cant do quantIdEl[j].value-- off the bat! 
            if (quant>= 1) {
                quant--;
                liSubtotalEl[j].innerHTML = "$" + (groceryList[j].pricePerUnit * quant).toFixed(2);
                quantIdEl[j].value = quant;
                updateTotals();
            } else {
                quant = 0;
            }
        });

        plusBtnEl[j].addEventListener('click', ()=> {
            if (!quantIdEl[j].value) {
                quantIdEl[j].value = 0;
            }
            let quant = parseInt(quantIdEl[j].value);
            quant++
            liSubtotalEl[j].innerHTML = "$" + (groceryList[j].pricePerUnit * quant).toFixed(2);
            quantIdEl[j].value = quant;
            updateTotals();
        });
    }
};
makeEventListeners();


// function to dynamically update subtotal/tax/total values
function updateTotals() {
    const subTotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    function subTotalCalc() {
        let total = 0;

        for (let k=0; k<groceryList.length; k++) {
            // the slice method removes the dollar signs from liSubtotalEl, the .innerHTML method grabs the string within the element. slice says grab the string starting from the 1st index, so you only grab the number.
            total += parseFloat(liSubtotalEl[k].innerHTML.slice(1));
            // console.log(liSubtotalEl[0].innerHTML.slice(1));
        }
        // console.log(total);
        return total;
    };

    subTotalEl.innerHTML = "$" + subTotalCalc().toFixed(2);
    taxEl.innerHTML = "$" + (subTotalCalc() * 0.095).toFixed(2);
    let taxValue = (subTotalCalc() * 0.095).toFixed(2);
    totalEl.innerHTML = "$" + (subTotalCalc() + parseFloat(taxValue)).toFixed(2);
};

