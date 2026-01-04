// Configuration: Customize these news items
const newsItems = [
    { id: '1', title: 'Nouvelle découverte scientifique révolutionne le secteur', category: 'Science' },
    { id: '2', title: 'Les marchés financiers atteignent de nouveaux sommets', category: 'Finance' },
    { id: '3', title: 'Technologie : innovation majeure annoncée aujourd\'hui', category: 'Tech' },
    { id: '4', title: 'Politique : accords historiques signés cette semaine', category: 'Politique' },
    { id: '5', title: 'Sports : record mondial battu lors de la compétition', category: 'Sports' },
    { id: '6', title: 'Environnement : initiatives vertes gagnent du terrain', category: 'Environnement' },
];

const autoScrollSpeed = 1;

class NewsTicker {
    constructor() {
        this.scrollContainer = document.getElementById('scrollContainer');
        this.tickerContent = document.getElementById('tickerContent');
        this.scrollLeftBtn = document.getElementById('scrollLeft');
        this.scrollRightBtn = document.getElementById('scrollRight');

        this.isHovered = false;
        this.hoverDirection = null;
        this.animationFrameId = null;

        // 🔴 Prevent crash if main elements are missing
        if (!this.scrollContainer || !this.tickerContent) {
            console.error('NewsTicker: required elements not found');
            return;
        }

        this.init();
    }

    init() {
        this.renderNewsItems();
        this.attachEventListeners();
        this.startAutoScroll();
    }

    renderNewsItems() {
        this.tickerContent.innerHTML = newsItems
            .map(item => `
                <div class="news-item">
                    <div class="news-item__container">
                        <span class="news-item__category">${item.category}</span>
                        <p class="news-item__title">${item.title}</p>
                    </div>
                </div>
            `)
            .join('');
    }

    attachEventListeners() {
        // ✅ Buttons are OPTIONAL — no crash if missing
        if (this.scrollLeftBtn) {
            this.scrollLeftBtn.addEventListener('click', () => this.manualScroll('left'));
        }

        if (this.scrollRightBtn) {
            this.scrollRightBtn.addEventListener('click', () => this.manualScroll('right'));
        }

        this.scrollContainer.addEventListener('mouseenter', () => {
            this.isHovered = true;
        });

        this.scrollContainer.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        this.scrollContainer.addEventListener('mouseleave', () => {
            this.isHovered = false;
            this.hoverDirection = null;
        });
    }

    handleMouseMove(e) {
        const rect = this.scrollContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const thirdWidth = rect.width / 3;

        if (x < thirdWidth) {
            this.hoverDirection = 'right';
        } else if (x > rect.width - thirdWidth) {
            this.hoverDirection = 'left';
        } else {
            this.hoverDirection = null;
        }
    }

    manualScroll(direction) {
        const scrollAmount = 300;
        this.scrollContainer.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }

    startAutoScroll() {
        const scroll = () => {
            if (!this.isHovered && !this.hoverDirection) {
                this.scrollContainer.scrollLeft += autoScrollSpeed;

                if (
                    this.scrollContainer.scrollLeft >=
                    this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth
                ) {
                    this.scrollContainer.scrollLeft = 0;
                }
            } else if (this.hoverDirection) {
                this.scrollContainer.scrollLeft += this.hoverDirection === 'right' ? 2 : -2;
            }

            this.animationFrameId = requestAnimationFrame(scroll);
        };

        this.animationFrameId = requestAnimationFrame(scroll);
    }
}

// ✅ ONE initialization — no duplicates
document.addEventListener('DOMContentLoaded', () => {
    new NewsTicker();
});
