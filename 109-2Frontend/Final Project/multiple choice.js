const j50_Hiragana = ["あ", "い", "う",　"え",　"お",　"か",　"き",　"く",　"け",　"こ",　"さ",　"し",　"す",　"せ",　"そ",　"た",　"ち",　"つ",　"て",　"と",　
    "な",　"に",　"ぬ",　"ね",　"の",　"は",　"ひ",　"ふ",　"へ",　"ほ",　"ま",　"み",　"む",　"め",　"も",　"や",　"ゆ",　"よ",　"ら",　"り",　"る",　
    "れ",　"ろ",　"わ",　"を",　"ん"]
const j50_Katakana = ["あ", "い", "う",　"え",　"お",　"か",　"き",　"く",　"け",　"こ",　"さ",　"し",　"す",　"せ",　"そ",　"た",　"ち",　"つ",　"て",　"と",　
    "な",　"に",　"ぬ",　"ね",　"の",　"は",　"ひ",　"ふ",　"へ",　"ほ",　"ま",　"み",　"む",　"め",　"も",　"や",　"ゆ",　"よ",　"ら",　"り",　"る",　
    "れ",　"ろ",　"わ",　"を",　"ん"]
const j50_sound = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to", "na", 
    "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", 
    "wo", "n"]

// 決定題目
let r = Math.floor(Math.random() * 46)
let q = j50_Hiragana[r]
$("#que").text(j50_Hiragana[r])

// 決定選項
const c = []
const s = []
const choice = [j50_sound[r]]

// 計分

$( document ).ready(function() {

// 決定除正確答案外的其他選項
while (s.length < 3){
    let a = Math.floor(Math.random() * 46)
    if (a in s){
    }else if (a != r){
        s.unshift(a)
    }
}

// 隨機決定答案的放置位置
while (c.length < 4){
    let a = Math.floor(Math.random() * 4)
    if (c.includes(a)){
    }
    else {
        c.unshift(a)
    }
}

// 決定選項列
choice.splice(1, 0, j50_sound[s[0]], j50_sound[s[1]], j50_sound[s[2]])

// 將答案依序輸出到按鈕上
for (let i = 0; i < 4; i++){
    switch(i){
        case 0:
            $("#btn1").text(choice[c[i]])
            break;
        case 1:
            $("#btn2").text(choice[c[i]])
            break;
        case 2:
            $("#btn3").text(choice[c[i]])
            break;
        case 3:
            $("#btn4").text(choice[c[i]])
            break;
    }
}

// 確認選取選項是否為正確
let ans = c.indexOf(0) + 1

switch(ans){
    case 1:
        $("#btn1").click(function () {
            $("#btn1").css("background", "#33ff99");
        });
        $("#btn2").click(function () {
            $("#btn2").css("background", "#ff4d4d");
            $("#btn1").css("background", "#33ff99");
        });
        $("#btn3").click(function () {
            $("#btn3").css("background", "#ff4d4d");
            $("#btn1").css("background", "#33ff99");
        });
        $("#btn4").click(function () {
            $("#btn4").css("background", "#ff4d4d");
            $("#btn1").css("background", "#33ff99");
        });
        break;
    case 2:
        $("#btn1").click(function () {
            $("#btn1").css("background", "#ff4d4d");
            $("#btn2").css("background", "#33ff99");
        });
        $("#btn2").click(function () {
            $("#btn2").css("background", "#33ff99");
        });
        $("#btn3").click(function () {
            $("#btn3").css("background", "#ff4d4d");
            $("#btn2").css("background", "#33ff99");
        });
        $("#btn4").click(function () {
            $("#btn4").css("background", "#ff4d4d");
            $("#btn2").css("background", "#33ff99");
        });
        break;
    case 3:
        $("#btn1").click(function () {
            $("#btn1").css("background", "#ff4d4d");
            $("#btn3").css("background", "#33ff99");
        });
        $("#btn2").click(function () {
            $("#btn2").css("background", "#ff4d4d");
            $("#btn3").css("background", "#33ff99");
        });
        $("#btn3").click(function () {
            $("#btn3").css("background", "#33ff99");
        });
        $("#btn4").click(function () {
            $("#btn4").css("background", "#ff4d4d");
            $("#btn3").css("background", "#33ff99");
        });
        break;
    case 4:
        $("#btn1").click(function () {
            $("#btn1").css("background", "#ff4d4d");
            $("#btn4").css("background", "#33ff99");
        });
        $("#btn2").click(function () {
            $("#btn2").css("background", "#ff4d4d");
            $("#btn4").css("background", "#33ff99");
        });
        $("#btn3").click(function () {
            $("#btn3").css("background", "#ff4d4d");
            $("#btn4").css("background", "#33ff99");
        });
        $("#btn4").click(function () {
            $("#btn4").css("background", "#33ff99");
        });
        break;
}
});
