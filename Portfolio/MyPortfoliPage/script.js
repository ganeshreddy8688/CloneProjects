//  Select all cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', function (e) {
        // Avoid flipping when clicking s link
        if (e.target.tagName === 'A') return;
        //  Toggle flipped class
        card.classList.toggle('flipped');
    });
});

//  Close all flipped cards when clicking outside any card
document.addEventListener('click', function (e){
    cards.forEach(card => {
        //  If click is outside this card and it's flipped, remove 'flipped'
        if (!card.contains(e.target)) {
            card.classList.remove('flipped');
        }
    });
});

// Optional: Flip with keyboard (accessibility)
cards.forEach(card => {
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.classList.toggle('flipped');
        }
    });
});
