// Game State
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 15;
let currentCategory = 'all';
let questionsPool = [];
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let skippedAnswersCount = 0;

// Question Bank
const questionBank = {
    bts: [
        { q: "Who is the leader of BTS?", options: ["Jin", "RM", "Jungkook", "V"], answer: 1, type: "mcq" },
        { q: "BTS debuted in which year?", options: ["2011", "2013", "2015", "2017"], answer: 1, type: "mcq" },
        { q: "BTS stands for 'Bangtan Sonyeondan'", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "What is the fandom name for BTS?", options: ["ARMY", "ONCE", "BLINK", "STAY"], answer: 0, type: "mcq" },
        { q: "Which BTS member is known as the 'Golden Maknae'?", options: ["V", "Jimin", "Jungkook", "Jin"], answer: 2, type: "mcq" },
        { q: "BTS won their first Billboard Music Award in 2017", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Which song gave BTS their first #1 on Billboard Hot 100?", options: ["Dynamite", "Butter", "Boy With Luv", "DNA"], answer: 0, type: "mcq" },
        { q: "Suga's real name is Min Yoongi", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "What color is associated with BTS?", options: ["Pink", "Purple", "Blue", "Yellow"], answer: 1, type: "mcq" },
        { q: "BTS has 8 members", options: ["True", "False"], answer: 1, type: "tf" }
    ],
    blackpink: [
        { q: "How many members does BLACKPINK have?", options: ["3", "4", "5", "6"], answer: 1, type: "mcq" },
        { q: "BLACKPINK debuted in 2016", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Who is the main vocalist of BLACKPINK?", options: ["Jisoo", "Jennie", "Rosé", "Lisa"], answer: 2, type: "mcq" },
        { q: "What is BLACKPINK's fandom name?", options: ["BLINK", "ONCE", "REVELUV", "MeU"], answer: 0, type: "mcq" },
        { q: "Lisa is from Thailand", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Which song was BLACKPINK's debut single?", options: ["Boombayah", "Whistle", "Playing with Fire", "DDU-DU DDU-DU"], answer: 0, type: "mcq" },
        { q: "BLACKPINK performed at Coachella 2019", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Who is the oldest member of BLACKPINK?", options: ["Jisoo", "Jennie", "Rosé", "Lisa"], answer: 0, type: "mcq" },
        { q: "'Ice Cream' featured Selena Gomez", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "What color represents BLACKPINK?", options: ["Black", "Pink", "Both", "Purple"], answer: 2, type: "mcq" }
    ],
    straykids: [
        { q: "Who is the leader of Stray Kids?", options: ["Han", "Bang Chan", "Lee Know", "Changbin"], answer: 1, type: "mcq" },
        { q: "Stray Kids has 8 members", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "What is Stray Kids' fandom name?", options: ["STAY", "SKZ", "District 9", "Levanter"], answer: 0, type: "mcq" },
        { q: "Bang Chan is from Australia", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Which survival show formed Stray Kids?", options: ["Produce 101", "Stray Kids", "Mix & Match", "WIN"], answer: 1, type: "mcq" },
        { q: "Felix is known for his deep voice", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "What does 'God's Menu' refer to?", options: ["A restaurant", "Their music", "A cooking show", "A fan event"], answer: 1, type: "mcq" },
        { q: "Stray Kids debuted under JYP Entertainment", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "How many members originally debuted?", options: ["7", "8", "9", "10"], answer: 2, type: "mcq" },
        { q: "Hyunjin is a main dancer", options: ["True", "False"], answer: 0, type: "tf" }
    ],
    twice: [
        { q: "How many members does TWICE have?", options: ["7", "8", "9", "10"], answer: 2, type: "mcq" },
        { q: "TWICE was formed through the show 'Sixteen'", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "What is TWICE's official fandom name?", options: ["ONCE", "TWICE", "Candy", "Lovely"], answer: 0, type: "mcq" },
        { q: "Which member is Japanese?", options: ["Nayeon", "Momo", "Dahyun", "Chaeyoung"], answer: 1, type: "mcq" },
        { q: "TWICE has three Japanese members", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Who is the leader of TWICE?", options: ["Jihyo", "Nayeon", "Jeongyeon", "Sana"], answer: 0, type: "mcq" },
        { q: "'TT' was released in 2016", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "What does 'TWICE' mean?", options: ["Touch once with eyes, touch once with heart", "Two times the love", "Twice as nice", "Two integrated chances"], answer: 0, type: "mcq" },
        { q: "Tzuyu is the youngest member", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "TWICE's official color is?", options: ["Apricot", "Pink", "Purple", "Red"], answer: 0, type: "mcq" }
    ],
    exo: [
        { q: "How many members does EXO currently have?", options: ["9", "8", "12", "10"], answer: 0, type: "mcq" },
        { q: "EXO debuted with 12 members", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Who is the leader of EXO?", options: ["Baekhyun", "Suho", "Chanyeol", "Kai"], answer: 1, type: "mcq" },
        { q: "What is EXO's fandom name?", options: ["EXO-L", "EXOTIC", "EXID", "PLANET"], answer: 0, type: "mcq" },
        { q: "EXO originally had two sub-units: EXO-K and EXO-M", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Which EXO member is known for his dancing?", options: ["D.O.", "Chen", "Kai", "Xiumin"], answer: 2, type: "mcq" },
        { q: "EXO's debut song was 'Growl'", options: ["True", "False"], answer: 1, type: "tf" },
        { q: "What year did EXO debut?", options: ["2010", "2011", "2012", "2013"], answer: 2, type: "mcq" },
        { q: "D.O. is also an actor", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Which EXO song won their first music show win?", options: ["Mama", "Growl", "Wolf", "Overdose"], answer: 1, type: "mcq" }
    ],
    txt: [
        { q: "How many members does TXT have?", options: ["4", "5", "6", "7"], answer: 1, type: "mcq" },
        { q: "TXT stands for Tomorrow X Together", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Who is the leader of TXT?", options: ["Soobin", "Yeonjun", "Beomgyu", "Taehyun"], answer: 0, type: "mcq" },
        { q: "What is TXT's fandom name?", options: ["MOA", "TXT", "Tomorrow", "Together"], answer: 0, type: "mcq" },
        { q: "TXT debuted in 2019", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Which member is known as the 'fourth generation it boy'?", options: ["Huening Kai", "Yeonjun", "Beomgyu", "Taehyun"], answer: 1, type: "mcq" },
        { q: "TXT is under Big Hit Entertainment (HYBE)", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "What was TXT's debut song?", options: ["Blue Hour", "Crown", "Can't You See Me?", "0X1=LOVESONG"], answer: 1, type: "mcq" },
        { q: "Huening Kai is half Korean and half American", options: ["True", "False"], answer: 1, type: "tf" },
        { q: "Who is the youngest member of TXT?", options: ["Beomgyu", "Taehyun", "Huening Kai", "Soobin"], answer: 2, type: "mcq" }
    ],
    ateez: [
        { q: "How many members does ATEEZ have?", options: ["7", "8", "9", "6"], answer: 1, type: "mcq" },
        { q: "ATEEZ stands for 'A TEEnager Z'", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Who is the leader of ATEEZ?", options: ["Hongjoong", "Seonghwa", "Yunho", "San"], answer: 0, type: "mcq" },
        { q: "What is ATEEZ's fandom name?", options: ["ATINY", "TREASURE", "PIRATE", "WAVE"], answer: 0, type: "mcq" },
        { q: "ATEEZ debuted in 2018", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Which member is known for his powerful vocals?", options: ["Wooyoung", "Jongho", "Yeosang", "Mingi"], answer: 1, type: "mcq" },
        { q: "Hongjoong produces most of ATEEZ's music", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "What was ATEEZ's debut song?", options: ["Wonderland", "Pirate King", "Wave", "Say My Name"], answer: 1, type: "mcq" },
        { q: "ATEEZ has a pirate concept", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Which member is known for his deep voice in rap?", options: ["Hongjoong", "Mingi", "San", "Yunho"], answer: 1, type: "mcq" }
    ],
    enhypen: [
        { q: "How many members does ENHYPEN have?", options: ["6", "7", "8", "9"], answer: 1, type: "mcq" },
        { q: "ENHYPEN was formed through the show 'I-LAND'", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Who is the leader of ENHYPEN?", options: ["Heeseung", "Jay", "Jungwon", "Sunghoon"], answer: 2, type: "mcq" },
        { q: "What is ENHYPEN's fandom name?", options: ["ENGENE", "ENHY", "HYPE", "CONNECT"], answer: 0, type: "mcq" },
        { q: "ENHYPEN debuted in 2020", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "Which member was a former figure skater?", options: ["Jake", "Sunghoon", "Sunoo", "Niki"], answer: 1, type: "mcq" },
        { q: "Jake is from Australia", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "What was ENHYPEN's debut song?", options: ["Drunk-Dazed", "Given-Taken", "Fever", "Tamed-Dashed"], answer: 1, type: "mcq" },
        { q: "Niki is the youngest member", options: ["True", "False"], answer: 0, type: "tf" },
        { q: "ENHYPEN is under which company?", options: ["JYP", "SM", "HYBE", "YG"], answer: 2, type: "mcq" }
    ]
};

// Achievements System
const achievementsList = [
    { id: 'rookie', name: '🎤 Rookie Fan', description: 'Complete your first quiz', icon: '🎤', condition: () => getCompletedQuizzes() >= 1 },
    { id: 'army_level1', name: '💜 ARMY Level 1', description: 'Score 50+ points in any quiz', icon: '💜', condition: () => getHighestScore() >= 50 },
    { id: 'multi_stan', name: '🌟 Multi-Stan', description: 'Play all categories', icon: '🌟', condition: () => getPlayedCategories().length >= 9 },
    { id: 'perfectionist', name: '✨ Perfectionist', description: 'Get 100% score in any quiz', icon: '✨', condition: () => hasPerfectScore() },
    { id: 'ultimate_fan', name: '👑 Ultimate K-Pop Fan', description: 'Score 100+ points', icon: '👑', condition: () => getHighestScore() >= 100 },
    { id: 'speed_demon', name: '⚡ Speed Demon', description: 'Answer 5 questions in under 5 seconds each', icon: '⚡', condition: () => false }, // Tracked in-game
    { id: 'dedicated', name: '🏆 Dedicated Fan', description: 'Complete 10 quizzes', icon: '🏆', condition: () => getCompletedQuizzes() >= 10 },
    { id: 'knowledge_seeker', name: '📚 Knowledge Seeker', description: 'Answer 100 questions correctly', icon: '📚', condition: () => getTotalCorrectAnswers() >= 100 }
];

// Initialize Game
function init() {
    loadLeaderboard();
    loadAchievements();
    showScreen('menu');
}

// Screen Management
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenName).classList.add('active');
}

// Start Quiz
function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    correctAnswersCount = 0;
    wrongAnswersCount = 0;
    skippedAnswersCount = 0;
    
    // Build question pool
    if (category === 'all') {
        questionsPool = [];
        Object.keys(questionBank).forEach(cat => {
            questionsPool = questionsPool.concat(questionBank[cat]);
        });
    } else {
        questionsPool = [...questionBank[category]];
    }
    
    // Shuffle questions
    questionsPool = shuffleArray(questionsPool).slice(0, 10);
    
    // Update UI
    document.getElementById('categoryBadge').textContent = getCategoryDisplayName(category);
    document.getElementById('totalQuestions').textContent = questionsPool.length;
    document.getElementById('score').textContent = score;
    
    // Track category played
    trackCategoryPlayed(category);
    
    showScreen('quiz');
    loadQuestion();
}

// Load Question
function loadQuestion() {
    if (currentQuestionIndex >= questionsPool.length) {
        endQuiz();
        return;
    }
    
    const question = questionsPool[currentQuestionIndex];
    
    // Update UI
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('question').textContent = question.q;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questionsPool.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Generate answer buttons
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index);
        answersContainer.appendChild(btn);
    });
    
    // Start timer
    startTimer();
}

// Timer
function startTimer() {
    timeLeft = 15;
    updateTimerDisplay();
    
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 5) {
            document.getElementById('timer').classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            skipQuestion();
        }
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = `⏱️ ${timeLeft}s`;
}

// Check Answer
function checkAnswer(selectedIndex) {
    clearInterval(timer);
    
    const question = questionsPool[currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.answer) {
        // Correct answer
        buttons[selectedIndex].classList.add('correct');
        score += 10;
        correctAnswersCount++;
        document.getElementById('score').textContent = score;
    } else {
        // Wrong answer
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.answer].classList.add('correct');
        wrongAnswersCount++;
    }
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

// Skip Question
function skipQuestion() {
    clearInterval(timer);
    skippedAnswersCount++;
    currentQuestionIndex++;
    loadQuestion();
}

// End Quiz
function endQuiz() {
    clearInterval(timer);
    
    const totalQuestions = questionsPool.length;
    const percentage = Math.round((score / (totalQuestions * 10)) * 100);
    
    // Update results UI
    document.getElementById('finalScore').textContent = score;
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('correctAnswers').textContent = correctAnswersCount;
    document.getElementById('wrongAnswers').textContent = wrongAnswersCount;
    document.getElementById('skippedAnswers').textContent = skippedAnswersCount;
    
    // Rank message
    let rankMessage = '';
    if (percentage === 100) rankMessage = '🌟 Perfect Score! You\'re a K-Pop Encyclopedia!';
    else if (percentage >= 80) rankMessage = '👑 Excellent! You\'re an Ultimate K-Pop Fan!';
    else if (percentage >= 60) rankMessage = '💜 Great Job! You know your K-Pop!';
    else if (percentage >= 40) rankMessage = '🎤 Not bad! Keep learning about K-Pop!';
    else rankMessage = '📚 Keep studying! You\'ll get better!';
    
    document.getElementById('rankMessage').textContent = rankMessage;
    
    // Track quiz completion
    trackQuizCompletion(score, percentage);
    
    // Check achievements
    checkAchievements();
    
    showScreen('results');
}

// Save Score to Leaderboard
function saveScore() {
    const playerName = document.getElementById('playerName').value.trim();
    
    if (!playerName) {
        alert('Please enter your name!');
        return;
    }
    
    const leaderboard = getLeaderboard();
    leaderboard.push({
        name: playerName,
        score: score,
        category: currentCategory,
        date: new Date().toISOString()
    });
    
    // Sort by score (descending)
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Keep only top 50
    const topLeaderboard = leaderboard.slice(0, 50);
    
    localStorage.setItem('kpop_leaderboard', JSON.stringify(topLeaderboard));
    
    alert('Score saved to leaderboard! 🎉');
    document.getElementById('nameInputContainer').style.display = 'none';
}

// Get Leaderboard
function getLeaderboard() {
    const data = localStorage.getItem('kpop_leaderboard');
    return data ? JSON.parse(data) : [];
}

// Load Leaderboard
function loadLeaderboard() {
    const leaderboard = getLeaderboard();
    renderLeaderboard(leaderboard);
}

// Filter Leaderboard
function filterLeaderboard(category) {
    const leaderboard = getLeaderboard();
    const filtered = category === 'all' ? leaderboard : leaderboard.filter(entry => entry.category === category);
    renderLeaderboard(filtered);
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Render Leaderboard
function renderLeaderboard(leaderboard) {
    const container = document.getElementById('leaderboardList');
    
    if (leaderboard.length === 0) {
        container.innerHTML = '<div class="empty-leaderboard">No scores yet. Be the first to play! 🎮</div>';
        return;
    }
    
    container.innerHTML = leaderboard.map((entry, index) => {
        const rank = index + 1;
        let rankClass = '';
        if (rank === 1) rankClass = 'top-1';
        else if (rank === 2) rankClass = 'top-2';
        else if (rank === 3) rankClass = 'top-3';
        
        return `
            <div class="leaderboard-entry ${rankClass}">
                <div class="entry-left">
                    <span class="entry-rank">#${rank}</span>
                    <div>
                        <div class="entry-name">${entry.name}</div>
                        <div class="entry-category">${getCategoryDisplayName(entry.category)}</div>
                    </div>
                </div>
                <span class="entry-score">${entry.score}</span>
            </div>
        `;
    }).join('');
}

// Show Leaderboard
function showLeaderboard() {
    loadLeaderboard();
    showScreen('leaderboard');
}

// Achievements System
function loadAchievements() {
    const unlockedAchievements = getUnlockedAchievements();
    renderAchievements(unlockedAchievements);
}

function renderAchievements(unlockedIds) {
    const container = document.getElementById('achievementsList');
    
    container.innerHTML = achievementsList.map(achievement => {
        const isUnlocked = unlockedIds.includes(achievement.id);
        const statusClass = isUnlocked ? 'unlocked' : 'locked';
        const statusText = isUnlocked ? '✓ Unlocked' : '🔒 Locked';
        
        return `
            <div class="achievement-card ${statusClass}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
                <div class="achievement-status">${statusText}</div>
            </div>
        `;
    }).join('');
}

function checkAchievements() {
    const unlockedAchievements = getUnlockedAchievements();
    const newAchievements = [];
    
    achievementsList.forEach(achievement => {
        if (!unlockedAchievements.includes(achievement.id) && achievement.condition()) {
            unlockedAchievements.push(achievement.id);
            newAchievements.push(achievement);
        }
    });
    
    if (newAchievements.length > 0) {
        localStorage.setItem('kpop_achievements', JSON.stringify(unlockedAchievements));
        displayNewAchievements(newAchievements);
    }
}

function displayNewAchievements(achievements) {
    const container = document.getElementById('newAchievements');
    
    container.innerHTML = '<h3>🎉 New Achievements Unlocked!</h3>' + achievements.map(achievement => `
        <div class="achievement-unlock">
            <div class="icon">${achievement.icon}</div>
            <div class="details">
                <div class="name">${achievement.name}</div>
                <div class="description">${achievement.description}</div>
            </div>
        </div>
    `).join('');
}

function getUnlockedAchievements() {
    const data = localStorage.getItem('kpop_achievements');
    return data ? JSON.parse(data) : [];
}

function showAchievements() {
    loadAchievements();
    showScreen('achievements');
}

// Stats Tracking
function trackQuizCompletion(finalScore, percentage) {
    const stats = getStats();
    stats.quizzesCompleted = (stats.quizzesCompleted || 0) + 1;
    stats.totalCorrect = (stats.totalCorrect || 0) + correctAnswersCount;
    stats.highestScore = Math.max(stats.highestScore || 0, finalScore);
    
    if (percentage === 100) {
        stats.perfectScores = (stats.perfectScores || 0) + 1;
    }
    
    localStorage.setItem('kpop_stats', JSON.stringify(stats));
}

function trackCategoryPlayed(category) {
    const stats = getStats();
    stats.categoriesPlayed = stats.categoriesPlayed || [];
    
    if (!stats.categoriesPlayed.includes(category)) {
        stats.categoriesPlayed.push(category);
        localStorage.setItem('kpop_stats', JSON.stringify(stats));
    }
}

function getStats() {
    const data = localStorage.getItem('kpop_stats');
    return data ? JSON.parse(data) : {};
}

function getCompletedQuizzes() {
    return getStats().quizzesCompleted || 0;
}

function getHighestScore() {
    return getStats().highestScore || 0;
}

function getPlayedCategories() {
    return getStats().categoriesPlayed || [];
}

function hasPerfectScore() {
    return (getStats().perfectScores || 0) > 0;
}

function getTotalCorrectAnswers() {
    return getStats().totalCorrect || 0;
}

// Navigation
function returnToMenu() {
    showScreen('menu');
}

function playAgain() {
    startQuiz(currentCategory);
}

// Utility Functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function getCategoryDisplayName(category) {
    const names = {
        'all': 'All Groups',
        'bts': 'BTS',
        'blackpink': 'BLACKPINK',
        'straykids': 'Stray Kids',
        'twice': 'TWICE',
        'exo': 'EXO',
        'txt': 'TXT',
        'ateez': 'ATEEZ',
        'enhypen': 'ENHYPEN'
    };
    return names[category] || category;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
