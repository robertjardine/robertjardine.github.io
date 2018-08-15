const VOWELS = 'aeiouAEIOU';

$(document).ready(function() {
    cycleTitle();
});

function showHidden() {
    $("#main-content").fadeOut(200, () => {
        $("#hidden-content").fadeIn(200);
    });
}

function showHome() {
    $("#hidden-content").fadeOut(200, () => {
        $("#main-content").fadeIn(200);
    });
}

function cycleTitle() {
    let words = [
        'Software Engineer', 'Japanese Speaker', 'DevOps Engineer', 'Software Developer', 'Martial Artist',
        'Coder', 'Backend Developer', 'English Speaker', 'Programmer', 'Frontend Developer', 'Full Stack Developer'
    ];
    let wordsJapanese = [
        'ソフトウェアエンジニア', '日本語話者', 'DevOpsエンジニア', '開発者', '武道家', 'コーダー',  
        'バックエンドディベロッパー', '英語話者', 'プログラマ', 'フロントエンドディベロッパー', 'フルスタックディベロッパー'
    ];
    let wordColors = ['#ff9d00', '#ff0000', '#fffb00', '#46ff00', '#00ffec', '#0033ff', '#a100ff', '#ff00c4'];
    let wordIndex = 0;
    let colorIndex =  Math.floor(Math.random() * wordColors.length);
    
    setInterval(function() {
        if (wordIndex >= words.length) {
            wordIndex = 0;
        }

        let kotobaPromise = new Promise((resolve, reject) => {
            $('#boku-ha').fadeOut(() => {
                $("#boku-ha").text(wordsJapanese[wordIndex]);
                $("#boku-ha").fadeIn(200);
                resolve();
            });
        });

        let wordPromise = new Promise((resolve, reject) => {
            $("#i-am").fadeOut(200, function() {
                let prefix = (VOWELS.indexOf(words[wordIndex][0]) !== -1) ? 'I am an ' : 'I am a ';
                $("#prefix").text(prefix);
                $("#i-am").text(words[wordIndex]);
                $("#i-am").css('color', wordColors[colorIndex]);
                $("#i-am").fadeIn(200);
                resolve();
            });
        });
        
        Promise.all([kotobaPromise, wordPromise]).then((results) => {
            let newIndex = colorIndex;
            while (colorIndex === newIndex) {
                newIndex = Math.floor(Math.random() * wordColors.length);
            }
            colorIndex = newIndex;
            wordIndex++;
        });
    }, 2000);
}