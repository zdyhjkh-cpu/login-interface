// ---------- توليد الجسيمات المتلألئة ----------
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 30;

function createParticles(){
  particlesContainer.innerHTML = '';
  for(let i=0; i<PARTICLE_COUNT; i++){
    const p = document.createElement('div');
    p.className = 'spark';
    p.style.left = Math.random()*100 + '%';
    p.style.top = (40 + Math.random()*55) + '%';
    p.style.animationDuration = (4 + Math.random()*5) + 's';
    p.style.animationDelay = (Math.random()*5) + 's';
    particlesContainer.appendChild(p);
  }
}
createParticles();

// ---------- تشغيل / إطفاء اللمبة ----------
const scene = document.querySelector('.scene');
const pullCord = document.getElementById('pullCord');
const loginCard = document.getElementById('loginCard');
let isLit = false;

pullCord.addEventListener('click', () => {
  isLit = !isLit;
  scene.classList.toggle('lit', isLit);
  loginCard.classList.toggle('visible', isLit);

  pullCord.classList.add('pulled');
  setTimeout(() => pullCord.classList.remove('pulled'), 200);
});

// ---------- إظهار / إخفاء كلمة المرور ----------
const togglePass = document.getElementById('togglePass');
const passwordInput = document.getElementById('password');
const eyeOpen = togglePass.querySelector('.eye-open');
const eyeClosed = togglePass.querySelector('.eye-closed');

togglePass.addEventListener('click', () => {
  const willShow = passwordInput.type === 'password';
  passwordInput.type = willShow ? 'text' : 'password';

  togglePass.classList.toggle('active', willShow);
  togglePass.setAttribute('aria-pressed', String(willShow));
  togglePass.setAttribute('aria-label', willShow ? 'Hide password' : 'Show password');

  eyeOpen.style.display = willShow ? 'none' : 'block';
  eyeClosed.style.display = willShow ? 'block' : 'none';
});

// ---------- إرسال الفورم ----------
const loginForm = document.getElementById('loginForm');
const signinBtn = document.getElementById('signinBtn');
const formError = document.getElementById('formError');
const emailInput = document.getElementById('email');

function showError(msg){
  formError.textContent = msg;
  formError.classList.add('show');
}
function clearError(){
  formError.textContent = '';
  formError.classList.remove('show');
}

// نمسح رسالة الخطأ أول ما المستخدم يبدأ يعدّل أي حقل
loginForm.querySelectorAll('input').forEach(inp => {
  inp.addEventListener('input', clearError);
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if(!username || !email || !password){
    showError('من فضلك املأ كل الحقول أولاً');
    return;
  }
  if(!emailPattern.test(email)){
    showError('من فضلك اكتب بريد إلكتروني صحيح');
    emailInput.focus();
    return;
  }

  clearError();
  signinBtn.disabled = true;
  signinBtn.querySelector('.btn-text').textContent = 'جاري الدخول...';

  // محاكاة عملية تسجيل الدخول (استبدلها بطلب حقيقي لسيرفرك)
  setTimeout(() => {
    signinBtn.querySelector('.btn-text').textContent = 'تم تسجيل الدخول ✓';
    setTimeout(() => {
      signinBtn.disabled = false;
      signinBtn.querySelector('.btn-text').textContent = 'Sign In';
    }, 1500);
  }, 1200);
});

// ---------- أزرار Google / GitHub (تجريبي) ----------
// دول placeholders بس - وصّلهم بخدمة الـ OAuth الحقيقية بتاعتك من السيرفر
document.getElementById('googleBtn').addEventListener('click', () => {
  showError('وصّل هذا الزرار بخدمة تسجيل الدخول عبر Google (OAuth) من السيرفر بتاعك');
});
document.getElementById('githubBtn').addEventListener('click', () => {
  showError('وصّل هذا الزرار بخدمة تسجيل الدخول عبر GitHub (OAuth) من السيرفر بتاعك');
});
