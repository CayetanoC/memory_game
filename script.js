const gifs = [
  '<img src = "https://media1.giphy.com/media/iFqLTjlvndks0/200w.webp?cid=ecf05e47wlwhn590419aqi72j0cmsqg2ci0p7rl2xssnuazs&ep=v1_gifs_search&rid=200w.webp&ct=g">',
  '<img src = "https://media0.giphy.com/media/11dR2hEgtN5KoM/200w.webp?cid=ecf05e47kcgsbywuptikpik7tqkf0ayqgtcx4gy0rwc5baud&ep=v1_gifs_search&rid=200w.webp&ct=g">',
  '<img src = "https://media0.giphy.com/media/3o7TKMt1VVNkHV2PaE/200w.webp?cid=ecf05e47qawb1okx46h7cmwv0adhwckwyt7cv64i4y23rdwu&ep=v1_gifs_search&rid=200w.webp&ct=g">',
  '<img src = "https://media0.giphy.com/media/xsE65jaPsUKUo/200.webp?cid=ecf05e47qa28larfzlhpz35pgrleqvrvi2ga67agfxtduv6a&ep=v1_gifs_search&rid=200.webp&ct=g">',
  '<img src = "https://media1.giphy.com/media/5nLtgLoclaPxS/100.webp?cid=ecf05e47st8qx3ixwi5bbtqmxx44bx8j1cgwe8byq1ryssmc&ep=v1_gifs_search&rid=100.webp&ct=g">',
  '<img src = "https://media0.giphy.com/media/V2EZKzUNSFUH6289QB/giphy.webp?cid=ecf05e47pmrxda00sahrjka112py7wphs7ljmz3qycjxnm6n&ep=v1_gifs_search&rid=giphy.webp&ct=g">',
  '<img src = "https://media3.giphy.com/media/l2R03UYSQTeRzucKc/200w.webp?cid=ecf05e47az5gj2s5sa0xd3ntvbi64hsmcjucb1p52fuk6nv8&ep=v1_gifs_search&rid=200w.webp&ct=g">',
  '<img src = "https://media3.giphy.com/media/4oeRWjN70cg8MV6HZC/200w.webp?cid=ecf05e4719zghnf7vw8unbdws8hkfqwzfbdh0lm1mj5a66w7&ep=v1_gifs_search&rid=200w.webp&ct=g">'
];


const gameBoard = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');
const lowestScoreElement = document.getElementById('lowestScore');
const resetButton = document.getElementById('resetButton');
let cards = [];
let flippedCards = [];
let score = 0;
let matchedPairs = 0

function createCard(gif) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"><img src ='https://w7.pngwing.com/pngs/132/45/png-transparent-animation-question-mark-question-fictional-character-cartoon-film-thumbnail.png'></div>
      <div class="card-back">${gif}</div>
    </div>
  `;
  card.addEventListener('click', () => flipCard(card));
  return card;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function flipCard(card) {
  if (!card.classList.contains('flipped') && flippedCards.length < 2) {
    card.classList.add('flipped');
    flippedCards.push(card);

    score += 5;
    scoreElement.textContent = score;

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const gif1 = card1.querySelector('.card-back img').src;
      const gif2 = card2.querySelector('.card-back img').src;

      if (gif1 === gif2) {
        flippedCards = [];

        matchedPairs++;
      
        if (matchedPairs === gifs.length / 2) {
          handleGameCompletion();
        }
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  }
}

function handleGameCompletion() {
  alert("Great Game! Hope you had Fun!");
      resetGame(); 
}
gifs.push(...gifs);
shuffle(gifs);

for (const gif of gifs) {
  const card = createCard(gif);
  cards.push(card);
  gameBoard.appendChild(card);
}

let lowestScore = localStorage.getItem('lowestScore') || Infinity;

function resetGame() {
  score = 0;
  scoreElement.textContent = score;
  flippedCards = [];
  matchedPairs = 0

  cards.forEach(card => {
    card.classList.remove('flipped');
  });

  shuffle(gifs);

  cards.forEach((card, index) => {
    const gif = gifs[index];
        const cardBack = card.querySelector('.card-back');

    cardBack.innerHTML = gif;
  });

  if (matchedPairs === gifs.length / 2) {
    handleGameCompletion();
  }
}

lowestScoreElement.textContent = lowestScore === Infinity ? 'N/A' : lowestScore;

resetButton.addEventListener('click', resetGame);

window.addEventListener('beforeunload', () => {
  if (score < lowestScore) {
    lowestScore = score;
    localStorage.setItem('lowestScore', lowestScore);
    lowestScoreElement.textContent = lowestScore;
    console.log("Setting lowestScore in local storage:", lowestScore);
    console.log("Lowest score saved in local storage:", localStorage.getItem('lowestScore'));
  }
});
