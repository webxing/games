;window.onload = function(){
	//获取节点
	var oprate = $$("oprate");
	var sel = oprate.children[0];
	var btn = oprate.children[1];
	var span = oprate.children[2].children[0];
	var imgs = $$("imgs");
	function $$(idName){
		return document.getElementById(idName);
	}	

	var level,data,count,randPic;
	//加载函数
	function load(level){
		//console.log(data);
		imgs.innerHTML = (data +'').replace(/(\d+)\D*/g,`<div><img src="./${level}/${randPic}/$1.gif" index="$1" /></div>`);
		if(data.length){
			//把和(\d+)\D匹配的所有结果替换成<div>$1</div>，其中$1是括号里的内容\d+
			imgs.children[data.indexOf(Math.pow(level,2))].innerHTML = '';
		}
	}
	//随机数据
	function randDate(n){
		var randDigits=[];
		var max = Math.pow(n,2)-1;
		while(randDigits.length < max){
			var num = Math.floor( Math.random()*max +1 );
			if(randDigits.indexOf(num) == -1){
				randDigits.push(num);
			}
		}
		randDigits.push(max+1);
		return randDigits;

	}
	//校验数据
	function rightData(level){
		let str = '';
		for(let i=1,len=Math.pow(level,2);i<=len;i++){
			str += i;
		}
		return str;
	}
	//success
	function success(){
		span.innerHTML = count;
		if(data.join('') == rightData(level)){
			setTimeout(()=>(alert("通关了！！")),2);
			btn.innerHTML = "开始游戏";
			data=[];
			load(level);
			imgs.style.display = 'none';
			count=0;
		}
	}


	btn.onclick = function(){
		randPic =Math.floor( Math.random()*3)+1;
		this.innerHTML = "重玩";
		if(this.innerHTML == "重玩"){
			count=0;
			span.innerHTML = count;
		}
		level = parseInt(sel.value);
		//data = randDate(level);
		//console.log(data);
		imgs.style.width = level*120+'px';
		imgs.style.height = level*120+'px';
		imgs.style.display = "block";
		data = randDate(level);
		load(level);
		count=0;
		//键盘控制移动
		document.onkeydown = function(e){
			var e = e || window.event;
			var kc = e.keyCode;
			var nullPos = data.indexOf(Math.pow(level,2));
			switch(kc){
				case 37: 
					var replacePos = nullPos+1;
					if((nullPos+1)%level ==0) return;
					data[nullPos] = data[replacePos];
					data[replacePos] = Math.pow(level,2);
					load(level);
					count++;
					break;
				case 38:
					var replacePos = nullPos+level;
					if(replacePos >= Math.pow(level,2)) return;
					data[nullPos] = data[replacePos];
					data[replacePos] = Math.pow(level,2);
					load(level);
					count++;
					break;
				case 39:
					var replacePos = nullPos-1;
					if(nullPos%level ==0) return;
					data[nullPos] = data[replacePos];
					data[replacePos] = Math.pow(level,2);
					load(level);
					count++;
					break;
				case 40:
					var replacePos = nullPos-level;
					if(replacePos<0) return;
					data[nullPos] = data[replacePos];
					data[replacePos] = Math.pow(level,2);
					load(level);
					count++;
					break;
				defalut:break;
			}
			success();
		}

	}

	//事件委托，点击切换
	imgs.onclick = function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		console.log(target)
		var clickPos = data.indexOf(parseInt(target.getAttribute("index")));
		var nullPos = data.indexOf(Math.pow(level,2));
		var dis = Math.abs(nullPos-clickPos);
		if(dis==level ||dis==1){
			var condition = nullPos%level==0&&(clickPos+1)%level==0 || clickPos%level==0&&(nullPos+1)%level==0 || nullPos==clickPos;
			if(!condition){
				data[nullPos] = data[clickPos];
				data[clickPos] = Math.pow(level,2);
				load(level);
				count++;
				success();
			}
		}
	}
	
}
