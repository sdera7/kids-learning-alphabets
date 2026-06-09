// Alphabet data with words and sounds
const alphabetData = [
    { letter: 'A', word: 'Apple', sound: '/æ/', emoji: '🍎', options: ['🍎', '🍌', '🍊', '🍇'] },
    { letter: 'B', word: 'Ball', sound: '/b/', emoji: '⚽', options: ['🎈', '⚽', '🚴', '🍌'] },
    { letter: 'C', word: 'Cat', sound: '/k/', emoji: '🐱', options: ['🐶', '🐱', '🐭', '🐹'] },
    { letter: 'D', word: 'Dog', sound: '/d/', emoji: '🐶', options: ['🐱', '🐶', '🐰', '🦊'] },
    { letter: 'E', word: 'Elephant', sound: '/ɛ/', emoji: '🐘', options: ['🐘', '🦒', '🦓', '🦏'] },
    { letter: 'F', word: 'Fish', sound: '/f/', emoji: '🐟', options: ['🐟', '🦐', '🦑', '🐙'] },
    { letter: 'G', word: 'Grapes', sound: '/g/', emoji: '🍇', options: ['🍉', '🍓', '🍇', '🍌'] },
    { letter: 'H', word: 'House', sound: '/h/', emoji: '🏠', options: ['🏰', '🏠', '🏢', '🏭'] },
    { letter: 'I', word: 'Ice Cream', sound: '/aɪ/', emoji: '🍦', options: ['🍦', '🍰', '🎂', '🍪'] },
    { letter: 'J', word: 'Jellyfish', sound: '/dʒ/', emoji: '🪼', options: ['🦀', '🦞', '🪼', '🐙'] },
    { letter: 'K', word: 'Kite', sound: '/k/', emoji: '🪁', options: ['🪁', '⛳', '🏸', '🎳'] },
    { letter: 'L', word: 'Lion', sound: '/l/', emoji: '🦁', options: ['🦁', '🐯', '🐻', '🐼'] },
    { letter: 'M', word: 'Monkey', sound: '/m/', emoji: '🐵', options: ['🐵', '🦍', '🦧', '🐒'] },
    { letter: 'N', word: 'Nest', sound: '/n/', emoji: '🪶', options: ['🪶', '🌾', '🌿', '🍃'] },
    { letter: 'O', word: 'Orange', sound: '/ɔ/', emoji: '🍊', options: ['🍎', '🍊', '🍋', '🍌'] },
    { letter: 'P', word: 'Penguin', sound: '/p/', emoji: '🐧', options: ['🐧', '🦆', '🦅', '🦉'] },
    { letter: 'Q', word: 'Queen', sound: '/kw/', emoji: '👑', options: ['⌚', '💍', '👑', '🎀'] },
    { letter: 'R', word: 'Rainbow', sound: '/r/', emoji: '🌈', options: ['☀️', '⛅', '🌈', '⛈️'] },
    { letter: 'S', word: 'Sun', sound: '/s/', emoji: '☀️', options: ['☀️', '🌙', '⭐', '✨'] },
    { letter: 'T', word: 'Tiger', sound: '/t/', emoji: '🐯', options: ['🦁', '🐯', '🐻', '🐼'] },
    { letter: 'U', word: 'Umbrella', sound: '/ʌ/', emoji: '☂️', options: ['🎩', '👒', '☂️', '🧢'] },
    { letter: 'V', word: 'Violin', sound: '/v/', emoji: '🎻', options: ['🎸', '🎹', '🎺', '🎻'] },
    { letter: 'W', word: 'Whale', sound: '/w/', emoji: '🐳', options: ['🐳', '🐬', '🦈', '🐙'] },
    { letter: 'X', word: 'Xylophone', sound: '/ks/', emoji: '🎵', options: ['🎤', '🎧', '🎵', '🎶'] },
    { letter: 'Y', word: 'Yo-yo', sound: '/j/', emoji: '🪀', options: ['🎯', '🪀', '⚽', '🎱'] },
    { letter: 'Z', word: 'Zebra', sound: '/z/', emoji: '🦓', options: ['🦁', '🦓', '🦒', '🐴'] }
];

