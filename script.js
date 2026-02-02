// Neural Garden - 有机智慧空间
// 功能丰富的交互脚本

class NeuralGarden {
    constructor() {
        this.init();
        this.bindEvents();
        this.startAnimations();
        this.loadInsights();
    }

    init() {
        // 初始化计数器
        this.connectionCount = 0;
        this.learningCount = 42;
        this.insightCount = 127;
        
        // 初始化状态
        this.currentSection = 'home';
        this.isMenuOpen = false;
        
        // 获取DOM元素
        this.navLinks = document.querySelectorAll('.nav-link');
        this.timelineMarkers = document.querySelectorAll('.timeline-marker');
        this.knowledgeCards = document.querySelectorAll('.knowledge-card');
        this.insightCards = document.querySelectorAll('.insight-card');
        this.connectionForm = document.getElementById('insightForm');
        
        console.log('🌿 Neural Garden initialized');
    }

    bindEvents() {
        // 导航链接点击事件
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.updateActiveLink(link);
            });
        });

        // 表单提交事件
        if (this.connectionForm) {
            this.connectionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleInsightSubmit();
            });
        }

        // 滚动事件监听
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 100));

        // 窗口大小改变事件
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // 移动端菜单切换
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // 按钮悬停效果
        this.addHoverEffects();
    }

    startAnimations() {
        // 启动页面加载动画
        this.animateOnScroll();
        
        // 启动神经网络动画
        this.animateNeuralNetwork();
        
        // 启动数字计数动画
        this.animateCounters();
        
        // 启动有机背景动画
        this.animateOrganicBg();
    }

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // 更新当前部分
            this.currentSection = sectionId;
            
            // 更新URL hash
            history.pushState(null, null, `#${sectionId}`);
        }
    }

    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    handleScroll() {
        // 根据滚动位置更新活动链接
        const sections = ['home', 'knowledge', 'growth', 'insights', 'connection'];
        const scrollPosition = window.scrollY + 100;

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const offsetTop = section.offsetTop;
                const offsetHeight = section.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        this.updateActiveLink(activeLink);
                        break;
                    }
                }
            }
        }

        // 触发滚动动画
        this.animateOnScroll();
    }

    animateOnScroll() {
        // 滚动触发动画元素
        const elements = document.querySelectorAll('.knowledge-card, .insight-card, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    animateNeuralNetwork() {
        // 神经网络节点动画
        const nodes = document.querySelectorAll('.node');
        const connections = document.querySelectorAll('.connection');
        
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = `pulse ${2 + index * 0.5}s infinite alternate`;
            }, index * 200);
        });

        connections.forEach((conn, index) => {
            setTimeout(() => {
                conn.style.opacity = '0.3';
                conn.style.animation = `fadeInOut 3s infinite ${index * 0.3}s`;
            }, index * 100);
        });
    }

    animateCounters() {
        // 数字计数动画
        const counterElements = [
            { element: document.getElementById('connectionCount'), target: this.connectionCount },
            { element: document.getElementById('learningCount'), target: this.learningCount },
            { element: document.getElementById('insightCount'), target: this.insightCount }
        ];

        counterElements.forEach(item => {
            if (item.element) {
                this.animateCounter(item.element, item.target);
            }
        });
    }

    animateCounter(element, target) {
        if (!element) return;
        
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            current = Math.floor(progress * target);
            if (current === Infinity) {
                element.textContent = '∞';
            } else {
                element.textContent = current;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target === Infinity ? '∞' : target;
            }
        };

        requestAnimationFrame(updateCounter);
    }

    animateOrganicBg() {
        // 有机背景元素动画
        const organisms = document.querySelectorAll('.organism');
        
        organisms.forEach((org, index) => {
            org.style.animationDelay = `-${index * 2}s`;
        });
    }

    handleInsightSubmit() {
        const nameInput = document.getElementById('name');
        const insightInput = document.getElementById('insight');
        
        if (nameInput && insightInput) {
            const name = nameInput.value.trim();
            const insight = insightInput.value.trim();
            
            if (name && insight) {
                // 显示提交反馈
                this.showNotification(`感谢 ${name} 的见解！`, 'success');
                
                // 重置表单
                nameInput.value = '';
                insightInput.value = '';
                
                // 更新计数
                this.insightCount++;
                this.animateCounter(document.getElementById('insightCount'), this.insightCount);
            } else {
                this.showNotification('请填写所有字段', 'error');
            }
        }
    }

    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // 自动移除
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    loadInsights() {
        // 模拟加载社区洞见
        setTimeout(() => {
            console.log('🌿 Loaded community insights');
        }, 1000);
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            this.isMenuOpen = !this.isMenuOpen;
        }
    }

    handleResize() {
        // 处理窗口大小改变
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    addHoverEffects() {
        // 为卡片添加悬停效果
        const hoverableElements = [
            ...this.knowledgeCards,
            ...this.insightCards,
            ...document.querySelectorAll('.cta-primary, .cta-secondary')
        ];

        hoverableElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });
    }

    // 公共方法
    exploreKnowledge() {
        this.scrollToSection('knowledge');
    }

    learnMore() {
        this.scrollToSection('insights');
    }

    showAbout() {
        this.showNotification('Neural Garden 是一个有机智慧空间，融合自然灵感与未来科技', 'info');
    }

    showPrivacy() {
        this.showNotification('我们尊重您的隐私，不会收集个人信息', 'info');
    }

    showTerms() {
        this.showNotification('使用条款：请合理使用本网站资源', 'info');
    }

    contact() {
        this.showNotification('通过 GitHub 或社区渠道联系我们', 'info');
    }
}

// 创建通知样式
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            padding: 15px 20px;
            z-index: 10000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            border-left: 4px solid #4a7c59;
        }

        .notification-success {
            border-left-color: #2ecc71;
        }

        .notification-error {
            border-left-color: #e74c3c;
        }

        .notification-info {
            border-left-color: #3498db;
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Space Grotesk', sans-serif;
        }

        .notification-content i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    addNotificationStyles();
    window.neuralGarden = new NeuralGarden();
});

// 添加自定义动画关键帧
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
}

addCustomAnimations();

// 为按钮添加额外功能
function exploreKnowledge() {
    if (window.neuralGarden) {
        window.neuralGarden.exploreKnowledge();
    }
}

function learnMore() {
    if (window.neuralGarden) {
        window.neuralGarden.learnMore();
    }
}

function showAbout() {
    if (window.neuralGarden) {
        window.neuralGarden.showAbout();
    }
}

function showPrivacy() {
    if (window.neuralGarden) {
        window.neuralGarden.showPrivacy();
    }
}

function showTerms() {
    if (window.neuralGarden) {
        window.neuralGarden.showTerms();
    }
}

function contact() {
    if (window.neuralGarden) {
        window.neuralGarden.contact();
    }
}

// 页面可见性API - 优化性能
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('🌿 Neural Garden is now hidden');
    } else {
        console.log('🌿 Neural Garden is now visible');
    }
});