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
let tn = 0 // tn 為計數用(tn + 1)即為題號
let q = [] // q為題目列，決定n個不重複的平假名題目
while (q.length < n){
    if (q.includes(rq)){
    } else {
        q.push(rq)
    }
    rq = Math.floor(Math.random() * 46)
}
// record 紀錄
let id_list = []
let check_id = []

// 計分
let clicked = 0
let correct = 0
let ans = 0
let c_rate = (Math.round((correct / q.length) * 1000)) / 10 // 計算答對率
answer = []
while (answer.length < n){
    answer.push("")
}
k = []
w = []
player_name = "e"

// 本文
$( document ).ready(function() {

// 把成績顯示區域隱藏起來
$("#choice_result").hide();
$("#score").hide();
$("#back").hide();


const cl = run_question(tn)
ans = cl.indexOf(0) + 1 // 答案位置
// console.info(ans)
// check(ans)
$("#choicebtn :button").click(clickAnswer)

// 當Next被點擊時顯示下一題並更新網頁資訊
$("#btnnext").click(function () {
    $("#correct").text(correct);
    $("#choicebtn :button").removeClass("btn_correct btn_fail")
    // $("#btn1").css("background", "#f0fbff");
    // $("#btn2").css("background", "#f0fbff");
    // $("#btn3").css("background", "#f0fbff");
    // $("#btn4").css("background", "#f0fbff");
    // $("#btn1").off()
    // $("#btn2").off()
    // $("#btn3").off()
    // $("#btn4").off()
    clicked = 0
    tn++
    if (tn == n){
        $("#choice").hide();
        $("#choice_result").show();
        $("#choice_result").addClass("result");
        c_rate = (Math.round((correct / q.length) * 1000)) / 10
        // k用於儲存作答資料
        k = show_result()
    }else{
        const cl = run_question(tn)
        if (tn == n - 1){
            $("#btnnext").text("Show Result >");
        }
        // 確認選取選項是否為正確
        ans = cl.indexOf(0) + 1;
        // console.info(ans)
        // check(ans)
    }

});

// 點選save時顯示彈跳視窗
$("#save").click(function () { 
    $("#input_name").show();
});

// $("#close").click(function () { 
//     $("#input_name").hide();
// });

$("#save_to_data").click(function () { 
    // 把資料寫入localstorage
    let date = (new Date()).toUTCString()
    $("#input_name").hide();
    // debugger
    w = [[c_rate + " %", date], k]
    player_name = $("#name").val();
    sg = JSON.parse(localStorage.getItem(player_name))
    if (sg == undefined){
        localStorage.setItem(player_name, JSON.stringify(w))
    } else if(sg[0].length != sg[1].length){
        localStorage.setItem(player_name, JSON.stringify([sg, w]))
    } else{
        jsan = []
        for (let i = 0; i < sg.length; i++){
            jsan.push(sg[i])
        }
        jsan.push(w)
        localStorage.setItem(player_name, JSON.stringify(jsan))
    }
    
});

// 顯示作答紀錄
$("#record").click(function () {
    $("#choice_result").hide();
    $("#score").show();
    $("#score_detail").hide();
    $("#score").addClass("result");
    // debugger
    $("#delete").hide();
    // console.log(w)
    show_rec()
    $("#score_tbody :input:checkbox").hide();
    // console.log(id_list)
    // 顯示該次回答的詳細資料
    $('#score_tbody :button').click(show_detail)
    $("#restart").show();
});

// 顯示所有ID的作答紀錄
$("#record_all").click(function () {
    $("#choice_result").hide();
    $("#score").show();
    $("#score_detail").hide();
    $("#score").addClass("result");
    // debugger
    $("#delete").hide();
    // console.log(w)
    show_allrec()
    $("#score_tbody :input:checkbox").hide();
    // console.log(id_list)
    // 顯示該次回答的詳細資料
    $('#score_tbody :button').click(show_detail)
    $("#restart").show();
});

// 垃圾桶被點下時顯示checkbox讓使用者選擇要刪除哪些紀錄，並顯示Delete鈕
$("#trash").click(function () { 
    $("#score_tbody :input:checkbox").show();
    $("#delete").show();
    // 顯示詳細資料
    $('#score_tbody :button').click(show_detail)
});

// 點下Delete時執行刪除作業
$("#sure_to_delete").click(function () { 
    // 刪除所選紀錄資料
    // debugger
    json = JSON.parse(localStorage.getItem(player_name))
    $("#score_tbody >tr>td :input:checkbox:checked").each(function(){
        // console.info(this.id)
        delete json[check_id.indexOf(this.id)]
    });
    js = []
    for (b = 0; b < json.length; b++){
        if (json[b] != undefined){
            js.push(json[b])
        }
    }
    localStorage.setItem(player_name, JSON.stringify(js))
    $("#score_tbody > tr").remove();
    show_rec()
    $("#score_tbody :input:checkbox").hide();
    $("#delete").hide();
    // 顯示詳細資料
    $('#score_tbody :button').click(show_detail)
});

// 回前頁
$("#back").click(function () { 
    $("#score_record").show();
    $("#trashcan").hide();
    $("#score_detail").hide();
    $("#score_tbody > tr").remove();
    $("#back").hide();
    show_rec()
    $("#score_tbody :input:checkbox").hide();
    $("#delete").hide();
    // 顯示詳細資料
    $('#score_tbody :button').click(show_detail)
    $("#restart").show();
});

$("#restart").click(function () { 
    // debugger
    restart()
    $("#score_tbody >tr").remove();
});
// 雖然兩者功能相同，但若要用ID selector就要分開寫，因為ID是獨一無二的
$("#restart_").click(function () { 
    // debugger
    restart()
    $("#score_tbody >tr").remove();
});

})

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
    // c 是答案的 index
    return c
}

