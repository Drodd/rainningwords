// 雨滴数组
let raindrops = [];
// 溅射粒子数组
let splashParticles = [];
// 伞图像
let umbrellaImg;
// 玩家角色
let player;
// 得分
let score = 0;
// 调试模式
let debugMode = false;
// 帧计数器（用于控制更新频率）
let frameCounter = 0;
// 自动性能优化
let autoOptimize = true;
// 目标帧率
const TARGET_FRAMERATE = 50;
// 性能检查间隔（帧数）
const PERFORMANCE_CHECK_INTERVAL = 60;
// 上次性能检查时间
let lastPerformanceCheck = 0;
// 最大背景字符数
const MAX_BG_LETTERS = 200;
// 最小背景字符数
const MIN_BG_LETTERS = 50;

// 暴雨事件控制
let isWhiteStorm = false; // 是否处于暴雨状态
let whiteStormStartTime = 0; // 暴雨开始时间
const WHITE_STORM_DURATION = 2000; // 暴雨持续2秒
let nextWhiteStormTime = 0; // 下一次暴雨时间
const WHITE_STORM_MIN_INTERVAL = 15000; // 最短暴雨间隔15秒
const WHITE_STORM_MAX_INTERVAL = 20000; // 最长暴雨间隔20秒

// 闪电效果控制
let lightningFlashes = []; // 存储闪电效果时间
let isLightningWarning = false; // 是否处于闪电预警阶段
let lightningWarningStartTime = 0; // 闪电预警开始时间
const LIGHTNING_WARNING_DURATION = 3000; // 闪电预警持续3秒

// 背景和雨伞颜色控制
let bgColorStart = [153, 179, 204]; // 初始背景色
let bgColorTarget = [0, 0, 0]; // 暴雨时背景色（黑色）
let bgColorCurrent = [...bgColorStart]; // 当前背景色
let umbrellaColor = [0, 0, 0]; // 雨伞颜色
let colorTransitionProgress = 0; // 颜色过渡进度
const COLOR_TRANSITION_DURATION = 1000; // 颜色过渡持续时间（毫秒）
let isTransitioningIn = false; // 是否正在过渡进入暴雨
let isTransitioningOut = false; // 是否正在过渡退出暴雨
let transitionStartTime = 0; // 过渡开始时间

// 新增暴雨阶段控制
let stormPhase = 0; // 0=无暴雨, 1=预警等待空闲, 2=已刷出白色短句等待空闲, 3=恢复正常
let isStormPaused = false; // 是否暂停正常短句刷新

// 富有诗意的短句库
const sentences = [
  "你说话可以再简洁一些",
  "这个想法需要更多实际依据",
  "你准备的内容有点冗长",
  "你说话语速有点快",
  "这个点子细节还不够完善",
  "你的思考方式有待拓展",
  "这次准备得很充分",
  "你的时间安排需要改进",
  "你在群体中可以多发言",
  "这个问题你想得不够深入",
  "你处理分歧时情绪不够稳定",
  "你的发音有些地方需要调整",
  "这件事你可以更有主见",
  "你的建议可以更具体一些",
  "你今天的穿着不太合适",
  "你的做事方式不够条理",
  "这个办法不够全面",
  "你说话有时太直接了",
  "你与人交流可以更热情些",
  "你分析问题缺少重要角度",
  "你给的意见太笼统了",
  "你做事容易分心",
  "这方面知识你需要更新了",
  "你对小细节不够留意",
  "你遇到变化时适应较慢",
  "你没考虑到可能的风险",
  "你做事效率可以更高",
  "你对别人的意见可以更开放",
  "你还有很大的提升空间",
  "你的想法可以再开阔些",
  "你说话重点不够突出",
  "你带动大家的能力有限",
  "你学新东西的速度可以更快",
  "这件事完成得不够好",
  "你在聊天时经常走神",
  "你的责任感需要增强",
  "你情绪波动有点大",
  "你应该更主动一些",
  "你做事可以更专注些",
  "你对规则理解有误区",
  "你的行为举止需要注意",
  "你在团队活动中参与度不高",
  "你的想法比较固定",
  "你自律性还不够",
  "你很少从错误中学习",
  "你的计划不够明确",
  "你的手艺还能提高",
  "你待人处事可以更真诚",
  "你分不清事情的轻重缓急",
  "你对未来规划不够清晰"
];

// 偏见短句库（白色，伤害玩家）
const prejudiceSentences = [
  "你太敏感了，一点小事就受不了",
  "就你这水平还想得到认可？",
  "你怎么连这么简单的事都做不好",
  "别人早就完成了，就你磨蹭",
  "你是不是有点智商问题",
  "这么多年了还是老样子",
  "就你这样还想得到赞赏？",
  "你做的这些简直是浪费时间",
  "谁让你自作主张的",
  "你这人怎么总是不长进",
  "我一看就知道你做不好",
  "你还不如那个新来的",
  "你这人真是不知好歹",
  "别人能做到，为什么你不行",
  "你怎么老是让大家失望",
  "你的能力根本配不上你的野心",
  "你的想法太天真幼稚了",
  "你这种做法真是丢人",
  "你平时是不是都不动脑子",
  "你提的建议真是一无是处",
  "我真是高估你了",
  "你难道不知道自己很烦人吗",
  "你这种人永远也得不到认可",
  "你到底行不行啊，别浪费时间了",
  "你怎么做事总是这么拖拉",
  "就你这样还好意思提要求",
  "你根本就不适合做这个",
  "你的表现太令人失望了",
  "你是不是故意找茬",
  "你这人真是不可救药",
  "这点小事都做不好，要你有什么用",
  "是不是所有的事你都要搞砸",
  "看来你根本不在乎别人感受",
  "你的问题太多了，说都说不完",
  "你是怎么混到现在的",
  "你说话做事真是没水平",
  "你这人怎么一点基本素质都没有",
  "你是不是觉得自己很特别",
  "就你这水平还敢发表意见",
  "你这样的人真是让人头疼",
  "你怎么总是理解不了简单的道理",
  "你这种性格怎么会有人喜欢你",
  "你的格局太小了，成不了大事",
  "你简直是在浪费大家时间",
  "你真以为你很重要吗",
  "你脑子里到底在想什么",
  "别以为你懂一点就了不起",
  "你这种人迟早会被孤立",
  "你真是一无是处",
  "你不觉得自己很多余吗"
];

