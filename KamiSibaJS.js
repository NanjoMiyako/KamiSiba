var currentSpeech = null;
var currentIdx = 1
var SecOfOneLine = 5

var g_TextData = []
var g_LineNumberAndImageData =[]
var TextDataImportFlg = false
var LineNumberAndImageDataImportFlg = false

DisplayDataImportFlg();
function Play(){
	currentIdx = Number(document.getElementById("startLineNumber").value);
	SecOfOneLine = Number(document.getElementById("PlaySecondOfOneLine").value);
	
	Play2(currentIdx-1)

}

function Play2(LineNo){
	ChangeImg(LineNo)
	line1 = g_TextData[LineNo]
	span1 = document.getElementById("CurrentText");
	span1.innerHTML = line1
	speak(line1)
	if(LineNo+1 < g_TextData.length){
		setTimeout(function(){Play2((LineNo+1))}, SecOfOneLine * 1000);
	}
}

function ChangeImg(LineNo){
	var num1, imgURL
	for(var i=0; i<g_LineNumberAndImageData.length; i++){
		num1 = g_LineNumberAndImageData[i].split(',')[0]
		if(num1 == (LineNo+1)){
			imgURL = g_LineNumberAndImageData[i].split(',')[1]
			DrawImg(imgURL)
		}
	
	}
}

function DrawImg(imgURL){
	divElem = document.getElementById("ImgDiv");
	divElem.innerHTML = '';
	ImgElem = document.createElement('img');

	ImgElem.src = imgURL
	divElem.appendChild(ImgElem);
}

function speak(text1){
  currentSpeech = new SpeechSynthesisUtterance(text1);
  speechSynthesis.speak( currentSpeech );
}


function pause(){
 speechSynthesis.pause(currentSpeech);
}

function resume(){
 speechSynthesis.resume(currentSpeech);
}

function cancel(){
 speechSynthesis.cancel(currentSpeech)
}



function ImportTextData(){
      var fileRef = document.getElementById('fileOfText');
	  var content;
	  
      if (1 <= fileRef.files.length) {
			var reader = new FileReader();
			//ファイル読み出し完了後の処理を記述
			reader.onload = function (theFile) {
			var content = theFile.target.result;
			g_TextData = content.split(/\n/);
			TextDataImportFlg = true;
			DisplayDataImportFlg();
        }

		//ファイル読み出し
        reader.readAsText(fileRef.files[0], "utf-8");

      }
}

var g_reader = new FileReader();
var g_File;
var fileElem = document.getElementById("fileOfText");
fileElem.onchange = function(event) {
    g_File = event.target.files[0];
};


function ImportLineNumberAndImageData(){
      var fileRef = document.getElementById('fileOfLineNumberAndImage');
	  var content;
	  
      if (1 <= fileRef.files.length) {
			var reader2 = new FileReader();
			//ファイル読み出し完了後の処理を記述
			reader2.onload = function (theFile) {
			var content = theFile.target.result;
			g_LineNumberAndImageData = content.split(/\n/);
			LineNumberAndImageDataImportFlg = true;
			DisplayDataImportFlg();
        }

		//ファイル読み出し
        reader2.readAsText(fileRef.files[0], "utf-8");

      }
}

var g_reader2 = new FileReader();
var g_File;
var fileElem = document.getElementById("fileOfLineNumberAndImage");
fileElem.onchange = function(event) {
    g_File = event.target.files[0];
};



function DisplayDataImportFlg(){
	var spanElem;
	
	spanElem = document.getElementById("ImportTextDataFlgSpan");
	if(TextDataImportFlg == true){
		spanElem.innerHTML = "読み上げテキストデータ：インポート済み"
	}else{
		spanElem.innerHTML = "読み上げテキストデータ：インポート未完了"
	}
	
	spanElem = document.getElementById("ImportLineNumberAndImageDataFlgSpan");
	if(LineNumberAndImageDataImportFlg == true){
		spanElem.innerHTML = "行別画像リストデータ：インポート済み"
	}else{
		spanElem.innerHTML = "行別画像リストデータ：インポート未完了"
	}	
}
