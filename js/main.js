const VOWELS = 'aeiouAEIOU';

$(document).ready(function() {
    typeName();
});

function showProjects() {
    $("#main-content").fadeOut(200, () => {
        toggleNavBarClass();
        $("#project-content").fadeIn(200);
    });
}

function showHome() {
    $("#project-content").fadeOut(200, () => {
        toggleNavBarClass();
        $("#main-content").fadeIn(200);
    });
}

function toggleNavBarClass() {
    $('#nav').children('span').each(function() {
        if ($(this).hasClass('nav-tab')) {
            $(this).removeClass('nav-tab');
            $(this).addClass('selected-nav-tab');
        } else {
            $(this).removeClass('selected-nav-tab');
            $(this).addClass('nav-tab');
        }
    });
}

function typeName() {
    const text = "I am Robert Jardine";
    let index = 0;
    let nameInterval = setInterval(() => {
        if (index > text.length) {
            clearInterval(nameInterval);
            cycleTitle();
        } else {
            $('#header').text(text.substring(0, index));
        }
        index++;
    }, 100);
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
    let wordColors = ['#ff9d00', '#ff7272', '#fffb00', '#46ff00', '#00ffec', '#6785ff', '#d183ff', '#ff00c4'];
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