// 英文字母和符号库，用于背景的随机字母效果
const backgroundChars = "abcdefghijklmnopqrstuvwxyz";
// 背景字母数组
let bgLetters = [];
// 背景渲染的分组大小
const BG_BATCH_SIZE = 50;

// 用于跟踪占用的列位置
let occupiedColumns = [];
const COLUMN_WIDTH = 50; // 每列的宽度

function preload() {
  // 创建伞的图形
  createUmbrellaGraphics();
}

// 创建伞的图形
function createUmbrellaGraphics() {
  umbrellaImg = createGraphics(300, 200);
  updateUmbrellaGraphics();
}

// 更新雨伞颜色并重绘
function updateUmbrellaGraphics() {
  umbrellaImg.clear(); // 清除之前的内容
  umbrellaImg.fill(umbrellaColor[0], umbrellaColor[1], umbrellaColor[2]);
  umbrellaImg.noStroke();
  // 绘制伞的半圆形顶部
  umbrellaImg.arc(150, 120, 280, 160, PI, 0, CHORD);
  // 绘制伞柄
  umbrellaImg.rect(145, 120, 10, 80);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 初始化玩家角色
  player = new Player(width / 2, height / 2);
  
  // 初始化背景字母 - 减少数量从500减到200
  initBackgroundLetters(200);
  
  // 初始化占用列数组
  let numColumns = floor(width / COLUMN_WIDTH);
  for (let i = 0; i < numColumns; i++) {
    occupiedColumns[i] = false;
  }
  
  // 初始化一些雨滴，确保它们不在同一列
  for (let i = 0; i < 30; i++) {
    addNewRaindrop();
  }
  
  // 设置文本样式
  textAlign(CENTER, CENTER);
  textSize(16);
  
  // 初始化第一次暴雨时间
  scheduleNextWhiteStorm();
  
  // 初始化玩家大小
  player.updateSize();
}

// 初始化背景字母
function initBackgroundLetters(count) {
  bgLetters = [];
  for (let i = 0; i < count; i++) {
    bgLetters.push({
      x: random(width),
      y: random(height),
      char: backgroundChars.length > 0 ? backgroundChars.charAt(floor(random(backgroundChars.length))) : "",
      size: random(8, 16),
      alpha: random(50, 150),
      speed: random(0.5, 2),
      updateFrequency: floor(random(1, 4)) // 每1-3帧更新一次位置
    });
  }
}

// 动态调整背景字符数量以优化性能
function optimizePerformance() {
  if (!autoOptimize) return;
  
  // 每隔一段时间检查性能
  if (frameCount - lastPerformanceCheck >= PERFORMANCE_CHECK_INTERVAL) {
    lastPerformanceCheck = frameCount;
    
    const currentFrameRate = frameRate();
    
    // 如果帧率低于目标，减少背景字符
    if (currentFrameRate < TARGET_FRAMERATE * 0.8 && bgLetters.length > MIN_BG_LETTERS) {
      const reduction = Math.ceil(bgLetters.length * 0.1); // 减少10%
      bgLetters.splice(bgLetters.length - reduction, reduction);
      console.log(`性能优化: 减少${reduction}个字符，当前帧率${currentFrameRate.toFixed(1)}`);
    }
    // 如果帧率高于目标且字符数量少于最大值，增加背景字符
    else if (currentFrameRate > TARGET_FRAMERATE * 1.2 && bgLetters.length < MAX_BG_LETTERS) {
      const addition = Math.ceil(bgLetters.length * 0.1); // 增加10%
      const newCount = Math.min(bgLetters.length + addition, MAX_BG_LETTERS);
      const toAdd = newCount - bgLetters.length;
      
      for (let i = 0; i < toAdd; i++) {
        bgLetters.push({
          x: random(width),
          y: random(height),
          char: backgroundChars.length > 0 ? backgroundChars.charAt(floor(random(backgroundChars.length))) : "",
          size: random(8, 16),
          alpha: random(50, 150),
          speed: random(0.5, 2),
          updateFrequency: floor(random(1, 4))
        });
      }
      console.log(`性能优化: 增加${toAdd}个字符，当前帧率${currentFrameRate.toFixed(1)}`);
    }
  }
}

// 添加新雨滴，确保不与现有雨滴重叠
function addNewRaindrop() {
  // 如果正处于暴雨暂停状态，不添加新雨滴
  if (isStormPaused) {
    return;
  }
  
  let columnIndex;
  let attempts = 0;
  const maxAttempts = 50; // 防止无限循环
  
  do {
    columnIndex = floor(random(occupiedColumns.length));
    attempts++;
    if (attempts > maxAttempts) break; // 防止无限循环
  } while (occupiedColumns[columnIndex]);
  
  if (attempts <= maxAttempts) {
    occupiedColumns[columnIndex] = true;
    
    // 检查是否需要确保垂直间距
    let verticalSpacing = checkColumnVerticalSpace(columnIndex);
    
    // 根据是否处于暴雨状态决定是否强制生成白色短句
    let newRaindrop = new Raindrop(columnIndex * COLUMN_WIDTH + COLUMN_WIDTH / 2, isWhiteStorm, verticalSpacing);
    raindrops.push(newRaindrop);
  }
}

