// Таблица EMCY Error Codes (младшие 2 байта)
const emcyErrorCodes = {
    0x2340: "Short circuit",
    0x3120: "Under-voltage",
    0x3130: "AC fail, loss of phase",
    0x3310: "Over-voltage",
    0x4310: "Temperature: drive overheating",
    0x5280: "Gantry position error",
    0x5441: "Motor disabled by: INHIBIT or ABORT and FLS and RLS are switched on simultaneously in IP or CSP operation modes. Note that FLS\\RLS are ignored when XA[4]=4",
    0x5442: "Motor disabled by switch \"additional abort motion\"",
    0x6300: "RPDO failed",
    0x7121: "Motor stuck",
    0x7300: "Feedback error",
    0x7381: "Two digital Hall sensors were changed at the same time",
    0x7382: "Commutation process fail during motor on",
    0x8110: "CAN message lost (corrupted or overrun)",
    0x8130: "Heartbeat event",
    0x8140: "Recovered from bus off",
    0x8210: "Attempt to access a non-configured RPDO",
    0x8311: "Peak current has been exceeded. Possible reasons are drive malfunction or bad tuning of the current controller.",
    0x8480: "Speed tracking error DV[2] - VX (for UM=2 or UM=4, 5) exceeded speed error limit ER[2]. This may occur due to: Bad tuning of the speed controller, Too tight a speed error tolerance, Inability of motor to accelerate to the required speed due to too low a line voltage or insufficient motor power",
    0x8481: "Speed limit exceeded: VX<LL[2] or VX>HL[2]. (Compatibility only)",
    0x8611: "Position tracking error DV[3] - PX (UM=5) or DV[3] - PY (UM=4) exceeded position error limit ER[3]. This may occur due to: Bad tuning of the position or speed controller, Too tight a position error tolerance, Abnormal motor load, or reaching a mechanical limit",
    0x8680: "Position limit exceeded: PX<LL[3] or PX>HL[3] (UM=5), or PY<LL[3] or PY>HL[3] (UM=4). (Compatibility only)",
    0xFF01: "Request by user program EMCY(N) function",
    0xFF02: "Either of the possibilities: IP mode underflow, Interpolation queue full (overflow), Reference received in a wrong index. This EMCY is transmitted when operating in Profile Interpolated mode, sub mode 0 and RPDO with object 0x60C1 sub index 2 was received.",
    0xFF10: "Failed to start motor",
    0xFF20: "Safety Torque Off in use",
    0xFF40: "Gantry Slave Disabled",
};


