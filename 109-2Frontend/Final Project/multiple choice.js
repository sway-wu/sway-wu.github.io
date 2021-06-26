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
let rq = Math.floor(Math.random() * 46)
let n = 20
let tn = 0
let q = []
while (q.length < n){
    if (q.includes(rq)){
    } else {
        q.push(rq)
    }
    rq = Math.floor(Math.random() * 46)
}

// 計分
let clicked = 0
let correct = 0
let c_rate = (Math.round((correct / q.length) * 1000)) / 10
const answer = []

$( document ).ready(function() {

$("table").hide();

const c = run_question(tn)
let ans = c.indexOf(0) + 1
console.log(c, ans)

check(ans)

$("#btnnext").click(function () {
    $("#correct").text(correct);
    $("#btn1").css("background", "#f0fbff");
    $("#btn2").css("background", "#f0fbff");
    $("#btn3").css("background", "#f0fbff");
    $("#btn4").css("background", "#f0fbff");
    $("#btn1").off()
    $("#btn2").off()
    $("#btn3").off()
    $("#btn4").off()
    // $("button").hover(function () {
    //     // over
    //     $("button").css("background", "#b3d1ff");
    //     }, function () {
    //     // out
    //     $("button").css("background", "#f0fbff");
    //     }
    // );
    tn++
    if (tn == n){
        $("#choice").hide();
        $("table").show();
        $("#choice_result").addClass("result");
        c_rate = (Math.round((correct / q.length) * 1000)) / 10
        show_result()
    }else{
        const c = run_question(tn)
        if (tn == n - 1){
            $("#btnnext").text("Show Result >");
        }
        // 確認選取選項是否為正確
        ans = c.indexOf(0) + 1
        clicked = 0
        check(ans)
    }
});


});

// 題目顯示
function run_question(qst_num){
    
    $("#que").text(j50_Hiragana[q[qst_num]])
    $("#question_no").text(qst_num + 1);

    // 決定選項
    const c = []
    const s = []
    const choice = [j50_sound[q[qst_num]]]

    // 決定除正確答案外的其他選項
    while (s.length < 3){
        let a = Math.floor(Math.random() * 46)
        if (s.includes(a)){
        }else if (a != q[qst_num]){
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
                $("#btn1").text(choice[c[0]])
                break;
            case 1:
                $("#btn2").text(choice[c[1]])
                break;
            case 2:
                $("#btn3").text(choice[c[2]])
                break;
            case 3:
                $("#btn4").text(choice[c[3]])
                break;
        }
    }

    return c
}

// 檢查答案是否正確
function check(ans){
    switch(ans){
        case 1:
            $("#btn1").click(function () {
                if (clicked == 0){
                    $("#btn1").css("background", "#33ff99");
                    correct++
                    answer.splice(answer.length, 0, $("#btn1").text())
                    clicked = 1
                }
            });
            $("#btn2").click(function () {
                if (clicked == 0){
                    $("#btn2").css("background", "#ff4d4d");
                    $("#btn1").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn2").text())
                    clicked = 1
                }
            });
            $("#btn3").click(function () {
                if (clicked == 0){
                    $("#btn3").css("background", "#ff4d4d");
                    $("#btn1").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn3").text())
                    clicked = 1
                }
            });
            $("#btn4").click(function () {
                if (clicked == 0){
                    $("#btn4").css("background", "#ff4d4d");
                    $("#btn1").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn4").text())
                    clicked = 1
                }
            });
            break;
        case 2:
            $("#btn1").click(function () {
                if (clicked == 0){
                    $("#btn1").css("background", "#ff4d4d");
                    $("#btn2").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn1").text())
                    clicked = 1
                }
            });
            $("#btn2").click(function () {
                if (clicked == 0){
                    $("#btn2").css("background", "#33ff99");
                    correct++
                    answer.splice(answer.length, 0, $("#btn2").text())
                    clicked = 1
                }
            });
            $("#btn3").click(function () {
                if (clicked == 0){
                    $("#btn3").css("background", "#ff4d4d");
                    $("#btn2").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn3").text())
                    clicked = 1
                }
            });
            $("#btn4").click(function () {
                if (clicked == 0){
                    $("#btn4").css("background", "#ff4d4d");
                    $("#btn2").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn4").text())
                    clicked = 1
                }
            });
            break;
        case 3:
            $("#btn1").click(function () {
                if (clicked == 0){
                    $("#btn1").css("background", "#ff4d4d");
                    $("#btn3").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn1").text())
                    clicked = 1
                }
            });
            $("#btn2").click(function () {
                if (clicked == 0){
                    $("#btn2").css("background", "#ff4d4d");
                    $("#btn3").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn2").text())
                    clicked = 1
                }
            });
            $("#btn3").click(function () {
                if (clicked == 0){
                    $("#btn3").css("background", "#33ff99");
                    correct++
                    answer.splice(answer.length, 0, $("#btn3").text())
                    clicked = 1
                }
            });
            $("#btn4").click(function () {
                if (clicked == 0){
                    $("#btn4").css("background", "#ff4d4d");
                    $("#btn3").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn4").text())
                    clicked = 1
                }
            });
            break;
        case 4:
            $("#btn1").click(function () {
                if (clicked == 0){
                    $("#btn1").css("background", "#ff4d4d");
                    $("#btn4").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn1").text())
                    clicked = 1
                }
            });
            $("#btn2").click(function () {
                if (clicked == 0){
                    $("#btn2").css("background", "#ff4d4d");
                    $("#btn4").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn2").text())
                    clicked = 1
                }
            });
            $("#btn3").click(function () {
                if (clicked == 0){
                    $("#btn3").css("background", "#ff4d4d");
                    $("#btn4").css("background", "#33ff99");
                    answer.splice(answer.length, 0, $("#btn3").text())
                    clicked = 1
                }
            });
            $("#btn4").click(function () {
                if (clicked == 0){
                    $("#btn4").css("background", "#33ff99");
                    correct++
                    answer.splice(answer.length, 0, $("#btn4").text())
                    clicked = 1 
                }
            });
            break;
    }
}

//顯示結果
function show_result(){
    for (let i = 0; i < n; i++){
        if (j50_sound.indexOf(answer[i]) == q[i]){
            let j = j50_sound[q[i]]
            $("tbody").append('<tr><th scope="row">' + (i + 1) + '</th><td>' + j50_Hiragana[q[i]] + '</td><td>' + j + '</td><td>' + answer[i] + '</td></tr>');
        } else{
            let j = j50_sound[q[i]]
            if (answer[i] == undefined || answer[i] == NaN){
                answer[i] = ""
            }
            $("tbody").append('<tr class="table-danger"><th scope="row">' + (i + 1) + '</th><td>' + j50_Hiragana[q[i]] + '</td><td>' + j + '</td><td>' + answer[i] + '</td></tr>');
        }
    }
    $("tbody").append('<tr><th scope="row"></th><td></td><td></td><td style = "text-align: right">Correct Rate: ' + c_rate + '%</td></tr>');
}
