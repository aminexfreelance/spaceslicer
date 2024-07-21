const bestScore = document.getElementById('best')
const best = JSON.parse(localStorage.getItem('best')) || 0;
bestScore.innerHTML = `Best Score: ${best}`