// 检查指定列的垂直空间，并返回合适的起始Y位置
function checkColumnVerticalSpace(columnIndex) {
  let verticalSpacing = random(-300, -100); // 默认的起始高度范围
  
  // 检查该列中已有的雨滴位置
  for (let raindrop of raindrops) {
    if (raindrop.columnIndex === columnIndex) {
      // 如果已有的雨滴在屏幕顶部区域，确保新雨滴与其保持距离
      if (raindrop.y < 0) {
        // 设置新雨滴的起始位置更高，避免重叠
        verticalSpacing = min(verticalSpacing, raindrop.y - 300);
      }
    }
  }
  
  return verticalSpacing;
}

// 调度下一次暴雨事件
function scheduleNextWhiteStorm() {
  // 随机设置下一次暴雨时间
  nextWhiteStormTime = millis() + random(WHITE_STORM_MIN_INTERVAL, WHITE_STORM_MAX_INTERVAL);
  console.log("下一次暴雨预计在 " + ((nextWhiteStormTime - millis()) / 1000).toFixed(1) + " 秒后");
}

// 开始暴雨事件
function startWhiteStorm() {
  // 先启动闪电预警
  isLightningWarning = true;
  lightningWarningStartTime = millis();
  
  // 生成随机的闪电时间
  lightningFlashes = [];
  const numFlashes = random(5, 10); // 5-10次闪电
  for (let i = 0; i < numFlashes; i++) {
    // 随机时间，但保证分布在整个闪电预警持续时间内
    lightningFlashes.push({
      time: random(LIGHTNING_WARNING_DURATION * 0.1, LIGHTNING_WARNING_DURATION * 0.9),
      duration: random(50, 200) // 闪电持续50-200毫秒
    });
  }
  
  // 暂停正常短句刷新
  isStormPaused = true;
  
  console.log("闪电预警开始，即将进入暴雨状态");
}

// 检查所有列是否空闲
function areAllColumnsEmpty() {
  return !occupiedColumns.some(col => col === true);
}

// 在所有空闲列添加白色短句
function fillAllColumnsWithWhite() {
  // 确保所有列都是空闲的
  if (!areAllColumnsEmpty()) {
    console.log("等待所有列空闲");
    return false; // 未完成填充
  }
  
  // 遍历所有列，每列都添加一个白色短句
  for (let i = 0; i < occupiedColumns.length; i++) {
    occupiedColumns[i] = true;
    
    // 检查列的垂直空间
    let verticalSpacing = checkColumnVerticalSpace(i);
    
    // 添加新的白色短句
    let newRaindrop = new Raindrop(i * COLUMN_WIDTH + COLUMN_WIDTH / 2, true, verticalSpacing);
    raindrops.push(newRaindrop);
  }
  
  console.log("已在所有列填充白色短句");
  return true; // 完成填充
}

