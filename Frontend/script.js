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
        { type: 'video', text: 'Обзор новых кортов и основная техника подачи', url: 'https://rutube.ru/play/embed/01048d80fe5ed470de12133b6a99da23/' },
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

function loadCustomRooms() {
    const data = localStorage.getItem('customRooms');
    return data ? JSON.parse(data) : {};
}

function saveCustomRooms(custom) {
    localStorage.setItem('customRooms', JSON.stringify(custom));
}

function getAllRooms() {
    return { ...roomsMeta, ...loadCustomRooms() };
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || {};
}
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}
function setCurrentUser(username) {
    sessionStorage.setItem('currentUser', JSON.stringify(username));
}
function logout() {
    sessionStorage.removeItem('currentUser');
    location.reload();
}

function updateAuthUI() {
    const authBtn = document.getElementById('authButton');
    if (!authBtn) return;
    const currentUser = getCurrentUser();
    if (currentUser) {
        authBtn.textContent = 'Выйти';
        authBtn.className = 'btn-outline';
        authBtn.onclick = logout;
    } else {
        authBtn.textContent = 'Войти';
        authBtn.className = 'btn-outline';
        authBtn.onclick = () => openAuthPage();
    }
}

function openSupportPage() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;
    const allRooms = getAllRooms();
    const options = Object.keys(allRooms).map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join('');
    mainContent.innerHTML = `
        <div class="page-container">
            <button id="backToHomeBtn" class="btn-outline" style="margin-bottom:20px;"><i class="fas fa-arrow-left"></i> На главную</button>
            <h1>Поддержать кружок</h1>
            <p style="margin-bottom:24px;">Выберите кружок и укажите сумму. Все средства будут направлены на благотворительные цели.</p>
            <div class="form-group">
                <label>Кружок</label>
                <select id="supportRoomSelect" class="form-input">${options}</select>
            </div>
            <div class="form-group">
                <label>Сумма (руб.)</label>
                <input type="number" id="supportAmount" class="form-input" min="1" placeholder="100">
            </div>
            <button id="supportSubmit" class="btn-primary" style="width:100%;">Поддержать</button>
            <div id="supportMessage" style="margin-top:16px; color:#3b7b4a; font-weight:500;"></div>
        </div>
    `;
    document.getElementById('backToHomeBtn').addEventListener('click', () => location.reload());
    document.getElementById('supportSubmit').addEventListener('click', () => {
        const room = document.getElementById('supportRoomSelect').value;
        const amount = document.getElementById('supportAmount').value;
        if (!amount || amount <= 0) {
            alert('Введите сумму');
            return;
        }
        document.getElementById('supportMessage').textContent = `Спасибо! Ваш вклад ${amount} руб. в кружок «${room}» будет направлен на благотворительность.`;
        const history = JSON.parse(localStorage.getItem('supportHistory')) || [];
        history.push({ room, amount, date: new Date().toISOString() });
        localStorage.setItem('supportHistory', JSON.stringify(history));
    });
}

