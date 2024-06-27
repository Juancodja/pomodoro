document.addEventListener('DOMContentLoaded', (event) => {
    
    const PAUSE_AUDIO = 'audio/pause.mp3';
    const UNPAUSE_AUDIO = 'audio/unpause.mp3';
    const SHORT_BREAK_AUDIO = 'audio/short-break.mp3';
    const LONG_BREAK_AUDIO = 'audio/long-break.mp3';
    const WORK_AUDIO = 'audio/work.mp3';


    function playAudio(audio) {
        const audioElement = new Audio(audio);
        audioElement.play();
    }
    
    var running = false;
    var time = 25 * 60;
    var current = 1;
    var total = 4;

    const State = {
        POMODORO: 'POMODORO',
        WORK: 'WORK',
        SHORT_BREAK: 'SHORT_BREAK',
        LONG_BREAK: 'LONG_BREAK'
    };

    var state = State.POMODORO;

    const header = document.querySelector('.header');
    const timer = document.getElementById('timerText');
    const info = document.getElementById('infoText');
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');

    startButton.addEventListener('click', () => {
        if (running) {
            pause();
        } else {
            unpause();
        }
        if (state === State.POMODORO) {
            setStateWork();
        } 
    });
    

    resetButton.addEventListener('click', () => {
        running = false;
        startButton.innerHTML = 'Start';
        time = 25 * 60;
        current = 4;
        total = 4;
        updateTimer();
        setStatePomodoro();
    });

    function pause() {
        running = false;
        startButton.innerHTML = 'Start';
        playAudio(PAUSE_AUDIO);
    }

    function unpause() {
        running = true;
        startButton.innerHTML = 'Pause';
        playAudio(UNPAUSE_AUDIO);
    }

    function setStatePomodoro() {
        state = State.POMODORO;
        running = false;
        time = 25 * 60;
        current = 4;
        timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        header.innerHTML = '🍅';
        info.innerHTML = 'Hello!!';
    }

    function setStateWork() {
        state = State.WORK;
        time = 25 * 60;
        header.innerHTML = '⏰';
        info.innerHTML = 'Work!! ' + current + '/' + total;
        playAudio(WORK_AUDIO);
    }

    function setStateShortBreak() {
        state = State.SHORT_BREAK;
        time = 5 * 60;
        header.innerHTML = '☕';
        info.innerHTML = 'Chill .. ' + current + '/' + total;
        playAudio(SHORT_BREAK_AUDIO);
    }

    function setStateLongBreak() {
        state = State.LONG_BREAK;
        time = 20 * 60;
        header.innerHTML = '🍱';
        info.innerHTML = 'Nap Time';
        playAudio(LONG_BREAK_AUDIO);
    }

    setInterval(() => {
        if (running) {
            time--;
            updateTimer();
            if (time === 0) {
                handleTimerEnd();
            }
        }
    }, 1000); // Intervalo de 1 segundo

    function updateTimer() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function handleTimerEnd() {
        if (state === State.WORK) {
            current--;
            if (current === 0) {
                setStateLongBreak();
            } else {
                setStateShortBreak();
            }
        } else if (state === State.SHORT_BREAK) {
            setStateWork();
        } else if (state === State.LONG_BREAK) {
            setStatePomodoro();
        }
    }

    // Inicializar el temporizador y el estado
    updateTimer();
    setStatePomodoro();
});