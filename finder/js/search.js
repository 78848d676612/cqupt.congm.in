var students = [],
    space = /\s/g,// �ո��������ʽ
    integer = new RegExp("[\\u4E00-\\u9FFF]+","g"),//���ֵ�������ʽ
    htmls;
$(".search-input").keydown(function(e){
    if (e.keyCode == 13) {
        $("#search").click();
    }
});
$("#search").click(function(){
    search($(".search-input").val());
});
$(".panel-close").click(function(){
    $(".info-box").slideUp("fast");
});
$(".logo").click(function(){
    $(".info-box").slideUp("fast");
    $(".header").removeClass("top");
    $(".list").hide("fast");
});
function search(key){
    $(".search-input").val(key);
    htmls = '<tr class="info"><th>#</th><th>ѧ��</th><th>����</th><th>�Ա�</th><th>רҵ</th><th>ѧԺ</th><th>�꼶</th><th>�༶</th></tr>';
    $(".header").addClass("top");
    $(".info-box").slideUp("fast");
    $(".list-table tbody").html('<div class="alert alert-warning my-alert">���ڲ�ѯ...</div>');
    $.ajax({
        type: "GET",
        url: "https://blues.congm.in/pubBjStu.php?bj=" + key,
        success: function(res){
            var $res = $(res),
            $table = $($res[2]),
            table = $($table[0]).find("tbody tr td table"),
            tds = $(table).find("td"),
            length = tds.length,
            count = length / 5 - 1,
            deal = function(o){
                return o.innerText.replace(space, "");
            };;
            for(var n = 0; n < count; n++){
                students[n] = {
                    id: deal(tds[5 * n + 5]),
                    name: deal(tds[5 * n + 6]),
                    sex: deal(tds[5 * n + 7]),
                    major: deal(tds[5 * n + 8]),
                    college: deal(tds[5 * n + 9]),
                    grade: '20' + key.substr(-4,2),
                    class: key,
                };
            }
            if(count === 1 && students[0].id === ""){
                next();
            }else{
                for(var i = 0; i < count; i++){
                    var html = '<tr data-id="' + i + '"><td>' + (i + 1) + '</td><td>' + students[i].id + '</td><td>' + students[i].name + '</td><td>' + students[i].sex + '</td><td>' + students[i].major + '</td><td>' + students[i].college + '</td><td>' + students[i].grade + '</td><td>' + students[i].class + '</td></tr>' ;
                    htmls += html;
                }
                $(".list-table tbody").html(htmls);
            }
            $(".list").show("fast");
        }
    });  
    function next(){
        $.ajax({
            type: "GET",
            url: "https://blues.congm.in/pubBjStu.php?searchKey=" + key,
            success: function(res){
                var $res = $(res),
                $table = $($res[3]),
                tds = $table.find("td"),
                length = tds.length,
                count = length / 8 - 1,
                deal = function(o){
                    return o.innerText.replace(space, "");
                };
                for(var n = 0; n < count; n++){
                    students[n] = {
                        id: deal(tds[8 * n + 8]),
                        name: deal(tds[8 * n + 9]),
                        sex: deal(tds[8 * n + 10]),
                        class: deal(tds[8 * n + 11]),
                        major: deal(tds[8 * n + 12]),
                        college: deal(tds[8 * n + 13]),
                        grade: deal(tds[8 * n + 14]),
                    };
                }
                if(count === 1 && students[0].id === ""){
                    $(".list-table tbody").html('<div class="alert alert-warning my-alert">���޴��ˣ�</div>');
                }else if(count > 100){
                    $(".list-table tbody").html('<div class="alert alert-warning my-alert">������̫�������²�ѯ��</div>');
                }else{
                    for(var i = 0; i < count; i++){
                        var html = '<tr data-id="' + i + '"><td>' + (i + 1) + '</td><td>' + students[i].id + '</td><td>' + students[i].name + '</td><td>' + students[i].sex + '</td><td>' + students[i].major + '</td><td>' + students[i].college + '</td><td>' + students[i].grade + '</td><td>' + students[i].class + '</td></tr>' ;
                        htmls += html;
                    }
                    $(".list-table tbody").html(htmls);
                }
                $(".list").show("fast");
            }
        });
    }
    $(".list-table").on("click", "tr", function(){
        if(!$(this).hasClass("info")){
            $(".student-id").html("�� ѧ�� - ���� ��");
            $(".student-img").attr("src", "");
            $(".student-table tbody").html("");

            var student = students[$(this).data("id")],
                html = '<tr><td>ѧ�ţ�' + student.name + '</td><td>�Ա�' + student.sex + '</td></tr><tr><td>�༶��' + student.class + '</td><td>רҵ��' + student.major + '</td></tr><tr><td>�꼶��' + student.grade + '</td><td>ѧԺ��' + student.college + '</td></tr><tr><td><button class="btn btn-success" href="#" onclick="search(\'' + student.class + '\')">�ð�ѧ������</button></td><td><a class="btn btn-danger" href="https://jwzx.cqupt.congm.in/pubStuKebiao.php?xh=' + student.id + '" target="_blank">���˿α�</a></td></tr>';
            $(".student-id").html("��" + student.id + " - " + student.name + "��");
            $(".student-img").attr("src", "https://jwzx.cqupt.congm.in/showstuPic.php?xh=" + student.id.replace(space,''));
            $(".student-table tbody").html(html);
            $(".list-table tr").removeClass("active");
            $(this).addClass("active");
            $(".info-box").slideDown("fast");
        }
    });
}
