const slides=[...document.querySelectorAll('.slide')];
const counter=document.getElementById('slideCounter');
const dots=document.getElementById('progressDots');
let currentSlide=0;

slides.forEach((slide,index)=>{const dot=document.createElement('span');dot.className='dot';dot.title=`Slide ${index+1}: ${slide.dataset.label}`;dots.appendChild(dot)});
const updateDeck=index=>{currentSlide=index;counter.textContent=`${String(index+1).padStart(2,'0')} — ${String(slides.length).padStart(2,'0')}`;[...dots.children].forEach((dot,i)=>dot.classList.toggle('active',i===index));};
const goTo=index=>{const safe=Math.max(0,Math.min(index,slides.length-1));slides[safe].scrollIntoView({behavior:'smooth'});};
document.getElementById('nextSlide').addEventListener('click',()=>goTo(currentSlide+1));
document.getElementById('prevSlide').addEventListener('click',()=>goTo(currentSlide-1));
document.querySelector('[data-next]').addEventListener('click',()=>goTo(1));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)updateDeck(slides.indexOf(entry.target))}),{threshold:.6});slides.forEach(slide=>observer.observe(slide));
document.addEventListener('keydown',event=>{if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;if(event.key==='ArrowDown'||event.key==='ArrowRight'||event.key==='PageDown'){event.preventDefault();goTo(currentSlide+1)}if(event.key==='ArrowUp'||event.key==='ArrowLeft'||event.key==='PageUp'){event.preventDefault();goTo(currentSlide-1)}});

const rain=()=>{const container=document.getElementById('heartRain');for(let i=0;i<42;i+=1){const heart=document.createElement('span');heart.className='rain-heart';heart.textContent=i%3===0?'♡':'♥';heart.style.left=`${Math.random()*100}%`;heart.style.setProperty('--drift',`${Math.random()*180-90}px`);heart.style.animationDuration=`${2.5+Math.random()*2}s`;heart.style.animationDelay=`${Math.random()*.7}s`;heart.style.fontSize=`${14+Math.random()*18}px`;container.appendChild(heart);setTimeout(()=>heart.remove(),5500)}};
document.getElementById('rainButton').addEventListener('click',rain);document.getElementById('finalRainButton').addEventListener('click',rain);

document.getElementById('quizForm').addEventListener('submit',event=>{event.preventDefault();const answer=new FormData(event.currentTarget).get('answer');const result=document.getElementById('quizResult');result.textContent=answer?'Correct. The answer was always you ♡':'Pick an answer first — Kuromi is waiting!';if(answer)rain();});

// Change this value before sharing the final website. This is a front-end lock, not secure storage.
const LETTER_PASSWORD='change-me';
document.getElementById('passwordForm').addEventListener('submit',event=>{event.preventDefault();const input=document.getElementById('passwordInput');const message=document.getElementById('passwordMessage');if(input.value===LETTER_PASSWORD){document.getElementById('secretLock').hidden=true;document.getElementById('secretLetter').hidden=false;rain();}else{message.textContent='That password is not quite right. Try again ♡';input.select();}});
