document.addEventListener("DOMContentLoaded", function() {
    let items = document.querySelectorAll('.quiz-slider .list .item');
    let next = document.getElementById('next1');
    let next2 = document.getElementById('next2');
    let nextq = document.getElementById('skipdescribe');
    // let prev = document.querySelector('.prev');
    let scoreElement = document.getElementById('score');
    let resultElement = document.getElementById('result'); // Get the result element
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
    // prev.onclick = function(){
    //     itemActive -= 1;
    //     if(itemActive < 0){
    //         itemActive = countItem - 1;
    //     }
    //     showSlider();
    // };

    class ScoreCounter {
        constructor() {
            this.score = 0;
        }
    
        increaseScore() {
            this.score += 1;
        }
    
        getScore() {
            return this.score;
        }
    
        getResult() {
            if (this.score === 0) {
                return "ทำดีมาก! คุณไม่เคยส่งต่อ Dangerous Speech เลย";
            } else if (this.score >= 1 && this.score <= 4) {
                return "พยายามอีกนิด! คุณยังเผลอส่งต่อ Dangerous Speech อยู่บ้าง";
            } else {
                return "คุณเคยส่งต่อ ‘ถ้อยคำรุนแรง’ ในหลายประเด็นบนโลกออนไลน์";
            }
        }
    }

    const scoreCounter = new ScoreCounter();

    function showSlider(){
        let itemActiveOld = document.querySelector('.quiz-slider .list .item.active');
        itemActiveOld.classList.remove('active');
        items[itemActive].classList.add('active');

        // Update button visibility based on itemActive
        if (itemActive % 2 === 0) {
            updateButtonVisibility(true, true, false);
        } else {
            updateButtonVisibility(false, false, true);
        }

        // Update the score if it's the last slide
        if (itemActive === countItem - 1) {
            // Update the score and result here if necessary
            scoreElement.textContent = scoreCounter.getScore();
            resultElement.textContent = scoreCounter.getResult();
        }
    }
    document.getElementById('next1').addEventListener('click', function() {
        scoreCounter.increaseScore();
        scoreElement.textContent = scoreCounter.getScore();
        resultElement.textContent = scoreCounter.getResult();
        itemActive += 1;
        showSlider();
    });

    document.getElementById('next2').addEventListener('click', function() {
        itemActive += 1;
        showSlider();
    });

    document.getElementById('skipdescribe').addEventListener('click', function() {
        itemActive += 1;
        showSlider();
    });


    // Start the slider initially
    showSlider();
});
