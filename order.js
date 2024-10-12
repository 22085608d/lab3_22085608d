document.addEventListener('DOMContentLoaded', () => {
    const drinkSelection = document.getElementById('drink');
    const sizeOptions = document.getElementsByName('size');
    const priceDisplay = document.getElementById('price');
    const iceOptions = document.getElementsByName('ice');
    const SweetnessOptions = document.getElementsByName('Sweetness');
    const orderform = document.getElementById('orderform');
    const orderButton = document.querySelector('.btn-success');
    const drinkimgcontainer = document.getElementById('drink-img-container');
    const drinkimg = document.getElementById('imgid');
    const confirmMessage = document.getElementById('confirm-message');
    

    orderButton.addEventListener('click', placeOrder);

    const toggleButtons = document.querySelectorAll('.btn-group-toggle input');

    toggleButtons.forEach(input => {
        input.addEventListener('change', () => {
            const buttons = input.closest('.btn-group-toggle').querySelectorAll('.btn');

            buttons.forEach(button => {
                button.classList.remove('btn-success');
                button.classList.add('btn-outline-success');


            });

            const label = input.parentElement;
            if (input.checked) {
                label.classList.remove('btn-outline-success');
                label.classList.add('btn-success');


            }
        });
    });

    function calculatePrice() {
        let price = 0;
        const drink = drinkSelection.value;

        if (drink === "Please Select") {
            priceDisplay.textContent = 'Price: $0';
            return;

        }

        if (drink === "Bubble Milktea") {
            price = 29;
            drinkimg.src = 'assets/bubble-milktea.png';
            drinkimg.alt = 'bubble milk tea';

        } else if (drink === "Iced Latte") {
            price = 30; 
            drinkimg.src = 'assets/iced-latte.jpg';
            drinkimg.alt = 'ice latte';


        }

        drinkimgcontainer.classList.remove('d-none');

        let selectedSize;

        for (const option of sizeOptions) {
            if (option.checked) {
                selectedSize = option.id;

                break;


            }
        }

        if (selectedSize === "option2") {
            price += 5; 

        } else if (selectedSize === "option3") {
            price += 8; 

        }

        priceDisplay.textContent = `Price: $${price}`;
    }

    function validateForm() {
        const name = document.getElementById('name').value;
        const drink = drinkSelection.value;
        let sizeSelected = false;
        let iceSelected = false;
        let sweetnessSelected = false;

        if (!name) {
            alert("Please provide your name");
            return false;

        }

        if (drink === "Please Select") {
            alert("Please pick a drink.");
            return false;

        }

        sizeOptions.forEach(option => {
            if (option.checked) sizeSelected = true;

        });

        if (!sizeSelected) {
            alert("Please pick one size");
            return false;

        }

        iceOptions.forEach(option => {
            if (option.checked) iceSelected = true;

        });

        if (!iceSelected) {
            alert("Please pick the ice level");
            return false;

        }

        SweetnessOptions.forEach(option => {
            if (option.checked) sweetnessSelected = true;
        });

        if (!sweetnessSelected) {
            alert("Please pick a Sweetness level");
            return false;

        }

        return true;

    }

    function placeOrder(event) {
        event.preventDefault();
        if (validateForm()) {
            const name = document.getElementById('name').value;
            const drink = drinkSelection.value;
            const selectedSize = [...sizeOptions].find(option => option.checked)?.id || '';
            const selectedIce = [...iceOptions].find(option => option.checked)?.id || '';
            const selectedSweetness = [...SweetnessOptions].find(option => option.checked)?.id || '';

            const orderData = [
                name,
                drink,
                selectedSize,
                selectedIce,
                selectedSweetness
            ];

            localStorage.setItem('orders', JSON.stringify(orderData));
            confirmMessage.classList.remove('d-none');
            confirmMessage.style.opacity = 1;
            
            $(confirmMessage).removeClass('d-none').hide().fadeIn(1000).delay(3000).fadeOut(1000, function() {
                $(this).addClass('d-none');
                orderform.reset();
                priceDisplay.textContent = 'Price: $0';
                drinkimgcontainer.classList.add('d-none');
            });

        }
    }

    drinkSelection.addEventListener('change', calculatePrice);
    sizeOptions.forEach(option => {
        option.addEventListener('change', calculatePrice);
    });

    orderform.addEventListener('reset', () => {
        toggleButtons.forEach(input => {
            const label = input.parentElement;
            label.classList.remove('btn-success');
            label.classList.add('btn-outline-success');
        });
        priceDisplay.textContent = 'Price: $0';
        drinkimgcontainer.classList.add('d-none');
    });
});