function openAuthPage() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;
    mainContent.innerHTML = `
        <div class="page-container">
            <button id="backToHomeBtn" class="btn-outline" style="margin-bottom:20px;"><i class="fas fa-arrow-left"></i> На главную</button>
            <div class="tabs">
                <button class="tab-btn active" data-tab="login">Вход</button>
                <button class="tab-btn" data-tab="register">Регистрация</button>
            </div>
            <div id="authFormContainer">
                <div id="loginForm">
                    <div class="form-group">
                        <label>Логин</label>
                        <input type="text" id="loginUsername" class="form-input" placeholder="Ваш логин">
                    </div>
                    <div class="form-group">
                        <label>Пароль</label>
                        <input type="password" id="loginPassword" class="form-input" placeholder="Пароль">
                    </div>
                    <button id="loginBtn" class="btn-primary" style="width:100%;">Войти</button>
                    <div id="loginError" style="color:red; margin-top:8px;"></div>
                </div>
                <div id="registerForm" style="display:none;">
                    <div class="form-group">
                        <label>Логин</label>
                        <input type="text" id="regUsername" class="form-input" placeholder="Придумайте логин">
                    </div>
                    <div class="form-group">
                        <label>Пароль</label>
                        <input type="password" id="regPassword" class="form-input" placeholder="Пароль">
                    </div>
                    <button id="registerBtn" class="btn-primary" style="width:100%;">Зарегистрироваться</button>
                    <div id="registerError" style="color:red; margin-top:8px;"></div>
                </div>
            </div>
        </div>
    `;

    const tabBtns = mainContent.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.dataset.tab;
            document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
            document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
        });
    });

    document.getElementById('backToHomeBtn').addEventListener('click', () => location.reload());

    document.getElementById('loginBtn').addEventListener('click', () => {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        const users = getUsers();
        if (!username || !password) {
            document.getElementById('loginError').textContent = 'Заполните все поля';
            return;
        }
        if (!users[username] || users[username] !== password) {
            document.getElementById('loginError').textContent = 'Неверный логин или пароль';
            return;
        }
        setCurrentUser(username);
        location.reload();
    });

    document.getElementById('registerBtn').addEventListener('click', () => {
        const username = document.getElementById('regUsername').value.trim();
        const password = document.getElementById('regPassword').value;
        const users = getUsers();
        if (!username || !password) {
            document.getElementById('registerError').textContent = 'Заполните все поля';
            return;
        }
        if (users[username]) {
            document.getElementById('registerError').textContent = 'Пользователь уже существует';
            return;
        }
        users[username] = password;
        saveUsers(users);
        setCurrentUser(username);
        location.reload();
    });
}

