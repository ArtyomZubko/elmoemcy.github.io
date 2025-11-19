#!/bin/bash

# Скрипт для упаковки EMCY Decoder в один HTML файл
# Использование: ./build-single-page.sh

set -e

echo "EMCY Decoder - Build Script"
echo "================================"

# Проверка наличия необходимых файлов
if [ ! -f "index.html" ]; then
    echo "❌ Ошибка: файл index.html не найден"
    exit 1
fi

if [ ! -f "styles.css" ]; then
    echo "❌ Ошибка: файл styles.css не найден"
    exit 1
fi

if [ ! -f "decoder.js" ]; then
    echo "❌ Ошибка: файл decoder.js не найден"
    exit 1
fi

OUTPUT_FILE="emcy-decoder.html"

echo "📦 Упаковка файлов..."

# Читаем содержимое файлов
CSS_CONTENT=$(cat styles.css)
JS_CONTENT=$(cat decoder.js)

# Создаем единый HTML файл
cat > "$OUTPUT_FILE" << 'EOF'
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EMCY Frame Decoder - Elmo</title>
    <style>
EOF

# Вставляем CSS
cat styles.css >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << 'EOF'
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>EMCY Frame Decoder</h1>
            <p class="subtitle">Расшифровка кодов ошибок Elmo</p>
        </header>

        <main>
            <div class="input-section">
                <label for="emcyInput">Введите EMCY код (HEX, до 4 байт):</label>
                <div class="input-group">
                    <input 
                        type="text" 
                        id="emcyInput" 
                        placeholder="Например: 10002300"
                        maxlength="8"
                        pattern="[0-9A-Fa-f]*"
                    >
                    <button id="decodeBtn" class="btn-primary">Дешифровать</button>
                </div>
                <small class="hint">Формат: до 8 шестнадцатеричных символов (0-9, A-F)</small>
            </div>

            <div id="result" class="result-section hidden">
                <h2>Результат расшифровки:</h2>
                <div class="result-card">
                    <div class="result-item">
                        <strong>Error Code (младшие 2 байта):</strong>
                        <span id="errorCode"></span>
                    </div>
                    <div class="result-item">
                        <strong>EMCY Name:</strong>
                        <span id="emcyName" class="highlight"></span>
                    </div>
                    <div class="result-item">
                        <strong>Elmo Error Code (старший байт):</strong>
                        <span id="elmoErrorCode"></span>
                    </div>
                    <div class="result-item">
                        <strong>Elmo Error Description:</strong>
                        <span id="elmoDescription" class="highlight"></span>
                    </div>
                </div>
            </div>

            <div id="error" class="error-section hidden">
                <p id="errorMessage"></p>
            </div>
        </main>

        <footer>

        </footer>
    </div>

    <script>
EOF

# Вставляем JavaScript
cat decoder.js >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << 'EOF'
    </script>
</body>
</html>
EOF

echo "✅ Готово! Создан файл: $OUTPUT_FILE"
echo "📁 Размер файла: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo ""
echo "Теперь вы можете:"
echo "  • Открыть $OUTPUT_FILE в браузере двойным кликом"
echo "  • Разместить $OUTPUT_FILE на любом веб-хостинге"
echo ""
echo "🎉 Успешная сборка!"