document.addEventListener("DOMContentLoaded", function() {
    let items = document.querySelectorAll('.quiz-slider .list .item');
    let next = document.getElementById('next1');
    let next2 = document.getElementById('next2');
    let nextq = document.getElementById('skipdescribe');
    let prev = document.querySelector('.prev');
    let scoreElement = document.getElementById('score'); // Get the score element
    let refreshInterval; // Declare the variable for the interval

    // config param
    let countItem = items.length;
    let itemActive = 0;

    // Function to update button visibility
    function updateButtonVisibility(showNext, showNext2, showNextQ) {    
        next.style.display = showNext ? 'block' : 'none';
        next2.style.display = showNext2 ? 'block' : 'none';
        nextq.style.display = showNextQ ? 'block' : 'none';
    }

    // Call the function to initially hide next and next2 buttons
    updateButtonVisibility(true, true, false);
    
    // event next click
    next.onclick = function(){
        itemActive = itemActive + 1;
        showSlider();
    };

    next2.onclick = function(){
        itemActive = itemActive + 1;
        showSlider();
    };

    nextq.onclick = function(){
        itemActive = itemActive + 1;
        showSlider();
    };    

    //event prev click
    prev.onclick = function(){
        itemActive = itemActive - 1;
        if(itemActive < 0){
            itemActive = countItem - 1;
        }
        showSlider();
    };

    function showSlider(){
        // remove item active old
        let itemActiveOld = document.querySelector('.quiz-slider .list .item.active');
        itemActiveOld.classList.remove('active');

        // active new item
        items[itemActive].classList.add('active');

        // Update button visibility based on itemActive
        if (itemActive % 2 === 0) {
            updateButtonVisibility(true, true, false);
        } else {
            updateButtonVisibility(false, false, true);
        }

        
        // Update the score if it's the last slide
        if (itemActive === countItem - 1) {
            // Get the score from the server and update the score element
            fetch('/get_score')
                .then(response => response.json())
                .then(data => {
                    scoreElement.textContent = data.score;
                });
    }

    // Start the slider initially
    showSlider();
});
