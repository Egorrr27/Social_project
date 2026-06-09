const roomsMeta = {
    "Большой теннис": { gradient: "linear-gradient(135deg, #2c6e2f, #3b8f3e)", category: "sport" },
    "Настольный теннис": { gradient: "linear-gradient(135deg, #1e6f5c, #289d82)", category: "sport" },
    "Английский язык": { gradient: "linear-gradient(135deg, #1e5a6f, #258ea6)", category: "languages" },
    "Пляжный футбол": { gradient: "linear-gradient(135deg, #d98c2b, #f4b942)", category: "sport" },
    "Волейбол": { gradient: "linear-gradient(135deg, #e84342, #c0392b)", category: "sport" },
    "Творческая мастерская": { gradient: "linear-gradient(135deg, #9b59b6, #8e44ad)", category: "art" },
    "Юный химик": { gradient: "linear-gradient(135deg, #3498db, #2980b9)", category: "science" },
    "Дизайн": { gradient: "linear-gradient(135deg, #5d2e6b, #9b4d96)", category: "art" },
    "Киберспорт": { gradient: "linear-gradient(135deg, #0e2a3b, #1c4b6e)", category: "sport" }
};

const defaultFeeds = {
    "Большой теннис": [
        { type: 'news', text: 'Зверев выиграл турнир в Саудовской Аравии и стал 3 ракеткой мира!' },
        { type: 'news', text: 'Открыты новые корты в Москве и Спб от компании ВМЯЧ' },
        { type: 'video', text: 'Обзор новых кортов и основная техника подачи' },
        { type: 'news', text: 'Изменены правила подачи в теннисе, подающий может подавать и за боковые линии области подачи' }
    ],
    "Настольный теннис": [
        { type: 'news', text: 'Чемпионат мира по настольному теннису пройдёт в Москве' },
        { type: 'video', text: 'Топ-5 ошибок новичков в настольном теннисе' },
        { type: 'news', text: 'Новые ракетки Butterfly поступят в продажу в сентябре' }
    ],
    "Английский язык": [
        { type: 'news', text: 'Бесплатный онлайн-разговорный клуб каждую субботу' },
        { type: 'video', text: 'Как учить 100 слов в день — метод ассоциаций' },
        { type: 'news', text: 'Конкурс на лучшее эссе на английском — призы' }
    ],
    "Пляжный футбол": [
        { type: 'news', text: 'Сборная России выиграла международный турнир в Бразилии' },
        { type: 'video', text: 'Техника удара бисиклетой на песке' },
        { type: 'news', text: 'Новый сезон пляжного футбола стартует в июне' }
    ],
    "Волейбол": [
        { type: 'news', text: 'Школьная лига волейбола: регистрация команд до 1 сентября' },
        { type: 'video', text: 'Как правильно ставить блок — советы чемпиона' },
        { type: 'news', text: 'Тренировки на пляже улучшают прыжок' }
    ],
    "Творческая мастерская": [
        { type: 'news', text: 'Выставка работ участников кружка откроется в мае' },
        { type: 'video', text: 'Урок: акварельная заливка для начинающих' },
        { type: 'news', text: 'Конкурс скетчей «Мой любимый город»' }
    ],
    "Юный химик": [
        { type: 'news', text: 'Безопасные опыты с содой и уксусом — дома' },
        { type: 'video', text: 'Как вырастить кристалл из соли' },
        { type: 'news', text: 'Онлайн-лекция: химия вокруг нас' }
    ],
    "Дизайн": [
        { type: 'news', text: 'Новый тренд — неоморфизм в интерфейсах' },
        { type: 'video', text: 'Figma с нуля: авто-лейауты' },
        { type: 'news', text: 'Конкурс на лучший логотип для школьного проекта' }
    ],
    "Киберспорт": [
        { type: 'news', text: 'Турнир по CS2 среди школьников 20 июня' },
        { type: 'video', text: 'Разбор карты Mirage — основные раши' },
        { type: 'news', text: 'Как настроить прицел и мышь как у про' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initRoomButtons();
    initHeroButton();
    initHomeButtons();
});

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');
    if (!filterBtns.length) return;
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            roomCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initRoomButtons() {
    const btns = document.querySelectorAll('.join-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const roomName = btn.getAttribute('data-room-id');
            if (roomName) openRoomPage(roomName);
        });
    });
}

