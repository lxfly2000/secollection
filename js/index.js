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
    textQuery.focus();
}

//加载设置
function LoadSettings(){
    //先看是否有参数
    var m=location.search.match(/se=(.*)&?/);
    //Cookie是一种用等号和分号记录的字符串数据
    //[key]=[value](;[key]=[value];...)
    var doms=document.getElementsByName("se");
    var se="";
    if(m!=null){
        se=decodeURIComponent(m[1]);
    }else{
        se=localStorage.getItem("se");
        if(se==null){
            doms[0].checked=true;
            return;
        }
    }
    for(var i=0;i<doms.length;i++){
        doms[i].checked=doms[i].value===se;
    }
}

function LoadHistory(){
    //检查是否有记录
    var m=localStorage.getItem("qh");
    //有则显示无则隐藏
    if(m==null){
        divHistory.style.display="none";
    }else{
        divHistory.style.display="";
        var entries=m.split(",");
        for(var i=0;i<entries.length;i++){
            if(i==0){
                linksHistory.innerHTML=" ";
            }else{
                linksHistory.innerHTML+=" ";
            }
            linksHistory.innerHTML+="<a href='javascript:textQuery.value=\""+decodeURIComponent(entries[i])+"\";GoSearch();'>"+decodeURIComponent(entries[i])+"</a>";
        }
    }
}

//保存设置
function SaveSettings(se){
    localStorage.setItem("se",se);
}

function AddHistory(q){
    var encoded_query=encodeURIComponent(q);
    var histories=[];
    var match_histories=localStorage.getItem("qh");
    if(match_histories!=null){
        histories=match_histories.split(",");
    }
    var pos=histories.indexOf(encoded_query);
    if(pos!==-1){
        histories.splice(pos,1);
    }
    //加入一个记录
    histories.splice(0,0,encoded_query);
    var qh=histories[0];
    for(var i=1;i<Math.min(histories.length,10);i++){
        qh=qh+","+histories[i];
    }
    localStorage.setItem("qh",qh);
    LoadHistory();
}

function ClearHistory(){
    localStorage.removeItem("qh");
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
