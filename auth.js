// auth.js

// 用户数据
let users = JSON.parse(localStorage.getItem('users')) || [];

// 当前登录用户
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// 注册
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (users.some(user => user.email === email)) {
        alert('该邮箱已注册！');
    } else {
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('注册成功！');
        window.location.href = 'login.html';
    }
});

// 登录
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        alert('邮箱或密码错误！');
    }
});

// 退出
document.getElementById('logoutButton')?.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

// 检查登录状态
if (window.location.pathname.includes('index.html') && !currentUser) {
    window.location.href = 'login.html';
}