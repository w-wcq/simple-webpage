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
    
    // 在聊天输入框中按回车键发送消息
    if (e.key === 'Enter' && document.activeElement.id === 'userInput') {
        sendMessage();
    }
});

// 发送消息函数
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        // 添加用户消息
        addMessage(message, 'user');
        input.value = '';
        
        // 模拟AI思考并回复
        setTimeout(() => {
            generateAIResponse(message);
        }, 1000);
    }
}

// 添加消息到聊天窗口
function addMessage(content, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const iconDiv = document.createElement('div');
    iconDiv.className = 'message-icon';
    
    const icon = document.createElement('i');
    icon.className = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
    iconDiv.appendChild(icon);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const nameSpan = document.createElement('h4');
    nameSpan.textContent = sender === 'user' ? '您' : 'AI 助手';
    contentDiv.appendChild(nameSpan);
    
    const textP = document.createElement('p');
    textP.textContent = content;
    contentDiv.appendChild(textP);
    
    messageDiv.appendChild(iconDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 生成AI回复
function generateAIResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    let responses = [
        "这是一个很好的问题！让我思考一下...",
        "根据我的理解，这个问题可以从几个角度来看...",
        "我了解您的疑问，让我为您提供一些见解。",
        "这是个复杂的话题，让我为您分解一下。",
        "感谢您的提问！这是我的看法..."
    ];
    
    // 根据用户消息内容生成特定回复
    let aiResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // 更具体的回复逻辑
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('你好')) {
        aiResponse = "您好！很高兴见到您。您想了解哪方面内容呢？";
    } else if (lowerCaseMessage.includes('学习') || lowerCaseMessage.includes('课程')) {
        aiResponse = "我们有许多优质课程供您学习！目前有网页开发基础、AI原理入门和数据科学三个主要课程。";
    } else if (lowerCaseMessage.includes('AI') || lowerCaseMessage.includes('人工智能')) {
        aiResponse = "人工智能是一个令人着迷的领域！它涉及机器学习、深度学习、自然语言处理等多个方面。";
    } else if (lowerCaseMessage.includes('编程') || lowerCaseMessage.includes('代码')) {
        aiResponse = "编程是与计算机沟通的语言。从基础的HTML、CSS、JavaScript开始，逐步深入是很好的学习路径。";
    } else if (lowerCaseMessage.includes('谢谢')) {
        aiResponse = "不客气！随时欢迎您提问更多问题。";
    } else if (lowerCaseMessage.includes('再见') || lowerCaseMessage.includes('拜拜')) {
        aiResponse = "再见！希望您今天学到了一些新东西。期待下次与您交流！";
    } else if (lowerCaseMessage.includes('帮助')) {
        aiResponse = "我很乐意帮助您！您可以询问关于AI、编程、学习方法等方面的问题。";
    }
    
    addMessage(aiResponse, 'bot');
}

// 初始化聊天功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否有聊天相关的元素
    if (document.getElementById('chatMessages')) {
        // 添加欢迎消息（如果还没有的话）
        const welcomeMessageExists = Array.from(document.getElementById('chatMessages').children).some(
            child => child.classList.contains('bot-message') && 
                     child.textContent.includes('AI 助手') &&
                     child.textContent.includes('学习')
        );
        
        if (!welcomeMessageExists) {
            // 添加欢迎消息
            const welcomeMsg = "欢迎使用AI对话模拟器！您可以问我任何问题，我会尽力回答。";
            addMessage(welcomeMsg, 'bot');
        }
    }
});