function draw() {
  // 增加帧计数
  frameCounter = (frameCounter + 1) % 60; // 循环计数0-59
  
  // 动态调整性能
  optimizePerformance();
  
  // 更新暴雨状态
  updateWhiteStormStatus();
  
  // 绘制背景
  if (isWhiteStorm || isTransitioningIn || isTransitioningOut) {
    // 使用当前过渡颜色
    background(bgColorCurrent[0], bgColorCurrent[1], bgColorCurrent[2]);
  } else {
    // 正常背景
    background(153, 179, 204); // 与图片中的浅蓝色背景匹配
  }
  
  // 绘制背景字母 - 使用分批处理优化
  if (backgroundChars.length > 0) {
    drawBackgroundLetters();
  }
  
  // 显示得分 - 在背景层之后，雨滴之前
  displayScore();
  
  // 检查游戏是否结束（HP为0）
  if (player.hp <= 0) {
    // 显示游戏结束信息
    textAlign(CENTER, CENTER);
    textSize(42);
    fill(255, 255, 255);
    text("游戏结束", width/2, height/2 - 30);
    textSize(24);
    text("得分: " + score, width/2, height/2 + 30);
    text("按R键重新开始", width/2, height/2 + 70);
    
    // 不再进行其他游戏逻辑
    return;
  }
  
  // 处理闪电预警效果
  if (isLightningWarning) {
    let currentLightningTime = millis() - lightningWarningStartTime;
    
    // 检查是否应该显示闪电
    let isFlashing = false;
    for (let flash of lightningFlashes) {
      if (currentLightningTime >= flash.time && 
          currentLightningTime <= flash.time + flash.duration) {
        isFlashing = true;
        break;
      }
    }
    
    if (isFlashing) {
      // 闪电效果 - 全屏白色
      fill(255, 255, 255, 200);
      noStroke();
      rect(0, 0, width, height);
    }
  }
  // 如果在暴雨状态下，绘制暴雨效果
  else if (isWhiteStorm && !isTransitioningIn && !isTransitioningOut) {
    // 绘制轻微的持续闪烁效果
    let flashIntensity = sin(frameCount * 0.5) * 0.5 + 0.5; // 0-1的闪烁强度
    fill(255, 255, 255, flashIntensity * 20); // 半透明白色覆盖
    noStroke();
    rect(0, 0, width, height);
  }
  
  // 更新和显示雨滴
  for (let i = raindrops.length - 1; i >= 0; i--) {
    // 在暴雨状态下，白色短句下落速度更快
    if (isWhiteStorm && raindrops[i].isPrejudice) {
      raindrops[i].speed *= 1.005; // 略微增加速度，产生加速效果
    }
    
    raindrops[i].update();
    raindrops[i].display();
    
    // 检查短句的每个字符是否到达底部
    if (raindrops[i].checkSplashChars()) {
      // 如果所有字符都已经飞溅或被吸收，则释放该列并创建新雨滴
      if (raindrops[i].allCharsSplashed()) {
        occupiedColumns[raindrops[i].columnIndex] = false;
        raindrops.splice(i, 1);
        addNewRaindrop();
        continue; // 跳过后面的代码，避免对已删除的雨滴进行操作
      }
    }
    
    // 检查玩家是否吸收了雨滴中的字符
    if (player.active) {
      if (player.checkAbsorption(raindrops[i])) {
        // 如果全部字符被吸收，检查是否需要释放该列
        if (raindrops[i].allCharsSplashed()) {
          occupiedColumns[raindrops[i].columnIndex] = false;
          raindrops.splice(i, 1);
          addNewRaindrop();
          continue; // 跳过后面的代码，避免对已删除的雨滴进行操作
        }
      }
    }
  }
  
  // 更新和显示溅射粒子
  for (let i = splashParticles.length - 1; i >= 0; i--) {
    splashParticles[i].update();
    splashParticles[i].display();
    
    // 移除已经完成生命周期的溅射粒子
    if (splashParticles[i].isDead()) {
      splashParticles.splice(i, 1);
    }
  }
  
  // 在底部中央绘制伞
  let umbrellaScale = min(width, height) * 0.002;
  let umbrellaX = width / 2 - (umbrellaImg.width * umbrellaScale) / 2;
  let umbrellaY = height - (umbrellaImg.height * umbrellaScale);
  
  push();
  translate(umbrellaX, umbrellaY);
  scale(umbrellaScale);
  // 使用当前雨伞颜色
  updateUmbrellaGraphics(); // 更新雨伞颜色
  image(umbrellaImg, 0, 0);
  pop();
  
  // 更新和显示玩家
  player.update();
  player.display();
  
  // 如果在调试模式下，显示更多信息
  if (debugMode) {
    fill(0);
    textSize(16);
    textAlign(LEFT, TOP);
    text("雨滴数量: " + raindrops.length, 20, 50);
    text("占用列数: " + occupiedColumns.filter(col => col).length, 20, 70);
    text("粒子数量: " + splashParticles.length, 20, 90);
    text("氛围字符: " + bgLetters.length, 20, 110);
    text("帧率: " + floor(frameRate()), 20, 130);
    
    // 计算白色短句数量
    let whiteCount = 0;
    for (let drop of raindrops) {
      if (drop.isPrejudice) whiteCount++;
    }
    text("白色短句数: " + whiteCount, 20, 150);
    text("血量: " + player.hp.toFixed(1) + "/" + player.maxHp, 20, 170);
    
    // 显示玩家大小增长信息
    let growthPercent = (score * 0.01 * 100).toFixed(0);
    text("当前大小: +" + growthPercent + "%", 20, 190);
    
    // 显示回血机制信息
    let timeSinceLastDamage = millis() - player.lastDamageTime;
    let healingStatus = timeSinceLastDamage > player.healingDelay ? "回血中" : "冷却中";
    let remainingTime = max(0, (player.healingDelay - timeSinceLastDamage) / 1000);
    text("回血状态: " + healingStatus + (healingStatus === "冷却中" ? " (" + remainingTime.toFixed(1) + "秒)" : ""), 20, 210);
    
    // 显示暴雨事件信息
    if (isWhiteStorm) {
      let stormPhaseText = "";
      switch(stormPhase) {
        case 1: stormPhaseText = "预警等待空闲"; break;
        case 2: stormPhaseText = "等待白色短句结束"; break;
        default: stormPhaseText = "未知阶段";
      }
      
      fill(255, 0, 0);
      text("暴雨事件: 进行中 (" + stormPhaseText + ")", 20, 230);
      fill(0);
    } else {
      let timeToNextStorm = (nextWhiteStormTime - millis()) / 1000;
      timeToNextStorm = max(0, timeToNextStorm); // 确保不显示负数
      text("暴雨事件: 冷却中 (" + timeToNextStorm.toFixed(1) + "秒)", 20, 230);
    }
    
    // 显示深度分布
    let depthCounts = [0, 0, 0, 0, 0]; // 5个深度级别
    for (let raindrop of raindrops) {
      if (!raindrop.isPrejudice) { // 只统计普通短句
        let depthIndex = floor(raindrop.depth * depthCounts.length);
        if (depthIndex >= depthCounts.length) depthIndex = depthCounts.length - 1;
        depthCounts[depthIndex]++;
      }
    }
    let depthText = "深度分布: ";
    for (let i = 0; i < depthCounts.length; i++) {
      depthText += depthCounts[i] + " ";
    }
    text(depthText, 20, 250);
    
    // 显示自动优化状态
    text("自动优化: " + (autoOptimize ? "开启" : "关闭"), 20, 270);
    
    // 显示伤害机制说明
    fill(255, 255, 255);
    text("白色短句：每字 -10 HP", 20, 290);
    fill(0);
    
    // 显示颜色一致性信息
    text("颜色方案: 黑色(普通)，白色(偏见短句)", 20, 310);
    
    // 显示当前暴雨特效状态
    let stateText = "正常";
    if (isLightningWarning) stateText = "闪电预警";
    else if (isTransitioningIn) stateText = "进入暴雨过渡";
    else if (isWhiteStorm) stateText = "暴雨中";
    else if (isTransitioningOut) stateText = "退出暴雨过渡";
    text("特效状态: " + stateText + " (" + colorTransitionProgress.toFixed(2) + ")", 20, 330);
    
    // 显示当前背景和雨伞颜色
    text("背景RGB: " + bgColorCurrent.map(v => Math.round(v)).join(", "), 20, 350);
    text("雨伞RGB: " + umbrellaColor.map(v => Math.round(v)).join(", "), 20, 370);
    
    // 绘制颜色样本
    let sampleY = 390;
    // 普通短句样本
    fill(0, 0, 0, 255);
    rect(20, sampleY, 25, 25);
    text("普通", 60, sampleY + 12);
    
    // 白色短句样本
    fill(255, 255, 255, 255);
    rect(120, sampleY, 25, 25);
    text("偏见", 160, sampleY + 12);
    
    // 恢复绘图状态
    fill(0);
    textAlign(CENTER, CENTER); // 恢复默认对齐
  }
}