// Таблица Elmo Error Codes (старший байт)
const elmoErrorCodes = {
    0x0: "Дополнительный код ошибки отсутсвует",
    0x1: "Will not be updated",
    0x2: "Bad command",
    0x3: "Bad index",
    0x4: "PAL does not support this sensor",
    0x7: "Mode cannot be started - bad initialization data",
    0x9: "CAN message was lost - hardware error",
    0xA: "Cannot be used by PDO",
    0xB: "Cannot write to flash memory",
    0xD: "Cannot reset communication - UART is busy",
    0x10: "Array '[]' is expected, or empty expression in array",
    0x11: "Format of UL command is not valid - check the command definition",
    0x13: "Command syntax error",
    0x14: "Bad Set Point sending order",
    0x15: "Operand out of range",
    0x16: "Zero division",
    0x17: "Command cannot be assigned",
    0x18: "Bad operation",
    0x1A: "Profiler mode not supported in this unit mode (UM)",
    0x1B: "Bad ECAM setting, refer to EE[6]",
    0x1C: "Out Of limit range",
    0x1F: "CAN get object return an abort when called from interpreter",
    0x20: "Communication overrun, parity, noise, or framing error",
    0x21: "Bad sensor setting, check CA[18], CA[19]",
    0x22: "There is a conflict with another command",
    0x23: "Max bus voltage (BV) or max current (MC) is not valid",
    0x24: "Commutation method (CA[17]) or commutation table does not fit to sensor",
    0x25: "Hall sensors are defined to the same place, check CA[4], CA[5] or CA[6]",
    0x26: "PORT C mux is with conflict with other GO[] or cannot be assigned to the output",
    0x28: "Operating in Wizard experimental mode",
    0x29: "Command is not supported by this product",
    0x2A: "No Such Label",
    0x2D: "An attempt to read a write only object",
    0x2F: "Program does not exist or not compiled",
    0x30: "Motor could not start - fault reason in CD",
    0x31: "ECAM must be disabled during init (RM=0)",
    0x32: "Stack overflow",
    0x33: "Inhibit OR Abort inputs are active, cannot start motor",
    0x34: "PVT queue full",
    0x36: "Bad database",
    0x37: "Bad context",
    0x39: "Motor must be off (MO=0)",
    0x3A: "Servo (SO) must be on",
    0x3C: "Bad unit mode",
    0x3D: "Database reset",
    0x3E: "Socket change not allowed while capture is enabled",
    0x42: "Amplifier not ready",
    0x43: "Recorder is busy or data is uploading",
    0x44: "Required profiler mode is not supported",
    0x45: "Recorder usage error",
    0x46: "Recorder data Invalid",
    0x47: "Homing is busy",
    0x48: "Modulo range must be even",
    0x49: "Please set position",
    0x4A: "Bad profile database, see EE[2] or 0x2081 for the failed object number",
    0x4B: "Download is in progress",
    0x4C: "Error mapping is not allowed while Homing is in progress (HM[1]|HF[1])",
    0x4E: "Out of program range",
    0x4F: "Sensor setting error, possible conflict with other socket settings",
    0x50: "ECAM data inconsistent",
    0x51: "Download failed see specific error in EE[3]",
    0x52: "Program is running",
    0x53: "Command is not permitted in a program",
    0x55: "STO is not active OR During STO Diagnostic",
    0x57: "Reserved",
    0x5E: "Not allowed while Error mapping (PC[1]) is in progress",
    0x60: "User program time out",
    0x61: "RS232 receive buffer overflow",
    0x62: "Current offsets are beyond the allowed limit",
    0x63: "Bad auxiliary sensor configuration",
    0x64: "The requested PWM multiplication value is not supported",
    0x65: "Absolute encoder setting problem",
    0x66: "Output Compare (OC[1] \\ OC[2]) or Emulation (EA[1]) are busy",
    0x67: "Output compare sensor is not QUAD Encoder",
    0x68: "Output Compare Table Length OR Data",
    0x69: "Speed loop KP out of range",
    0x6B: "Encoder emulation parameter (EA[2] to EA[7]) is out of range",
    0x6C: "Encoder emulation (EA[1]) is already in progress",
    0x6E: "Too long number",
    0x79: "Please wait until analog sensor initialized",
    0x7A: "Motion mode is not supported or with initialization conflict",
    0x7B: "Profiler queue is full",
    0x7D: "Personality not loaded",
    0x7E: "User Program failed - variable out of program size",
    0x80: "Bad variable index in database - internal compiler error",
    0x81: "Variable is not an array",
    0x82: "Variable name does not exist",
    0x83: "Cannot record local variable",
    0x84: "Variable is an array",
    0x85: "Number of function input arguments is not as expected",
    0x86: "Cannot run local label/function with XQ command",
    0x87: "Frequency identification failed",
    0x88: "Not a number",
    0x8A: "Position interpolation buffer underflow",
    0x8B: "The number of break points exceeds maximal number",
    0x8C: "An attempt to set/clear break point at the not relevant line",
    0x8D: "Boot identity parameters section is not clear",
    0x8E: "Checksum of data is not correct",
    0x90: "Numeric Stack underflow",
    0x91: "Numeric stack overflow",
    0x93: "Executable command within math expression",
    0x94: "Nothing in the expression",
    0x97: "Parentheses mismatch",
    0x98: "Bad operand type",
    0x99: "Overflow in a numeric operator",
    0x9A: "Address is out of data memory segment",
    0x9B: "Beyond stack range",
    0x9C: "Bad op-code",
    0x9E: "Out of flash memory range",
    0x9F: "Flash verify error",
    0xA1: "Program is not halted",
    0xA3: "Not enough space in program data segment",
    0xA5: "An attempt to access flash while busy",
    0xA6: "Out of modulo range",
    0xA8: "Speed too large to start motor",
    0xA9: "Time out using peripheral.(overflow or busy)",
    0xAA: "Cannot erase sector in flash memory",
    0xAB: "Cannot read from flash memory",
    0xAC: "Cannot write to flash memory",
    0xAD: "Executable area of program is too large",
    0xAE: "Program has not been loaded",
    0xAF: "Cannot write program checksum - clear program (CP)",
    0xB0: "User code, variables and functions are too large",
    0xB1: "Capture/Compare conversion error in analog encoder.",
    0xB2: "CAN bus off",
    0xB3: "Consumer HB event",
    0xB4: "DF is not supported in this communication type",
    0xB5: "Writing to Flash program area, failed",
    0xB6: "PAL Burn is in process or no PAL is burnt or incompatible PAL version",
    0xB8: "Capture option already used by other operation",
    0xB9: "This element may be modified only when interpolation is not active",
    0xBA: "Interpolation queue is full",
    0xBB: "Incorrect Interpolation sub-mode",
    0xBC: "Gantry slave disable",
    0xBD: "CAN message was lost - software",
    0xBE: "Profile Acceleration is out of range",
    0xBF: "Motor over temperature",
    0xC8: "Main feedback error. Refer to EE[1]",
    0xC9: "Commutation sequense failed",
    0xCA: "Encoder-Hall sensor mismatch. Refer to XP[7]",
    0xCB: "Current limit was exceeded",
    0xCC: "External inhibit input detected",
    0xCD: "AC fail: Loss of phase",
    0xCE: "Digital halls run too fast or disconnected",
    0xCF: "Speed error limit exceeded. Refer to ER[2]",
    0xD0: "Position limit error exceeded. Refer to ER[3]",
    0xD1: "Cannot start motor . Bad data base. Refer to CD",
    0xD2: "Bad ECAM table",
    0xD6: "Cannot find zero position without digital halls",
    0xD7: "Over speed. Refer to HL[2]",
    0xDD: "Motor stack",
    0xDE: "Out of position limits. Refer to HL[3], LL[3]",
    0xDF: "Numerical overflow",
    0xE2: "Gantry slave is not enabled",
    0xE5: "Cannot start motor because of internal problem",
    0xE9: "Undervoltage protection",
    0xEB: "Overvoltage protection",
    0xEF: "Safety switch",
    0xF1: "Short protection",
    0xF3: "Over temperature protection",
    0xF5: "Additional inhibit input",
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