// 重新開始
function restart(){
    q.splice(0, q.length)
    while (q.length < n){
        if (q.includes(rq)){
        } else {
            q.push(rq)
        }
        rq = Math.floor(Math.random() * 46)
    }
    tn = 0

    clicked = 0
    correct = 0
    answer.splice(0, answer.length)
    while (answer.length < n){
        answer.push("")
    }

    $("#correct").text(correct);
    $("#btnnext").text("Next >");

    $("#choice_result").hide();
    $("#score").hide();
    $("#back").hide();
    $("#choice").show();
    $("#cresult_tbody >tr").remove();

    const cl = run_question(tn)
    ans = cl.indexOf(0) + 1
    
}

// 點擊選項時檢查答案
function clickAnswer(){
    if(clicked==0){
        if(ans == this.id.substr(3,1)){
            $(this).addClass("btn_correct")
            correct++;
        }else{
            $(this).addClass("btn_fail")
            $("#btn"+ans).addClass("btn_correct")
        }
        answer.splice(tn, 1, $(this).text())
        clicked=1
    }
}

// 顯示結果
function show_result(){
    const rec = []
    let e = ""
    for (let i = 0; i < n; i++){
        if (j50_sound.indexOf(answer[i]) == q[i]){
            let j = j50_sound[q[i]]
            e = '<tr><th scope="row">' + (i + 1) + '</th><td>' + 
                    j50_Hiragana[q[i]] + '</td><td>' + j + '</td><td>' + answer[i] + '</td></tr>'
            $("#cresult_tbody").append(e);
            rec.push(e)
        } else{
            let j = j50_sound[q[i]]
            e ='<tr class="table-danger"><th scope="row">' + 
                    (i + 1) + '</th><td>' + j50_Hiragana[q[i]] + '</td><td>' + j + '</td><td>' + answer[i] + '</td></tr>'
            $("#cresult_tbody").append(e);
            rec.push(e)
        }
    }
    e = '<tr><th scope="row"></th><td></td><td></td><td style = "text-align: right">Correct Rate: ' + c_rate + '%</td></tr>'
    $("#cresult_tbody").append(e);
    rec.push(e)
    return rec
}

// 顯示作答紀錄
function show_rec(){
    id_list.splice(0, id_list.length)
    check_id.splice(0, check_id.length)
    // debugger
    json = JSON.parse(localStorage.getItem(player_name))
    if (json[0].length != json[1].length){
        let it = "rec_1"
        let checkid = "checkbox_1"
        let x = '<tr><th scope="row">' + 1 + '</th><td>' + json[0][0] + '</td><td>' + json[0][1] + 
                '</td><td><button type="button" class="btn btn-secondary dtn" id = "' + it + '">Detail</button></td>' + 
                '<td><input class="form-check-input" type="checkbox" value="" id="'+ checkid +'"></input></td></tr>'
        $("#score_tbody").append(x);
        id_list.push(it)
        check_id.push(checkid)
    } else{
        for (let i = 0; i < json.length; i++){
            let it = "rec_" + (i + 1)
            let checkid = "checkbox_" + (i + 1)
            let x = '<tr><th scope="row">' + (i + 1) + '</th><td>' + json[i][0][0] + '</td><td>' + json[i][0][1] + 
                    '</td><td><button type="button" class="btn btn-secondary dtn" id = "' + it + '">Detail</button></td>' + 
                    '<td><input class="form-check-input" type="checkbox" value="" id="'+ checkid +'"></input></td></tr>'
            $("#score_tbody").append(x);
            id_list.push(it)
            check_id.push(checkid)
        }
    }
}