// 绘制背景字母的优化方法
function drawBackgroundLetters() {
  // 设置共同属性，减少状态切换
  noStroke();
  textAlign(CENTER, CENTER);
  
  // 分批绘制背景字母以提高性能
  const batchCount = Math.ceil(bgLetters.length / BG_BATCH_SIZE);
  
  for (let batch = 0; batch < batchCount; batch++) {
    const startIdx = batch * BG_BATCH_SIZE;
    const endIdx = Math.min(startIdx + BG_BATCH_SIZE, bgLetters.length);
    
    for (let i = startIdx; i < endIdx; i++) {
      let letter = bgLetters[i];
      
      // 只在特定帧更新位置，减少计算量
      if (frameCounter % letter.updateFrequency === 0) {
        letter.y += letter.speed;
        
        // 如果字母移出屏幕底部，重新放置到顶部
        if (letter.y > height) {
          letter.y = -20;
          letter.x = random(width);
          letter.char = backgroundChars.charAt(floor(random(backgroundChars.length)));
        }
      }
      
      // 根据暴雨状态决定背景字母颜色
      if (isWhiteStorm && colorTransitionProgress > 0.5) {
        // 暴雨状态(黑色背景)下使用白色字母
        fill(255, 255, 255, letter.alpha);
      } else {
        // 正常状态下使用黑色字母
        fill(0, 0, 0, letter.alpha);
      }
      
      textSize(letter.size);
      text(letter.char, letter.x, letter.y);
    }
  }
}

// 显示得分
function displayScore() {
  // 将分数显示在屏幕中央，放在背景层
  push();
  textAlign(CENTER, CENTER);
  
  // 缩小字体大小到原来的50%
  let fontSize = 100; // 原来200的50%
  textSize(fontSize);
  
  // 计算垂直位置 - 移到画面高度的15%处
  let scoreY = height * 0.15; 
  
  // 分数使用半透明白色显示，透明度增加50%
  if (isWhiteStorm && colorTransitionProgress > 0.5) {
    // 在暴雨黑色背景下使用白色显示
    fill(255, 255, 255, 0); // 原来是180，增加50%透明度，即减少alpha值
  } else {
    // 在正常背景下使用白色显示，但更不透明
    fill(255, 255, 255, 50); // 原来是220，增加50%透明度，即减少alpha值
  }
  
  // 只显示纯数字分数，在新位置
  text(score, width / 2, scoreY);
  pop();
}

// 按键事件，用于切换调试模式和自动优化
function keyPressed() {
  if (key === 'd' || key === 'D') {
    debugMode = !debugMode;
  } else if (key === 'o' || key === 'O') {
    autoOptimize = !autoOptimize;
    console.log("自动优化: " + (autoOptimize ? "开启" : "关闭"));
  } else if (key === 'r' || key === 'R') {
    // 重置游戏
    resetGame();
  }
  return false;
}

// 重置游戏
function resetGame() {
  // 重置得分
  score = 0;
  
  // 清空雨滴和溅射粒子
  raindrops = [];
  splashParticles = [];
  
  // 重置玩家位置和血量
  player.x = width / 2;
  player.y = height / 2;
  player.hp = player.maxHp;
  player.absorptionEffect = [];
  player.lastDamageTime = 0; // 重置回血计时器
  
  // 重置玩家大小
  player.updateSize();
  
  // 重置暴雨事件和相关效果
  isWhiteStorm = false;
  isLightningWarning = false;
  stormPhase = 0;
  isStormPaused = false;
  isTransitioningIn = false;
  isTransitioningOut = false;
  colorTransitionProgress = 0;
  bgColorCurrent = [...bgColorStart];
  umbrellaColor = [0, 0, 0]; // 黑色雨伞
  updateUmbrellaGraphics(); // 更新雨伞颜色
  
  // 安排下一次暴雨
  scheduleNextWhiteStorm();
  
  // 重置占用列
  for (let i = 0; i < occupiedColumns.length; i++) {
    occupiedColumns[i] = false;
  }
  
  // 重新初始化雨滴
  for (let i = 0; i < 30; i++) {
    addNewRaindrop();
  }
}

// 鼠标按下事件
function mousePressed() {
  player.checkPressed(mouseX, mouseY);
  return false; // 防止浏览器默认行为
}

// 鼠标拖动事件
function mouseDragged() {
  player.move(mouseX, mouseY);
  return false; // 防止浏览器默认行为
}

// 鼠标释放事件
function mouseReleased() {
  player.released();
  return false; // 防止浏览器默认行为
}

// 触摸开始事件
function touchStarted() {
  if (touches.length > 0) {
    player.checkPressed(touches[0].x, touches[0].y);
  }
  return false; // 防止浏览器默认行为
}

// 触摸移动事件
function touchMoved() {
  if (touches.length > 0) {
    player.move(touches[0].x, touches[0].y);
  }
  return false; // 防止浏览器默认行为
}

// 触摸结束事件
function touchEnded() {
  player.released();
  return false; // 防止浏览器默认行为
}

// 窗口大小改变时调整画布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 重新计算列数
  let newNumColumns = floor(width / COLUMN_WIDTH);
  // 调整占用列数组大小
  if (newNumColumns > occupiedColumns.length) {
    for (let i = occupiedColumns.length; i < newNumColumns; i++) {
      occupiedColumns.push(false);
    }
  } else if (newNumColumns < occupiedColumns.length) {
    occupiedColumns = occupiedColumns.slice(0, newNumColumns);
  }
}

