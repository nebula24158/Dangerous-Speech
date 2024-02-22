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
        itemActive += 1;        
        showSlider();
    };

    next2.onclick = function(){
        itemActive += 1;
        showSlider();
    };

    nextq.onclick = function(){
        itemActive += 1;
        showSlider();
    };    

    //event prev click
    prev.onclick = function(){
        itemActive -= 1;
        if(itemActive < 0){
            itemActive = countItem - 1;
        }
        showSlider();
    };

    function increaseScore() {
        // Make an AJAX request to increase the score
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/increase_score', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Request was successful
                    // You can update the UI if needed
                    console.log('Score increased successfully');
                } else {
                    // Handle errors
                    console.error('Error:', xhr.status);
                }
            }
        };
        xhr.send();
    }
    
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
            // Make an AJAX request to get the score from the server
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/increase_score', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        // Request was successful
                        // Parse the response and update the score element
                        var data = JSON.parse(xhr.responseText);
                        scoreElement.textContent = data.score;
                    } else {
                        // Handle errors
                        console.error('Error:', xhr.status);
                    }
                }
            };
            xhr.send();
        }
    }
    document.addEventListener("DOMContentLoaded", function() {
        let nextButton = document.getElementById('next1');
        let scoreElement = document.getElementById('score'); // Get the score element
    
        // Event listener for the button click
        nextButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission behavior
            increaseScore(); // Call the function to increase the score
        });
    

    });
    // Start the slider initially
    showSlider();
});