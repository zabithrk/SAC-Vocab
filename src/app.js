const words = {
  lucid: ['lucid', '/ˈluːsɪd/ · adjective', 'Clear and easy to understand; showing the ability to think clearly.', 'Her lucid explanation made the complex idea feel simple.'],
  sonder: ['sonder', '/ˈsɒndər/ · noun', 'The realization that every passerby has a life as vivid and complex as your own.', 'Watching the train leave, he felt sonder for everyone behind its lit windows.'],
  tenacious: ['tenacious', '/təˈneɪʃəs/ · adjective', 'Tending to keep a firm hold of something; persistent and determined.', 'She was tenacious in her pursuit of a solution, even when the path felt uncertain.'],
  ephemeral: ['ephemeral', '/ɪˈfemərəl/ · adjective', 'Lasting for a very short time; fleeting.', 'The golden light before sunset was beautiful and ephemeral.'],
  equanimity: ['equanimity', '/ˌekwəˈnɪməti/ · noun', 'Mental calmness and composure, especially in a difficult situation.', 'He answered the difficult question with remarkable equanimity.']
};
const $ = (s) => document.querySelector(s);
let active = 'tenacious';
function showWord(key) {
  active = key; const [word, pronounce, definition, example] = words[key];
  $('#focusWord').textContent = word; $('#pronounce').textContent = pronounce; $('#definition').textContent = definition; $('#example').textContent = example;
  document.querySelectorAll('.lesson').forEach(b => b.classList.toggle('current', b.dataset.word === key));
  $('#wordStatus').textContent = key === 'tenacious' ? 'Next up in your path' : 'Explore this word';
}
$('#lessonPath').addEventListener('click', e => { const item = e.target.closest('.lesson'); if (item) showWord(item.dataset.word); });
$('#markLearned').addEventListener('click', () => { const item = [...document.querySelectorAll('.lesson')].find(x => x.dataset.word === active); item?.classList.add('done'); $('#wordStatus').textContent = 'Added to your learned words'; $('#markLearned').textContent = 'Saved ✓'; });
$('#soundButton').addEventListener('click', () => { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(active)); });
const quiz = $('#quiz');
function openQuiz() { quiz.showModal(); $('#feedback').textContent = ''; document.querySelectorAll('.answers button').forEach(b => b.disabled = false); }
$('#startPractice').onclick = openQuiz; $('#jumpPractice').onclick = openQuiz; $('#closeQuiz').onclick = () => quiz.close();
document.querySelector('.answers').onclick = e => { const b = e.target.closest('button'); if (!b) return; document.querySelectorAll('.answers button').forEach(x => x.disabled = true); b.classList.add(b.dataset.correct === 'true' ? 'right' : 'wrong'); $('#feedback').textContent = b.dataset.correct === 'true' ? 'Exactly — ephemeral describes something fleeting.' : 'Not quite. Try “ephemeral” — it means short-lived.'; };