// 玩家类
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseSize = 40; // 基础字号大小
    this.size = this.baseSize; // 当前字号大小
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.active = false;
    this.baseAbsorptionRadius = 30; // 基础吸收半径
    this.absorptionRadius = this.baseAbsorptionRadius; // 当前吸收半径
    
    // 生命值系统
    this.maxHp = 100;
    this.hp = this.maxHp;
    this.baseHpBarRadius = this.baseAbsorptionRadius; // 基础血条半径
    this.hpBarRadius = this.baseHpBarRadius; // 当前血条半径
    
    // 回血机制
    this.lastDamageTime = 0; // 上次受伤时间
    this.healingDelay = 3000; // 3秒后开始回血
    this.healingRate = 0.5; // 每帧回复的血量
    
    // 吸收效果动画
    this.absorptionEffect = [];
  }
  
  // 更新玩家大小（基于分数）
  updateSize() {
    // 计算比例因子：每1分增加1%
    let scaleFactor = 1 + (score * 0.01);
    
    // 更新字号和半径
    this.size = this.baseSize * scaleFactor;
    this.absorptionRadius = this.baseAbsorptionRadius * scaleFactor;
    this.hpBarRadius = this.baseHpBarRadius * scaleFactor;
  }
  
  checkPressed(px, py) {
    // 检查鼠标点击是否在玩家范围内
    let d = dist(px, py, this.x, this.y);
    if (d < this.size / 2) {
      this.dragging = true;
      this.active = true;
      // 计算鼠标点击位置相对于玩家中心的偏移量
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }
  
  move(px, py) {
    if (this.dragging) {
      // 移动玩家位置，上移30像素避免被手指遮挡
      this.x = px + this.offsetX;
      this.y = py + this.offsetY - 30;
      
      // 限制在屏幕范围内
      this.x = constrain(this.x, this.size / 2, width - this.size / 2);
      this.y = constrain(this.y, this.size / 2, height - this.size / 2);
    }
  }
  
  released() {
    this.dragging = false;
  }
  
  // 检查与雨滴字符的碰撞并吸收
  checkAbsorption(raindrop) {
    let anyAbsorbed = false;
    
    for (let i = 0; i < raindrop.sentenceWords.length; i++) {
      if (!raindrop.charStates[i].splashed && !raindrop.charStates[i].absorbed) {
        // 计算字符位置
        let charY = raindrop.y - (raindrop.sentenceWords.length - i - 1) * raindrop.size;
        let charX = raindrop.x;
        
        // 检查是否在吸收范围内
        let d = dist(this.x, this.y, charX, charY);
        if (d < this.absorptionRadius + raindrop.size / 2) {
          raindrop.charStates[i].absorbed = true;
          
          // 根据是否为偏见短句决定加分或扣血
          if (raindrop.isPrejudice) {
            // 白色偏见短句会造成伤害
            this.hp -= 10; // 每个字减少10点血量
            if (this.hp < 0) this.hp = 0; // 确保血量不为负
            
            // 记录受伤时间
            this.takeDamage();
          } else {
            // 普通短句增加得分
            score++; // 增加得分
            
            // 更新玩家大小
            this.updateSize();
          }
          
          anyAbsorbed = true;
          
          // 添加吸收动画效果
          this.absorptionEffect.push({
            x: charX,
            y: charY,
            char: raindrop.sentenceWords[i],
            targetX: this.x,
            targetY: this.y,
            progress: 0,
            size: raindrop.size,
            color: raindrop.color, // 保存原始颜色
            isPrejudice: raindrop.isPrejudice // 记录是否为偏见短句
          });
        }
      }
    }
    
    return anyAbsorbed;
  }
  
  // 记录受伤
  takeDamage() {
    this.lastDamageTime = millis();
  }
  
  update() {
    // 更新吸收动画
    for (let i = this.absorptionEffect.length - 1; i >= 0; i--) {
      let effect = this.absorptionEffect[i];
      effect.progress += 0.1;
      
      // 如果动画完成，移除效果
      if (effect.progress >= 1) {
        this.absorptionEffect.splice(i, 1);
      }
    }
    
    // 处理回血机制
    let currentTime = millis();
    if (this.hp < this.maxHp && currentTime - this.lastDamageTime > this.healingDelay) {
      this.hp += this.healingRate;
      if (this.hp > this.maxHp) this.hp = this.maxHp;
    }
  }
  
  display() {
    // 绘制血量环
    let hpRatio = this.hp / this.maxHp;
    let arcEnd = PI + TWO_PI * hpRatio; // 计算血量环终点角度
    
    // 绘制血量环背景（灰色）
    noFill();
    stroke(150, 150, 150, 150);
    strokeWeight(3);
    ellipse(this.x, this.y, this.hpBarRadius * 2);
    
    // 检查是否处于回血状态
    let isHealing = millis() - this.lastDamageTime > this.healingDelay;
    
    if (isHealing && this.hp < this.maxHp) {
      // 回血状态 - 添加闪烁效果
      let pulse = sin(frameCount * 0.1) * 0.5 + 0.5; // 0-1的脉冲效果
      let healingAlpha = map(pulse, 0, 1, 150, 255);
      stroke(255, 255, 255, healingAlpha);
    } else {
      // 正常状态
      stroke(255); // 白色
    }
    
    strokeWeight(3);
    arc(this.x, this.y, this.hpBarRadius * 2, this.hpBarRadius * 2, PI, arcEnd);
    
    // 取消描边
    noStroke();
    
    // 绘制"我"字
    textSize(this.size);
    
    // 判断是否在暴雨状态(背景为黑色)
    if (isWhiteStorm && colorTransitionProgress > 0.5) {
      // 背景变黑后，使用白色显示"我"字
      fill(255);
    } else {
      // 正常状态下使用黑色
      fill(0);
    }
    
    text("我", this.x, this.y);
    
    // 绘制吸收动画效果
    for (let effect of this.absorptionEffect) {
      // 计算当前位置（使用缓动函数使动画更自然）
      let easeProgress = 1 - (1 - effect.progress) * (1 - effect.progress); // 缓出效果
      let currentX = lerp(effect.x, this.x, easeProgress);
      let currentY = lerp(effect.y, this.y, easeProgress);
      
      // 计算缩放和透明度
      let scale = map(easeProgress, 0, 1, 1, 0.5);
      let alpha = map(easeProgress, 0, 1, 255, 0);
      
      // 使用原始文字的颜色，调整透明度
      let c = effect.color || color(0);
      fill(red(c), green(c), blue(c), alpha);
      
      textSize(effect.size * scale);
      text(effect.char, currentX, currentY);
    }
  }
}