function renderCustomRoomCards() {
    const customRooms = loadCustomRooms();
    const grid = document.getElementById('roomsGrid');
    Object.entries(customRooms).forEach(([name, data]) => {
        if (document.querySelector(`.room-card[data-room-name="${CSS.escape(name)}"]`)) return;
        const card = document.createElement('div');
        card.className = 'room-card';
        card.setAttribute('data-category', data.category);
        card.setAttribute('data-room-name', name);
        card.innerHTML = `
            <div class="card-img" style="background: ${data.gradient};"></div>
            <div class="card-content">
                <h3>${escapeHtml(name)}</h3>
                <p class="desc">${escapeHtml(data.desc || '')}</p>
                <div class="card-footer">
                    <button class="join-btn" data-room-id="${escapeHtml(name)}">Выбрать кружок →</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function updateFilters() {
    const container = document.getElementById('filtersContainer');
    if (!container) return;
    const allRooms = getAllRooms();
    const categories = new Set(Object.values(allRooms).map(r => r.category));
    const existingButtons = Array.from(container.querySelectorAll('.filter-btn'));
    const existingFilters = existingButtons.map(b => b.getAttribute('data-filter'));
    categories.forEach(cat => {
        if (!existingFilters.includes(cat)) {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.setAttribute('data-filter', cat);
            btn.textContent = cat;
            container.appendChild(btn);
        }
    });
    attachFilterEvents();
}

function attachFilterEvents() {
    const container = document.getElementById('filtersContainer');
    if (!container) return;
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.removeEventListener('click', filterHandler);
        btn.addEventListener('click', filterHandler);
    });
}

function filterHandler(e) {
    const container = document.getElementById('filtersContainer');
    container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.getAttribute('data-filter');
    document.querySelectorAll('.room-card').forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function initFilters() {
    updateFilters();
    attachFilterEvents();
}

function initRoomButtons() {
    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.removeEventListener('click', roomClickHandler);
        btn.addEventListener('click', roomClickHandler);
    });
}

function roomClickHandler(e) {
    e.stopPropagation();
    const roomName = e.target.getAttribute('data-room-id');
    if (roomName) openRoomPage(roomName);
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

    const goHome = (e) => {
        e.preventDefault();
        window.location.href = window.location.origin + window.location.pathname;
    };

    if (homeLogo) homeLogo.addEventListener('click', goHome);
    if (homeNav) homeNav.addEventListener('click', goHome);

    const roomsNav = document.getElementById('roomsNavLink');
    if (roomsNav) {
        roomsNav.addEventListener('click', (e) => {
            e.preventDefault();
            const filtersSection = document.querySelector('.filters-section');
            if (filtersSection) {
                filtersSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = window.location.origin + window.location.pathname;
            }
        });
    }

    const supportNav = document.getElementById('supportNavLink');
    if (supportNav) {
        supportNav.addEventListener('click', (e) => {
            e.preventDefault();
            openSupportPage();
        });
    }
}

function openRoomPage(roomName) {
    window.scrollTo(0, 0);

    const allRooms = getAllRooms();
    const room = allRooms[roomName];
    if (!room) return;

    const chatKey = `chat_${roomName}`;
    let messages = JSON.parse(localStorage.getItem(chatKey)) || [];

    const feedKey = `feed_${roomName}`;
    let feedItems = JSON.parse(localStorage.getItem(feedKey));
    if (!feedItems || feedItems.length === 0) {
        feedItems = defaultFeeds[roomName] || [ { type: 'news', text: 'Добро пожаловать в кружок!' } ];
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
                <h3 style="margin-bottom: 20px;">Информационная лента</h3>
                <div id="feedContainer">
                    ${feedItems.map(item => renderFeedItem(item)).join('')}
                    <div class="add-post" style="margin-top: 20px; border-top: 1px solid #e7e4db; padding-top: 20px;">
                        <textarea id="newPostText" rows="2" placeholder="Текст новости" style="width:100%; border-radius: 24px; padding:12px; border:1px solid #e7e4db; margin-bottom: 8px;"></textarea>
                        <input type="file" id="newPostMedia" accept="image/*,video/*" style="margin-bottom: 12px;">
                        <button id="publishPostBtn" class="btn-primary">Опубликовать</button>
                    </div>
                </div>
            </div>
            <div style="background: white; border-radius: 32px; border:1px solid #e7e4db; display: flex; flex-direction: column; height: 70vh; position: sticky; top: 90px;">
                <div style="padding: 16px; border-bottom:1px solid #e7e4db; background: #fafaf5; border-radius: 32px 32px 0 0;">
                    <strong>Чат кружка</strong>
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

    function renderFeedItem(item) {
        if (item.type === 'news') {
            return `<div style="background: #fef4e8; border-radius: 24px; padding: 16px; margin-bottom: 16px;">${escapeHtml(item.text)}</div>`;
        } else if (item.type === 'video') {
            if (item.url) {
                return `<div style="background: #eaf6ef; border-radius: 24px; padding: 16px; margin-bottom: 16px;">
                    <strong>${escapeHtml(item.text || 'Видео')}</strong>
                    <div class="video-wrapper"><iframe src="${escapeHtml(item.url)}" allowfullscreen></iframe></div>
                </div>`;
            } else if (item.dataUrl) {
                return `<div style="background: #eaf6ef; border-radius: 24px; padding: 16px; margin-bottom: 16px;">
                    <strong>${escapeHtml(item.text || 'Видео')}</strong>
                    <video controls src="${item.dataUrl}" style="width:100%; border-radius:16px; margin-top:8px;"></video>
                </div>`;
            }
        } else if (item.type === 'image' && item.dataUrl) {
            return `<div style="background: #fef4e8; border-radius: 24px; padding: 16px; margin-bottom: 16px;">
                ${item.text ? '<p>' + escapeHtml(item.text) + '</p>' : ''}
                <img src="${item.dataUrl}" class="media-img" alt="изображение">
            </div>`;
        }
        return '';
    }

    function renderChat() {
        const updated = JSON.parse(localStorage.getItem(chatKey)) || [];
        const container = document.getElementById('chatMessagesList');
        if (container) {
            container.innerHTML = updated.map(m => `<div style="background:#f3f4ef; border-radius: 20px; padding: 8px 12px;"><strong>${escapeHtml(m.sender)}</strong>: ${escapeHtml(m.text)}</div>`).join('') || '<div style="color: gray; text-align:center; padding:20px;">Пока нет сообщений. Напиши первым!</div>';
            container.scrollTop = container.scrollHeight;
        }
    }

    const currentUserName = getCurrentUser() || 'Участник';

    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        const newMsg = { sender: currentUserName, text: text, time: Date.now() };
        const current = JSON.parse(localStorage.getItem(chatKey)) || [];
        current.push(newMsg);
        localStorage.setItem(chatKey, JSON.stringify(current));
        renderChat();
        chatInput.value = '';
    }
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    const pubBtn = document.getElementById('publishPostBtn');
    const postTextarea = document.getElementById('newPostText');
    const mediaInput = document.getElementById('newPostMedia');
    const feedContainer = document.getElementById('feedContainer');

    pubBtn.addEventListener('click', () => {
        const text = postTextarea.value.trim();
        const file = mediaInput.files[0];
        if (!text && !file) {
            alert('Введите текст или выберите файл');
            return;
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const dataUrl = e.target.result;
                let type = file.type.startsWith('image/') ? 'image' : 'video';
                const newItem = { type, text: text || (type==='video'?'Видео':'Изображение'), dataUrl };
                addFeedItem(newItem);
            };
            reader.readAsDataURL(file);
        } else {
            const newItem = { type: 'news', text };
            addFeedItem(newItem);
        }
    });

    function addFeedItem(item) {
        const newElement = document.createElement('div');
        newElement.innerHTML = renderFeedItem(item);
        const addPostDiv = feedContainer.querySelector('.add-post');
        feedContainer.insertBefore(newElement.firstElementChild, addPostDiv);
        const currentFeed = JSON.parse(localStorage.getItem(feedKey)) || [];
        currentFeed.push(item);
        localStorage.setItem(feedKey, JSON.stringify(currentFeed));
        postTextarea.value = '';
        mediaInput.value = '';
    }

    document.getElementById('backToHomeBtn').addEventListener('click', () => {
        location.reload();
    });

    renderChat();
}

function initAddCircleModal() {
    const overlay = document.getElementById('modalOverlay');
    const addBtn = document.getElementById('addCircleBtn');
    const closeBtn = document.getElementById('modalClose');
    const createBtn = document.getElementById('createRoomConfirm');
    const gradientPresets = document.querySelectorAll('.gradient-preset');
    const selectedGradientInput = document.getElementById('selectedGradient');

    gradientPresets.forEach(preset => {
        preset.addEventListener('click', () => {
            gradientPresets.forEach(p => p.classList.remove('active'));
            preset.classList.add('active');
            selectedGradientInput.value = preset.dataset.gradient;
        });
    });

    addBtn.addEventListener('click', () => { overlay.style.display = 'flex'; });
    closeBtn.addEventListener('click', () => { overlay.style.display = 'none'; });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });

    createBtn.addEventListener('click', () => {
        const name = document.getElementById('newRoomName').value.trim();
        const category = document.getElementById('newRoomCategory').value;
        const desc = document.getElementById('newRoomDesc').value.trim();
        const gradient = selectedGradientInput.value;
        if (!name) { alert('Введите название'); return; }
        if (!category) { alert('Выберите категорию'); return; }
        const customRooms = loadCustomRooms();
        if (roomsMeta[name] || customRooms[name]) { alert('Такой кружок уже есть'); return; }
        customRooms[name] = { gradient, category, desc };
        saveCustomRooms(customRooms);
        renderCustomRoomCards();
        updateFilters();
        initRoomButtons();
        document.getElementById('newRoomName').value = '';
        document.getElementById('newRoomDesc').value = '';
        overlay.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCustomRoomCards();
    initFilters();
    initRoomButtons();
    initHeroButton();
    initHomeButtons();
    initAddCircleModal();
    updateAuthUI();
});