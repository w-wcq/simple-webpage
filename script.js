// 计时器变量
let timerInterval;
let isRunning = false;
let seconds = 0;

// 模拟统计数据
const stats = {
    learningCount: 42,
    connectionCount: Infinity,
    loveCount: 999
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化统计数据
    updateStats();
    
    // 添加导航滚动效果
    setupSmoothScrolling();
    
    // 设置汉堡菜单
    setupHamburgerMenu();
    
    // 启动浮动动画
    startFloatingAnimation();
});

// 设置平滑滚动
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 设置汉堡菜单
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// 更新统计数据
function updateStats() {
    document.getElementById('learningCount').textContent = stats.learningCount;
    document.getElementById('connectionCount').textContent = stats.connectionCount === Infinity ? '∞' : stats.connectionCount;
    document.getElementById('loveCount').textContent = `${stats.loveCount}+`;
}

// 计时器功能
function toggleTimer() {
    const timerBtn = document.querySelector('.timer-btn');
    
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
        timerBtn.textContent = '暂停计时';
        timerBtn.style.background = '#e74c3c';
    } else {
        isRunning = false;
        clearInterval(timerInterval);
        timerBtn.textContent = '继续计时';
        timerBtn.style.background = '#2ecc71';
    }
}

// 更新计时器显示
function updateTimer() {
    seconds++;
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    document.getElementById('hours').textContent = hrs.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = mins.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = secs.toString().padStart(2, '0');
}

// 显示提示信息
function showAlert(message) {
    alert(message);
}

// 滚动到指定部分
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 启动浮动动画
function startFloatingAnimation() {
    // 为课程卡片添加延迟动画
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 200);
    });
    
    // 为信息卡片添加延迟动画
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 300);
    });
}

// 页面滚动时的导航栏效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// 添加一些交互反馈
document.querySelectorAll('button, a, .course-card, .info-card').forEach(element => {
    if (!element.classList.contains('nav-link')) { // 排除导航链接以避免冲突
        element.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    }
});

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter 跳转到课程部分
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        scrollToSection('courses');
    }
});