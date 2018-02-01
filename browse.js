var target_url = [], page_txt = "", html = "", embed_url = "", embed_key = "", embed_json = "", target_url_list = "", i = 0, j = 0;
var objStream = WScript.CreateObject("ADODB.Stream");
var objStream2 = WScript.CreateObject("ADODB.Stream");
objStream.Charset = "Shift_JIS";
objStream2.Charset = "Shift_JIS";

objStream.Open;
objStream.LoadFromFile(WScript.Arguments.Unnamed(0));
target_url_list = objStream.ReadText(-1);
objStream.Close;
target_url_list = target_url_list.split(/(\n|\r|\r\n)/);

objStream2.Open;

for(j=0;j<target_url_list.length;j++){
	WScript.Echo(target_url_list[j]);
	page_txt = get_page_txt(target_url_list[j]);
	target_url = target_url.concat(page_txt.match(/href=\"http\:\/\/www\.anitube\.se\/video\/[^\"]*\">/g));
}
for(i=0;i<target_url.length;i++){
 	target_url[i] = target_url[i].replace(/(href=|\"|>)/g, "");
 	temp = target_url[i].split("/");
 	temp2 = temp[temp.length - 1];
 	temp[temp.length - 1] = temp[temp.length - 2];
 	temp[temp.length - 2] = temp2;
 	target_url[i] = temp.join("/");
}
target_url.sort();
for(i=0;i<target_url.length;i++){
 	temp = target_url[i].split("/");
 	temp2 = temp[temp.length - 1];
 	temp[temp.length - 1] = temp[temp.length - 2];
 	temp[temp.length - 2] = temp2;
 	target_url[i] = temp.join("/");
}
WScript.Echo(target_url);
WScript.Quit();
for(i=0;i<target_url.length;i++){
	objStream.Open;
	WScript.Echo(target_url[i]);
	page_txt = get_page_txt( target_url[i] );	
	html = WScript.CreateObject("htmlfile");
	html.write(page_txt);
	embedform = html.getElementById("embedForm");
	embed_url = embedform.innerText.match(/src=\"http\:\/\/www\.anitube\.se\/embed\/(.*)\" frame/)[1];
	embed_key = get_page_txt( "http\://www.anitube.se/player/config.php?key=" + embed_url );
	embed_json = embed_key.match(/file\: \"(.*_hd.*)\",/);
	if( embed_json == null ){
		embed_json = embed_key.match(/file\: \"(.*)\",/)[1];
	} else {
		embed_json = embed_json[1];
	}
	WScript.Echo(embed_json);
	objStream2.WriteText(embed_json, 1);
	objStream.Close;
}
var hiduke = new Date(); 
var year = hiduke.getFullYear();
var month = hiduke.getMonth()+1;
var day = hiduke.getDate();
var hour = hiduke.getHours();
var minute = hiduke.getMinutes();
var second = hiduke.getSeconds();
objStream2.SaveToFile("a" + year + month + day + hour + minute + second + ".m3u", 2);
WScript.Quit();


// ---------- 関数 ----------

function get_page_txt( target_url )
{
	var xhr = WScript.CreateObject("MSXML2.ServerXMLHTTP");
	xhr.open("GET", target_url, false);
	xhr.send();
	return xhr.responseText;
}

function compareNo(a, b){
	a = a.split(/( |-)/);
	b = b.split(/( |-)/);
	for(i=0;i<a.length;i++){
		
	}
	WScript.Echo(a);
	WScript.Echo(b);
	a = a[a.length - 1];
	b = b[b.length - 1];
	WScript.Echo(a);
	WScript.Echo(b);
	a = parseInt(a, 10);
	b = parseInt(b, 10);
	WScript.Echo(a);
	WScript.Echo(b);
	return a - b;
}