// 顯示所有ID的作答紀錄
function show_allrec(){
    debugger
    key_list = Object.keys(localStorage)
    for (key = 0; key < key_list.length; key++){
        json = JSON.parse(localStorage.getItem(key_list[key]))
        xn = '<tr><th scope="row">Player ID</th><td>' + key_list[key] + '</td><td></td><td></td><td></td></tr>'
        $("#score_tbody").append(xn);
        if (json[0].length != json[1].length){
            let x = '<tr><th scope="row">' + 1 + '</th><td>' + json[0][0] + '</td><td>' + json[0][1] + '</td><td></td><td></td></tr>'
            $("#score_tbody").append(x);
        } else{
            for (let i = 0; i < json.length; i++){
                let x = '<tr><th scope="row">' + (i + 1) + '</th><td>' + json[i][0][0] + '</td><td>' + json[i][0][1] + 
                        '</td><td></td><td></td></tr>'
                $("#score_tbody").append(x);
            }
        }
    }
}

// 顯示該次回答的詳細資料
function show_detail(){
    console.info(this.id)
    json = JSON.parse(localStorage.getItem(player_name))
    if (id_list.includes(this.id)){
        $("#score_record").hide();
        $("#trashcan").hide();
        $("#score_detail").show();
        let v = id_list.indexOf(this.id)
        $("#score_tbody > tr").remove();
        for (let y = 0; y < json[v][1].length; y++){
            $("#score_tbody").append(json[v][1][y]);
        }
        $("#back").show();
        $("#restart").hide();
        $("#delete").hide();
    }
}

// 檢查答案是否正確
// function check(ans){
//     switch(ans){
//         case 1:
//             $("#btn1").click(function () {
//                 if (clicked == 0){
//                     $("#btn1").css("background", "#33ff99");
//                     correct++
//                     answer.splice(tn, 1, $("#btn1").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn2").click(function () {
//                 if (clicked == 0){
//                     $("#btn2").css("background", "#ff4d4d");
//                     $("#btn1").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn2").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn3").click(function () {
//                 if (clicked == 0){
//                     $("#btn3").css("background", "#ff4d4d");
//                     $("#btn1").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn3").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn4").click(function () {
//                 if (clicked == 0){
//                     $("#btn4").css("background", "#ff4d4d");
//                     $("#btn1").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn4").text())
//                     clicked = 1
//                 }
//             });
//             break;
//         case 2:
//             $("#btn1").click(function () {
//                 if (clicked == 0){
//                     $("#btn1").css("background", "#ff4d4d");
//                     $("#btn2").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn1").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn2").click(function () {
//                 if (clicked == 0){
//                     $("#btn2").css("background", "#33ff99");
//                     correct++
//                     answer.splice(tn, 1, $("#btn2").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn3").click(function () {
//                 if (clicked == 0){
//                     $("#btn3").css("background", "#ff4d4d");
//                     $("#btn2").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn3").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn4").click(function () {
//                 if (clicked == 0){
//                     $("#btn4").css("background", "#ff4d4d");
//                     $("#btn2").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn4").text())
//                     clicked = 1
//                 }
//             });
//             break;
//         case 3:
//             $("#btn1").click(function () {
//                 if (clicked == 0){
//                     $("#btn1").css("background", "#ff4d4d");
//                     $("#btn3").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn1").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn2").click(function () {
//                 if (clicked == 0){
//                     $("#btn2").css("background", "#ff4d4d");
//                     $("#btn3").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn2").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn3").click(function () {
//                 if (clicked == 0){
//                     $("#btn3").css("background", "#33ff99");
//                     correct++
//                     answer.splice(tn, 1, $("#btn3").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn4").click(function () {
//                 if (clicked == 0){
//                     $("#btn4").css("background", "#ff4d4d");
//                     $("#btn3").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn4").text())
//                     clicked = 1
//                 }
//             });
//             break;
//         case 4:
//             $("#btn1").click(function () {
//                 if (clicked == 0){
//                     $("#btn1").css("background", "#ff4d4d");
//                     $("#btn4").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn1").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn2").click(function () {
//                 if (clicked == 0){
//                     $("#btn2").css("background", "#ff4d4d");
//                     $("#btn4").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn2").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn3").click(function () {
//                 if (clicked == 0){
//                     $("#btn3").css("background", "#ff4d4d");
//                     $("#btn4").css("background", "#33ff99");
//                     answer.splice(tn, 1, $("#btn3").text())
//                     clicked = 1
//                 }
//             });
//             $("#btn4").click(function () {
//                 if (clicked == 0){
//                     $("#btn4").css("background", "#33ff99");
//                     correct++
//                     answer.splice(tn, 1, $("#btn4").text())
//                     clicked = 1 
//                 }
//             });
//             break;
//     }
//    // $('#btn1').unbind('mouseenter mouseleave');
// }