let currentLetterIndex = 0;
let score = 0;
let correctAnswers = 0;
let gameState = {
    answered: false,
    currentOptions: []
};

// Initialize the game
function initGame() {
    currentLetterIndex = 0;
    score = 0;
    correctAnswers = 0;
    gameState.answered = false;
    displayLetter();
}

// Display current letter and set up options
function displayLetter() {
    const data = alphabetData[currentLetterIndex];
    
    // Update letter display
    document.getElementById('largeLetterText').textContent = data.letter;
    document.getElementById('letterWord').textContent = data.word;
    document.getElementById('letterSound').textContent = `Sound: ${data.sound}`;
    document.getElementById('questionLetter').textContent = data.letter;
    
    // Shuffle and set up options
    gameState.currentOptions = shuffleArray([...data.options]);
    
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.textContent = gameState.currentOptions[index];
        btn.classList.remove('correct', 'incorrect');
        btn.style.opacity = '1';
        btn.disabled = false;
    });
    
    // Update progress
    document.getElementById('progress').textContent = `${currentLetterIndex + 1}/26`;
    const progressPercent = ((currentLetterIndex + 1) / 26) * 100;
    document.getElementById('progressFill').style.width = progressPercent + '%';
    
    gameState.answered = false;
}

// Shuffle array randomly
function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Check answer
function checkAnswer(optionIndex) {
    if (gameState.answered) return;
    
    gameState.answered = true;
    const data = alphabetData[currentLetterIndex];
    const selectedEmoji = gameState.currentOptions[optionIndex];
    const correctEmoji = data.emoji;
    
    const optionButtons = document.querySelectorAll('.option-btn');
    
    if (selectedEmoji === correctEmoji) {
        // Correct answer
        optionButtons[optionIndex].classList.add('correct');
        score += 10;
        correctAnswers++;
        
        // Show celebration
        showCelebration();
    } else {
        // Incorrect answer
        optionButtons[optionIndex].classList.add('incorrect');
        
        // Highlight correct answer
        gameState.currentOptions.forEach((emoji, idx) => {
            if (emoji === correctEmoji) {
                optionButtons[idx].classList.add('correct');
            }
        });
        
        score = Math.max(0, score - 2);
    }
    
    document.getElementById('score').textContent = score;
    
    // Disable all buttons
    optionButtons.forEach(btn => btn.disabled = true);
}

// Pronounce letter
function pronounceLetter() {
    const data = alphabetData[currentLetterIndex];
    speak(data.letter);
}

// Repeat word
function repeatWord() {
    const data = alphabetData[currentLetterIndex];
    speak(data.word);
}

// Text to speech function
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);
    }
}

// Move to next letter
function nextLetter() {
    if (currentLetterIndex < alphabetData.length - 1) {
        currentLetterIndex++;
        displayLetter();
    } else {
        showGameComplete();
    }
}

// Reset game
function resetGame() {
    initGame();
}

// Show celebration animation
function showCelebration() {
    const celebrationEmojis = ['🎉', '🎊', '⭐', '🌟', '✨', '🎈', '🎁', '🏆'];
    const container = document.body;
    
    for (let i = 0; i < 5; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * window.innerWidth + 'px';
        emoji.style.top = '-30px';
        emoji.style.fontSize = '30px';
        emoji.style.pointerEvents = 'none';
        emoji.style.animation = 'fall 3s ease-out forwards';
        container.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 3000);
    }
}

// Show game complete message
function showGameComplete() {
    const percentage = (correctAnswers / 26) * 100;
    const message = percentage === 100 ? '🏆 Perfect! You\'re an alphabet master!' : 
                    percentage >= 80 ? '🌟 Great job! You\'re doing awesome!' :
                    percentage >= 60 ? '👏 Good work! Keep practicing!' :
                    '💪 Nice effort! Try again!';
    
    alert(`${message}\n\nScore: ${score}\nCorrect Answers: ${correctAnswers}/26 (${percentage.toFixed(0)}%)`);
    resetGame();
}

// Add animation to document
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize game on page load
window.addEventListener('DOMContentLoaded', initGame);
