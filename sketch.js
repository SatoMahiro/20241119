//畫心形的陣列資料=========================================
let points=[[0,7],[-3,9],[-6,9],[-9,6],[-9,2],[-6,-3],[0,-9],[6,-3],[9,2],[9,6],[6,9],[3,9],[0,7]]
let heart_w //宣告一個變數為全域變數
let heart_pos=[]//心放在某個位置
let heart_size=[]//大小
var colors = "ff595e-ffca3a-8ac926-1982c4-6a4c93".split("-").map(a=>"#"+a)

let heart_color=[]
//畫魚的陣列===============================================
let fish_points=[[3,7],[-3,5],[-6,2],[-6,1],
[-5,-1],[-4,-2],[-2,-3],[2,-6],[0,-3],
[6,0],[8,-1],[8,4],[6,2],[5,2],[4,3],[2,4],[1,5]]
let fish_head_points=[[-3,5],[-6,2],[-6,1],
[-5,-1],[-4,-2],[-2,0],[-2,2]]

let fish_w//宣告一個變數為全域變數
//========================================================
let sound;  //載入的音樂檔案
let amplitude;  //設定振幅值
let diameter
function preload() {
  sound = loadSound('media/midnight-quirk-255361.mp3'); // 替換成你的音訊檔名
  
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220)
  //sound.play();
  amplitude = new p5.Amplitude(); //設定一個變數，取得音樂振幅
  amplitude.setInput(sound); //以sound音樂當作樣本取得振幅
  for(let i=0;i<20;i=i+1){
  heart_pos.push([random(10,width),random(10,height)])
  heart_size.push(random(0.1,1.25))
  heart_color.push(colors[i%colors.length])  //亂數抽顏色放置heart_color陣列內
}
}
function draw() {
  background(220);
  fill(255,0,0)  //設定描點充滿顏色
  strokeWeight(10)  //線條的粗細
  noStroke
  // 取得振幅值，範圍為 0 到 1
  let level = amplitude.getLevel();
  heart_w = map(level,0,1,10,50)   //放大倍率，取得level的值0~1之間，呼應10~50對應區間，例如0.5對應在30
  push()
    translate(width/2,height/2)  //把原點移到視窗的中間
    scale(1,-1)
    fish_w = 40 //設定畫魚的倍率40
    draw_fish()
  pop()
  //畫心形
  for(let i=0;i<heart_pos.length;i=i+1){
  push()
   translate(heart_pos[i][0],heart_pos[i][1]) //
   scale(heart_size[i],-heart_size[i])
   draw_heart()
   fill(heart_color[i])  //充滿顏色
  pop()
 }
}
//畫心形
function draw_heart(){
  beginShape()
  // 畫愛心 
  for(let i=0;i<points.length;i=i+1)
  {
    curveVertex(points[i][0]*heart_w,points[i][1]*heart_w)
  }
  
endShape(CLOSE)  
}
//畫魚形
function draw_fish(){
  beginShape()
  //畫魚身
  for(let i=0;i<fish_points.length;i=i+1)
  {
    curveVertex(fish_points[i][0]*fish_w,fish_points[i][1]*fish_w)
  }

endShape(CLOSE)
fill(220)
beginShape()
  //畫魚頭
  for(let i=0;i<fish_head_points.length;i=i+1)
  {
    curveVertex(fish_head_points[i][0]*fish_w,fish_head_points[i][1]*fish_w)
  } 
  endShape(CLOSE)
}
//利用滑鼠按鈕按下滑鼠，音樂撥放時就暫停撥放，音樂暫停時按下滑鼠就會崩放
function mousePressed() { //當滑鼠按下時
  if (sound.isPlaying()) { //判斷音樂檔案正在撥放與否?
    sound.pause(); //音樂暫停
  } else {
    sound.play(); //撥放
  }
}