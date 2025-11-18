// Таблица EMCY Error Codes (младшие 2 байта)
const emcyErrorCodes = {
    0x2340: "Short circuit",
    0x3120: "Under-voltage",
    0x3130: "AC fail, loss of phase",
    0x3310: "Over-voltage",
    0x4310: "Temperature: drive overheating",
    0x8480: "Speed tracking error DV[2] - VX(for UM=2 or UM=4, 5) exceeded speed error limit ER[2]. This may occur due to:",
};

// Таблица Elmo Error Codes (старший байт)
const elmoErrorCodes = {
    0x00: "Отсутвует additional error code",
    0x81: "Variable is not an array",
};

// DOM элементы
const emcyInput = document.getElementById('emcyInput');
const decodeBtn = document.getElementById('decodeBtn');
const resultSection = document.getElementById('result');
const errorSection = document.getElementById('error');
const errorCodeEl = document.getElementById('errorCode');
const emcyNameEl = document.getElementById('emcyName');
const elmoErrorCodeEl = document.getElementById('elmoErrorCode');
const elmoDescriptionEl = document.getElementById('elmoDescription');
const errorMessageEl = document.getElementById('errorMessage');

// Функция для отображения ошибки
function showError(message) {
    errorSection.classList.remove('hidden');
    resultSection.classList.add('hidden');
    errorMessageEl.textContent = message;
}

// Функция для отображения результата
function showResult(errorCode, emcyName, elmoErrorCode, elmoDescription) {
    resultSection.classList.remove('hidden');
    errorSection.classList.add('hidden');
    
    errorCodeEl.textContent = `0x${errorCode.toString(16).toUpperCase().padStart(4, '0')}`;
    emcyNameEl.textContent = emcyName;
    elmoErrorCodeEl.textContent = `0x${elmoErrorCode.toString(16).toUpperCase().padStart(2, '0')}`;
    elmoDescriptionEl.textContent = elmoDescription;
}

// Функция декодирования EMCY фрейма
function decodeEMCY(hexString) {
    // Валидация входных данных
    if (!hexString || hexString.trim() === '') {
        throw new Error('Введите EMCY код');
    }
    
    // Удаляем пробелы и приводим к верхнему регистру
    hexString = hexString.trim().toUpperCase();
    
    // Проверка на валидность hex строки
    if (!/^[0-9A-F]+$/.test(hexString)) {
        throw new Error('Неверный формат. Используйте только шестнадцатеричные символы (0-9, A-F)');
    }
    
    // Проверка длины (не более 4 байт = 8 символов)
    if (hexString.length > 8) {
        throw new Error('EMCY код не может быть длиннее 4 байт (8 hex символов)');
    }
    
    // Дополняем нулями слева до 8 символов (4 байта)
    hexString = hexString.padStart(8, '0');
    
    // Парсим hex строку в число
    const fullCode = parseInt(hexString, 16);
    
    // Извлекаем младшие 2 байта (Error Code)
    const errorCode = fullCode & 0xFFFF;
    
    // Извлекаем старший байт (Elmo Error Code)
    // Для 4-байтового значения старший байт находится в битах 24-31
    const elmoErrorCode = (fullCode >> 24) & 0xFF;
    
    // Ищем описание Error Code
    let emcyName = emcyErrorCodes[errorCode];
    if (!emcyName) {
        // Пытаемся найти ближайший общий код
        const genericCode = errorCode & 0xFF00;
        emcyName = emcyErrorCodes[genericCode] || 'Неизвестный Error Code';
    }
    
    // Ищем описание Elmo Error Code
    const elmoDescription = elmoErrorCodes[elmoErrorCode] || 'Неизвестный Elmo Error Code';
    
    return {
        errorCode,
        emcyName,
        elmoErrorCode,
        elmoDescription
    };
}

// Обработчик нажатия кнопки
function handleDecode() {
    try {
        const result = decodeEMCY(emcyInput.value);
        showResult(
            result.errorCode,
            result.emcyName,
            result.elmoErrorCode,
            result.elmoDescription
        );
    } catch (error) {
        showError(error.message);
    }
}

// Обработчики событий
decodeBtn.addEventListener('click', handleDecode);

emcyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleDecode();
    }
});

// Фильтр ввода - только hex символы
emcyInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase().replace(/[^0-9A-F]/g, '');
});
