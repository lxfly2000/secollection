//页面启动时加载
function OnLoad(){
    LoadSettings();
    LoadHistory();
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
    //先看是否有参数
    var m=location.search.match(/se=(.*)&?/);
    //Cookie是一种用等号和分号记录的字符串数据
    //[key]=[value](;[key]=[value];...)
    if(m==null){
        m=document.cookie.match(/se=(.*);?/);
    }
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

function LoadHistory(){
    //检查是否有记录
    var m=document.cookie.match(/qh=(.*);?/);
    //有则显示无则隐藏
    if(m==null){
        divHistory.style.display="none";
    }else{
        divHistory.style.display="";
        var entries=m[1].split(",");
        for(var i=0;i<entries.length;i++){
            if(i==0){
                linksHistory.innerHTML=" ";
            }else{
                linksHistory.innerHTML+=" ";
            }
            linksHistory.innerHTML+="<a href='javascript:SearchKeywords(\""+decodeURIComponent(entries[i])+"\")'>"+decodeURIComponent(entries[i])+"</a>";
        }
    }
}

//保存设置
function SaveSettings(se){
    document.cookie.replace(/se=(.*);?/,"");
    var entry="se="+se;
    if(document.cookie.length>0&&!document.cookie.endsWith(";")){
        document.cookie=document.cookie+";";
    }
    document.cookie=document.cookie+entry;
}

function AddHistory(q){
    var encoded_query=encodeURIComponent(q);
    var histories=[];
    var match_histories=document.cookie.match(/qh=(.*);?/);
    if(match_histories!=null){
        histories=match_histories[1].split(",");
    }
    //加入一个记录
    histories.splice(0,0,encoded_query);
    document.cookie.replace(/qh=(.*);?/,"");
    document.cookie=document.cookie+"qh="+histories[0];
    for(var i=1;i<Math.min(histories.length,10);i++){
        document.cookie=document.cookie+","+histories[i];
    }
    LoadHistory();
}

function ClearHistory(){
    document.cookie.replace(/qh=(.*);?/,"");
    LoadHistory();
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
    AddHistory(textQuery.value);
    location.href=se.replace("{query}",encodeURIComponent(textQuery.value));
}

function SearchKeywords(k){
    var se=GetSearchEngine();
    SaveSettings(se);
    location.href=se.replace("{query}",encodeURIComponent(k));
}