function initHeroButton() {
    const heroBtn = document.querySelector('.hero .btn-primary');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            document.querySelector('.filters-section')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function initHomeButtons() {
    const homeLogo = document.getElementById('homeLogo');
    const homeNav = document.getElementById('homeNavLink');
    if (homeLogo) homeLogo.addEventListener('click', () => location.reload());
    if (homeNav) homeNav.addEventListener('click', (e) => { e.preventDefault(); location.reload(); });
}

function openRoomPage(roomName) {
    const room = roomsMeta[roomName];
    if (!room) return;

    const chatKey = `chat_${roomName}`;
    let messages = JSON.parse(localStorage.getItem(chatKey)) || [];
    
    const feedKey = `feed_${roomName}`;
    let feedItems = JSON.parse(localStorage.getItem(feedKey));
    if (!feedItems || feedItems.length === 0) {
        feedItems = defaultFeeds[roomName] || [
            { type: 'news', text: 'Добро пожаловать в кружок!' },
            { type: 'video', text: 'Вводное занятие скоро' }
        ];
        localStorage.setItem(feedKey, JSON.stringify(feedItems));
    }

    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 20px 0 20px 0;">
            <h1 style="font-size: 2rem;">${escapeHtml(roomName)}</h1>
            <button id="backToHomeBtn" class="btn-outline"><i class="fas fa-arrow-left"></i> На главную</button>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 340px; gap: 28px;">
            <div style="background: white; border-radius: 32px; padding: 24px; border:1px solid #e7e4db;">
                <h3 style="margin-bottom: 20px;"><i class="fas fa-newspaper"></i> Информационная лента</h3>
                <div id="feedContainer">
                    ${feedItems.map(item => {
                        if (item.type === 'news') return `<div style="background: #fef4e8; border-radius: 24px; padding: 16px; margin-bottom: 16px;"><i class="fas fa-bullhorn"></i> ${escapeHtml(item.text)}</div>`;
                        if (item.type === 'video') return `<div style="background: #eaf6ef; border-radius: 24px; padding: 16px; margin-bottom: 16px;"><i class="fas fa-play-circle"></i> <strong>${escapeHtml(item.text)}</strong><br><span style="font-size:0.8rem;">Видео доступно в плеере</span></div>`;
                        return '';
                    }).join('')}
                    <div class="add-post" style="margin-top: 20px;">
                        <textarea id="newPostText" rows="2" placeholder="Опубликовать новость, видео или идею..." style="width:100%; border-radius: 24px; padding:12px; border:1px solid #e7e4db;"></textarea>
                        <button id="publishPostBtn" class="btn-primary" style="margin-top: 8px;">Активировать в ленте</button>
                    </div>
                </div>
            </div>
            <div style="background: white; border-radius: 32px; border:1px solid #e7e4db; display: flex; flex-direction: column; height: 70vh; position: sticky; top: 90px;">
                <div style="padding: 16px; border-bottom:1px solid #e7e4db; background: #fafaf5; border-radius: 32px 32px 0 0;">
                    <i class="fas fa-comments"></i> <strong>Чат кружка</strong>
                </div>
                <div id="chatMessagesList" style="flex:1; overflow-y: auto; padding: 16px; display:flex; flex-direction: column; gap: 8px;">
                    ${messages.map(m => `<div style="background:#f3f4ef; border-radius: 20px; padding: 8px 12px;"><strong>${escapeHtml(m.sender)}</strong>: ${escapeHtml(m.text)}</div>`).join('')}
                    ${messages.length === 0 ? '<div style="color: gray; text-align:center; padding:20px;">Пока нет сообщений. Напиши первым!</div>' : ''}
                </div>
                <div style="padding: 12px; border-top:1px solid #e7e4db; display: flex; gap: 8px;">
                    <input type="text" id="chatInput" placeholder="Написать..." style="flex:1; border-radius: 40px; border:1px solid #e7e4db; padding: 10px;">
                    <button id="sendChatBtn" class="join-btn">Отправить</button>
                </div>
            </div>
        </div>
    `;

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');
    const chatContainer = document.getElementById('chatMessagesList');

    function renderChat() {
        const updated = JSON.parse(localStorage.getItem(chatKey)) || [];
        if (chatContainer) {
            chatContainer.innerHTML = updated.map(m => `<div style="background:#f3f4ef; border-radius: 20px; padding: 8px 12px;"><strong>${escapeHtml(m.sender)}</strong>: ${escapeHtml(m.text)}</div>`).join('') || '<div style="color: gray; text-align:center; padding:20px;">Пока нет сообщений. Напиши первым!</div>';
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        const newMsg = { sender: "Участник", text: text, time: Date.now() };
        const current = JSON.parse(localStorage.getItem(chatKey)) || [];
        current.push(newMsg);
        localStorage.setItem(chatKey, JSON.stringify(current));
        renderChat();
        chatInput.value = '';
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    const pubBtn = document.getElementById('publishPostBtn');
    const postTextarea = document.getElementById('newPostText');
    const feedDiv = document.getElementById('feedContainer');

    if (pubBtn && feedDiv) {
        pubBtn.addEventListener('click', () => {
            const content = postTextarea.value.trim();
            if (content) {
                const newPost = document.createElement('div');
                newPost.style.background = "#fef4e8";
                newPost.style.borderRadius = "24px";
                newPost.style.padding = "16px";
                newPost.style.marginBottom = "16px";
                newPost.innerHTML = `<i class="fas fa-bullhorn"></i> ${escapeHtml(content)}`;
                const addPostDiv = feedDiv.querySelector('.add-post');
                feedDiv.insertBefore(newPost, addPostDiv);
                const currentFeed = JSON.parse(localStorage.getItem(feedKey)) || [];
                currentFeed.push({ type: 'news', text: content });
                localStorage.setItem(feedKey, JSON.stringify(currentFeed));
                postTextarea.value = '';
            } else {
                alert("Напишите текст новости");
            }
        });
    }

    document.getElementById('backToHomeBtn').addEventListener('click', () => {
        location.reload();
    });

    renderChat();
}