// 雨滴类
class Raindrop {
  constructor(x, forcePrejudice = false, verticalSpacing = null) {
    this.x = x;
    this.columnIndex = floor(this.x / COLUMN_WIDTH);
    this.reset(forcePrejudice, verticalSpacing);
  }
  
  reset(forcePrejudice = false, verticalSpacing = null) {
    // 设置Y坐标，如果提供了垂直间距参数，则使用它
    this.y = verticalSpacing !== null ? verticalSpacing : random(-300, -50);
    this.speed = random(2, 5);
    
    // 根据参数或暴雨状态决定句子类型
    if (forcePrejudice || isWhiteStorm) {
      // 强制生成白色偏见短句
      this.isPrejudice = true;
    } else {
      // 正常情况随机决定是创建普通短句还是白色偏见短句
      this.isPrejudice = random() < 0.3; // 30%概率出现白色短句
    }
    
    if (this.isPrejudice) {
      // 使用偏见短句
      this.sentence = prejudiceSentences[floor(random(prejudiceSentences.length))];
      this.sentenceWords = this.sentence.split('');
    } else {
      // 使用普通短句
      this.sentence = sentences[floor(random(sentences.length))];
      this.sentenceWords = this.sentence.split('');
    }
    
    // 为每个字符创建状态跟踪
    this.charStates = [];
    for (let i = 0; i < this.sentenceWords.length; i++) {
      this.charStates.push({
        splashed: false,
        reachedBottom: false,
        absorbed: false, // 新增：是否被吸收
        y: 0  // 将在update中计算
      });
    }
    
    // 随机深度值，用于控制字体大小和颜色深浅
    this.depth = random(0, 1);
    
    // 基于是否为偏见短句决定大小和颜色
    if (this.isPrejudice) {
      // 偏见短句使用36号字体和255透明度
      this.size = 36;
      this.color = color(255, 255, 255, 255); // 纯白色，不透明
    } else {
      // 普通短句
      // 基于深度值确定字体大小和颜色深浅
      this.size = map(this.depth, 0, 1, 36, 24); // 扩大字号范围
      
      // 调整透明度范围， 背景字母透明度为150-255
      let alpha = map(this.depth, 0, 1, 255, 150);
      
      // 使用纯黑色，但透明度变化 - 保持与氛围字符一致的颜色风格
      this.color = color(0, 0, 0, alpha);
      this.alpha = alpha;
    }
  }
  
  // 检查每个字符是否到达底部，并为到达底部的字符创建飞溅效果
  checkSplashChars() {
    let bottomReached = false;
    // 伞的顶部y坐标（简化计算）
    let umbrellaTop = height - 100;
    
    for (let i = 0; i < this.sentenceWords.length; i++) {
      // 计算每个字符的y位置
      let charY = this.y - (this.sentenceWords.length - i - 1) * this.size;
      this.charStates[i].y = charY;
      
      // 检查字符是否到达底部或伞的顶部且尚未飞溅或被吸收
      if ((charY >= height || (Math.abs(this.x - width/2) < 140 && charY >= umbrellaTop)) && 
          !this.charStates[i].splashed && !this.charStates[i].absorbed) {
        bottomReached = true;
        this.charStates[i].reachedBottom = true;
        
        // 创建该字符的飞溅效果
        for (let j = 0; j < random(3, 8); j++) {
          splashParticles.push(new SplashParticle(
            this.x,
            charY >= umbrellaTop && Math.abs(this.x - width/2) < 140 ? umbrellaTop : height, // 在地面或伞顶飞溅
            this.sentenceWords[i],
            this.color
          ));
        }
        
        this.charStates[i].splashed = true;
      }
    }
    
    return bottomReached;
  }
  
  // 检查所有字符是否都已飞溅或被吸收
  allCharsSplashed() {
    for (let state of this.charStates) {
      if (!state.splashed && !state.absorbed) return false;
    }
    return true;
  }
  
  update() {
    // 速度也可以随深度变化，深度低的短句下落更快
    this.y += this.speed * (1.2 - this.depth * 0.5);
  }
  
  display() {
    fill(this.color);
    textSize(this.size);
    
    // 将句子垂直排列，只显示尚未飞溅和未被吸收的字符
    for (let i = 0; i < this.sentenceWords.length; i++) {
      if (!this.charStates[i].splashed && !this.charStates[i].absorbed) {
        let charY = this.y - (this.sentenceWords.length - i - 1) * this.size;
        text(this.sentenceWords[i], this.x, charY);
      }
    }
  }
}

