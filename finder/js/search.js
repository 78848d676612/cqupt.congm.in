var students = [],
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
        url: "https://blues.congm.in/stu.php?searchKey=" + key,
        success: function(res){
            var count = res.total;
            if(count){
                students = res.rows;
                for(var i = 0; i < count; i++){
                    htmls += '<tr data-id="' + i + '"><td>' + (i + 1) + '</td><td>' + students[i].xh + '</td><td>' + students[i].xm + '</td><td>' + students[i].xb + '</td><td>' + students[i].zym + '</td><td>' + students[i].yxm + '</td><td>' + students[i].nj + '</td><td>' + students[i].bj + '</td></tr>';
                }
                $(".list-table tbody").html(htmls);
                $(".list").show("fast");
            }
        }
    });
    $(".list-table").on("click", "tr", function(){
        if(!$(this).hasClass("info")){
            var $id = $(".student-id"),
                $img = $(".student-img"),
                $tbody = $(".student-table tbody");
            $id.html("�� ѧ�� - ���� ��");
            $img.attr("src", "");
            $tbody.html("");
            var student = students[$(this).data("id")],
                html = '<tr><td>������' + student.xm + '</td><td>�Ա�' + student.xb + '</td></tr><tr><td>�༶��' + student.bj + '</td><td>רҵ��' + student.zym + '</td></tr><tr><td>�꼶��' + student.nj + '</td><td>ѧԺ��' + student.yxm + '</td></tr><tr><td><button class="btn btn-sm btn-success" href="#" onclick="search(\'' + student.bj + '\')">�ð�ѧ������</button></td><td><a class="btn btn-sm btn-danger" href="https://jwzx.cqupt.congm.in/jwzxtmp/showKebiao.php?type=student&id=' + student.xh + '" target="_blank">���˿α�</a></td></tr>';
            $id.html("��" + student.xh + " - " + student.xm + "��");
            $img.attr("src", "https://jwzx.cqupt.congm.in/showstuPic.php?xh=" + student.xh);
            $tbody.html(html);
            $(".list-table tr").removeClass("active");
            $(this).addClass("active");
            $(".info-box").slideDown("fast");
        }
    });
}
