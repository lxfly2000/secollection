//页面启动时加载
function OnLoad(){
    LoadSettings();
    document.onkeypress=function(e){
        var keycode=document.all?event.keycode:e.which;
        if(keycode===13){
            GoSearch();
            return false;
        }
    };
}

//加载设置
function LoadSettings(){
    //Cookie是一种用等号和分号记录的字符串数据
    //[key]=[value](;[key]=[value];...)
    var m=document.cookie.match(/se=(.*);?/);
    var doms=document.getElementsByName("se");
    if(m==null){
        doms[0].checked=true;
        return;
    }
    var se=m[1];
    for(var i=0;i<doms.length;i++){
        doms[i].checked=doms[i].value===se;
    }
}

//保存设置
function SaveSettings(se){
    document.cookie="se="+se;
}

function GetSearchEngine(){
    var doms=document.getElementsByName("se");
    for(var i=0;i<doms.length;i++){
        if(doms[i].checked){
            return doms[i].value;
        }
    }
    return "";
}

//搜索
function GoSearch(){
    var se=GetSearchEngine();
    SaveSettings(se);
    location.href=se.replace("{query}",textQuery.value);
}