// 溅射粒子类
class SplashParticle {
  constructor(x, y, character, originalColor) {
    this.x = x;
    this.y = y;
    this.character = character;
    this.originalColor = originalColor;
    
    // 使用原始雨滴的颜色
    this.color = color(
      red(originalColor),
      green(originalColor),
      blue(originalColor),
      alpha(originalColor)
    );
    
    // 随机速度和方向
    let angle = random(TWO_PI);
    let speed = random(1, 5);
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed - 2; // 向上的初始推力
    
    this.gravity = 0.1;
    this.lifetime = 80;
    this.age = 0;
    this.size = random(12, 18);
    this.rotationSpeed = random(-0.1, 0.1);
    this.rotation = 0;
  }
  
  update() {
    // 应用速度
    this.x += this.vx;
    this.y += this.vy;
    
    // 应用重力
    this.vy += this.gravity;
    
    // 应用旋转
    this.rotation += this.rotationSpeed;
    
    // 增加年龄
    this.age++;
    
    // 随着年龄增长，透明度降低，但保持原始颜色的其他属性
    let originalAlpha = alpha(this.originalColor);
    let newAlpha = map(this.age, 0, this.lifetime, originalAlpha, 0);
    
    // 判断背景颜色，在暴雨状态(黑色背景)下用白色，否则用黑色
    if (isWhiteStorm && colorTransitionProgress > 0.5) {
      this.color = color(255, 255, 255, newAlpha); // 使用白色，调整透明度
    } else {
      this.color = color(0, 0, 0, newAlpha); // 使用黑色，调整透明度
    }
  }
  
  display() {
    push();
    fill(this.color);
    textSize(this.size);
    translate(this.x, this.y);
    rotate(this.rotation);
    text(this.character, 0, 0);
    pop();
  }
  
  isDead() {
    return this.age >= this.lifetime;
  }
}

// 更新暴雨状态
function updateWhiteStormStatus() {
  let currentTime = millis();
  
  // 如果不在暴雨状态但该开始暴雨了
  if (stormPhase === 0 && currentTime >= nextWhiteStormTime && !isLightningWarning && !isWhiteStorm) {
    startWhiteStorm();
    return;
  }
  
  // 处理闪电预警阶段
  if (isLightningWarning) {
    // 闪电预警结束后，开始正式暴雨
    if (currentTime - lightningWarningStartTime >= LIGHTNING_WARNING_DURATION) {
      isLightningWarning = false;
      isWhiteStorm = true;
      whiteStormStartTime = currentTime;
      stormPhase = 1; // 进入预警等待空闲阶段
      
      // 启动颜色过渡
      isTransitioningIn = true;
      transitionStartTime = currentTime;
      
      console.log("闪电预警结束，开始暴雨，等待所有列空闲");
    }
    return;
  }
  
  // 处理颜色过渡
  if (isTransitioningIn) {
    colorTransitionProgress = (currentTime - transitionStartTime) / COLOR_TRANSITION_DURATION;
    if (colorTransitionProgress >= 1) {
      colorTransitionProgress = 1;
      isTransitioningIn = false;
      
      // 背景完全变黑后，移除所有黑色短句
      removeAllNormalRaindrops();
      console.log("背景变黑，移除所有黑色短句");
    }
    // 更新背景颜色和雨伞颜色
    updateColors();
  }
  
  if (isTransitioningOut) {
    colorTransitionProgress = 1 - (currentTime - transitionStartTime) / COLOR_TRANSITION_DURATION;
    if (colorTransitionProgress <= 0) {
      colorTransitionProgress = 0;
      isTransitioningOut = false;
    }
    // 更新背景颜色和雨伞颜色
    updateColors();
  }
  
  // 暴雨预警阶段 - 等待所有列空闲
  if (stormPhase === 1) {
    if (areAllColumnsEmpty()) {
      // 所有列都空闲，刷出白色短句
      fillAllColumnsWithWhite();
      stormPhase = 2; // 进入等待白色短句结束阶段
      console.log("填充白色短句完成，进入等待阶段");
    }
  }
  
  // 等待白色短句结束阶段
  else if (stormPhase === 2) {
    if (areAllColumnsEmpty()) {
      // 所有白色短句结束，开始过渡退出暴雨
      stormPhase = 3; // 进入颜色恢复阶段
      isTransitioningOut = true;
      transitionStartTime = currentTime;
      console.log("白色短句结束，开始恢复正常环境");
    }
  }
  
  // 颜色恢复阶段
  else if (stormPhase === 3 && !isTransitioningOut) {
    // 颜色过渡完成，完全恢复正常
    stormPhase = 0;
    isStormPaused = false;
    isWhiteStorm = false;
    
    // 安排下一次暴雨
    scheduleNextWhiteStorm();
    console.log("暴雨事件完全结束，恢复正常");
    
    // 重新添加初始短句，确保不在同一列
    for (let i = 0; i < 30; i++) {
      addNewRaindrop();
    }
  }
}

// 更新背景和雨伞颜色
function updateColors() {
  // 计算插值颜色
  for (let i = 0; i < 3; i++) {
    bgColorCurrent[i] = lerp(bgColorStart[i], bgColorTarget[i], colorTransitionProgress);
  }
  
  // 雨伞颜色 - 从黑色到白色
  if (isWhiteStorm) {
    umbrellaColor[0] = umbrellaColor[1] = umbrellaColor[2] = lerp(0, 255, colorTransitionProgress);
  } else {
    umbrellaColor[0] = umbrellaColor[1] = umbrellaColor[2] = lerp(255, 0, 1 - colorTransitionProgress);
  }
}

// 移除所有正在下落的黑色短句
function removeAllNormalRaindrops() {
  for (let i = raindrops.length - 1; i >= 0; i--) {
    if (!raindrops[i].isPrejudice) {
      // 释放该列
      occupiedColumns[raindrops[i].columnIndex] = false;
      // 移除黑色短句
      raindrops.splice(i, 1);
    }
  }
} 