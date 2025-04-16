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
let isRedStorm = false; // 是否处于暴雨状态
let redStormStartTime = 0; // 暴雨开始时间
const RED_STORM_DURATION = 2000; // 暴雨持续2秒
let nextRedStormTime = 0; // 下一次暴雨时间
const RED_STORM_MIN_INTERVAL = 15000; // 最短暴雨间隔15秒
const RED_STORM_MAX_INTERVAL = 20000; // 最长暴雨间隔20秒

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

// 偏见短句库（红色，伤害玩家）
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

// 添加暴雨闪烁效果控制变量
let redFlashEffect = false;
let redFlashStartTime = 0;
const RED_FLASH_DURATION = 500; // 闪烁效果持续500毫秒

function preload() {
  // 创建伞的图形
  createUmbrellaGraphics();
}

// 创建伞的图形
function createUmbrellaGraphics() {
  umbrellaImg = createGraphics(300, 200);
  umbrellaImg.fill(0);
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
  scheduleNextRedStorm();
  
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
  let columnIndex;
  let attempts = 0;
  const maxAttempts = 50; // 防止无限循环
  
  do {
    columnIndex = floor(random(occupiedColumns.length));
    attempts++;
    if (attempts > maxAttempts) break; // 防止无限循环
  } while (occupiedColumns[columnIndex]);
  
  if (attempts <= maxAttempts) {
    // 严格标记列为已占用（非暴雨状态下严格执行一列一个短句的规则）
    occupiedColumns[columnIndex] = true;
    
    // 检查是否需要确保垂直间距
    let verticalSpacing = checkColumnVerticalSpace(columnIndex);
    
    // 根据是否处于暴雨状态决定是否强制生成红色短句
    let newRaindrop = new Raindrop(columnIndex * COLUMN_WIDTH + COLUMN_WIDTH / 2, isRedStorm, verticalSpacing);
    raindrops.push(newRaindrop);
    
    return true; // 返回成功添加的标志
  }
  
  return false; // 返回添加失败的标志
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
function scheduleNextRedStorm() {
  // 随机设置下一次暴雨时间
  let interval = random(RED_STORM_MIN_INTERVAL, RED_STORM_MAX_INTERVAL);
  nextRedStormTime = millis() + interval;
}

// 开始暴雨事件
function startRedStorm() {
  isRedStorm = true;
  redStormStartTime = millis();
  
  // 触发红色闪烁效果
  redFlashEffect = true;
  redFlashStartTime = millis();
  
  // 在所有空闲列刷出红色短句
  fillAllColumnsWithRed();
  
  // 立即结束暴雨状态
  isRedStorm = false;
  scheduleNextRedStorm(); // 安排下一次暴雨
  
  // 重置列占用状态
  cleanupAfterRedStorm();
}

// 在所有空闲列添加红色短句
function fillAllColumnsWithRed() {
  // 计算空闲的列
  let freeColumns = [];
  for (let i = 0; i < occupiedColumns.length; i++) {
    if (!occupiedColumns[i]) {
      freeColumns.push(i);
    }
  }
  
  // 简化函数，在所有空闲列添加红色短句
  for (let colIndex of freeColumns) {
    occupiedColumns[colIndex] = true;
    
    // 检查列的垂直空间
    let verticalSpacing = checkColumnVerticalSpace(colIndex);
    
    // 添加新的红色短句
    let newRaindrop = new Raindrop(colIndex * COLUMN_WIDTH + COLUMN_WIDTH / 2, true, verticalSpacing);
    raindrops.push(newRaindrop);
  }
  
  // 尝试给一些已经有雨滴但雨滴已经下落较远的列添加新的红色短句
  // 这会使暴雨效果更明显
  let columnStatus = [];
  for (let i = 0; i < occupiedColumns.length; i++) {
    columnStatus[i] = {
      lowestY: -1000, // 默认位置很高
      hasRaindrop: false
    };
  }
  
  // 检查每个雨滴位置
  for (let raindrop of raindrops) {
    let colIdx = raindrop.columnIndex;
    columnStatus[colIdx].hasRaindrop = true;
    
    // 更新该列中最低雨滴的位置
    if (raindrop.y > columnStatus[colIdx].lowestY) {
      columnStatus[colIdx].lowestY = raindrop.y;
    }
  }
  
  // 找出那些雨滴已经下落较远的列
  for (let i = 0; i < columnStatus.length; i++) {
    let status = columnStatus[i];
    // 只考虑已有雨滴、且最低雨滴已经下落到足够远的列
    if (status.hasRaindrop && status.lowestY > 200) {
      // 创建一个新的红色短句，竖直位置设置得较高以避免与现有雨滴重叠
      let verticalSpacing = random(-500, -300);
      let newRaindrop = new Raindrop(i * COLUMN_WIDTH + COLUMN_WIDTH / 2, true, verticalSpacing);
      raindrops.push(newRaindrop);
      // 注意：这里不需要改变occupiedColumns的状态，因为该列已经被标记为占用
    }
  }
}

function draw() {
  // 增加帧计数
  frameCounter = (frameCounter + 1) % 60; // 循环计数0-59
  
  // 动态调整性能
  optimizePerformance();
  
  // 更新暴雨状态
  updateRedStormStatus();
  
  // 检查是否需要结束红色闪烁效果
  if (redFlashEffect && millis() - redFlashStartTime > RED_FLASH_DURATION) {
    redFlashEffect = false;
  }
  
  // 绘制背景
  if (redFlashEffect) {
    // 暴雨状态下背景略微偏红
    background(160, 165, 190); // 带一点红色调的背景
  } else {
    // 正常背景
    background(153, 179, 204); // 与图片中的浅蓝色背景匹配
  }
  
  // 绘制背景字母 - 使用分批处理优化
  if (backgroundChars.length > 0) {
    drawBackgroundLetters();
  }
  
  // 检查游戏是否结束（HP为0）
  if (player.hp <= 0) {
    // 显示游戏结束信息
    textAlign(CENTER, CENTER);
    textSize(42);
    fill(255, 0, 0);
    text("游戏结束", width/2, height/2 - 30);
    textSize(24);
    text("得分: " + score, width/2, height/2 + 30);
    text("按R键重新开始", width/2, height/2 + 70);
    
    // 不再进行其他游戏逻辑
    return;
  }
  
  // 如果在闪烁效果期间，绘制屏幕闪烁效果
  if (redFlashEffect) {
    // 计算闪烁强度（基于时间）
    let progress = (millis() - redFlashStartTime) / RED_FLASH_DURATION;
    let flashIntensity = (1 - progress) * 0.8; // 从0.8降到0
    
    // 绘制红色覆盖
    fill(255, 0, 0, flashIntensity * 40); // 半透明红色覆盖
    noStroke();
    rect(0, 0, width, height);
  }
  
  // 更新和显示雨滴
  for (let i = raindrops.length - 1; i >= 0; i--) {
    // 如果是红色短句且在闪烁效果期间，速度更快
    if (redFlashEffect && raindrops[i].isPrejudice) {
      raindrops[i].speed *= 1.01; // 略微增加速度，产生加速效果
    }
    
    raindrops[i].update();
    raindrops[i].display();
    
    // 检查短句的每个字符是否到达底部
    if (raindrops[i].checkSplashChars()) {
      // 如果所有字符都已经飞溅或被吸收，则释放该列并创建新雨滴
      if (raindrops[i].allCharsSplashed()) {
        let columnToFree = raindrops[i].columnIndex;
        
        // 从数组中移除这个雨滴
        raindrops.splice(i, 1);
        
        // 只有在非暴雨状态下才严格遵循一列一个短句的原则
        if (!isRedStorm) {
          // 标记列为空闲
          occupiedColumns[columnToFree] = false;
          
          // 随机决定是否立即在这一列创建新短句
          if (random() < 0.7) { // 70%的概率立即创建新短句
            // 手动指定在这一列创建新短句
            let verticalSpacing = random(-300, -100);
            let newRaindrop = new Raindrop(columnToFree * COLUMN_WIDTH + COLUMN_WIDTH / 2, false, verticalSpacing);
            raindrops.push(newRaindrop);
            occupiedColumns[columnToFree] = true;
          } else {
            // 尝试在随机列创建新短句
            addNewRaindrop();
          }
        }
        
        continue; // 跳过后面的代码，避免对已删除的雨滴进行操作
      }
    }
    
    // 检查玩家是否吸收了雨滴中的字符
    if (player.active) {
      if (player.checkAbsorption(raindrops[i])) {
        // 如果全部字符被吸收，检查是否需要释放该列
        if (raindrops[i].allCharsSplashed()) {
          let columnToFree = raindrops[i].columnIndex;
          
          // 从数组中移除这个雨滴
          raindrops.splice(i, 1);
          
          // 只有在非暴雨状态下才严格遵循一列一个短句的原则
          if (!isRedStorm) {
            // 标记列为空闲
            occupiedColumns[columnToFree] = false;
            
            // 随机决定是否立即在这一列创建新短句
            if (random() < 0.7) { // 70%的概率立即创建新短句
              // 手动指定在这一列创建新短句
              let verticalSpacing = random(-300, -100);
              let newRaindrop = new Raindrop(columnToFree * COLUMN_WIDTH + COLUMN_WIDTH / 2, false, verticalSpacing);
              raindrops.push(newRaindrop);
              occupiedColumns[columnToFree] = true;
            } else {
              // 尝试在随机列创建新短句
              addNewRaindrop();
            }
          }
          
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
  image(umbrellaImg, 0, 0);
  pop();
  
  // 更新和显示玩家
  player.update();
  player.display();
  
  // 显示得分
  displayScore();
  
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
    
    // 计算红色短句数量
    let redCount = 0;
    for (let drop of raindrops) {
      if (drop.isPrejudice) redCount++;
    }
    text("红色短句数: " + redCount, 20, 150);
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
    if (redFlashEffect) {
      let flashTimeLeft = (RED_FLASH_DURATION - (millis() - redFlashStartTime)) / 1000;
      fill(255, 0, 0);
      text("暴雨效果: 进行中 (" + flashTimeLeft.toFixed(1) + "秒)", 20, 230);
      fill(0);
    } else {
      let timeToNextStorm = (nextRedStormTime - millis()) / 1000;
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
    fill(255, 0, 0);
    text("红色短句：每字 -10 HP", 20, 290);
    fill(0);
    
    // 显示颜色一致性信息
    text("颜色方案: 黑色(普通)，红色(偏见短句)", 20, 310);
    
    // 绘制颜色样本
    let sampleY = 330;
    // 普通短句样本
    fill(0, 0, 0, 255);
    rect(20, sampleY, 25, 25);
    text("普通", 60, sampleY + 12);
    
    // 红色短句样本
    fill(255, 0, 0, 255);
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
      
      // 绘制字母
      fill(0, 0, 0, letter.alpha);
      textSize(letter.size);
      text(letter.char, letter.x, letter.y);
    }
  }
}

// 显示得分
function displayScore() {
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("成绩: " + score, 20, 20);
  
  // 显示血量
  text("生命: " + player.hp.toFixed(0) + "/" + player.maxHp, 200, 20);
  
  // 显示当前大小增长
  let growthPercent = (score * 0.01 * 100).toFixed(0);
  text("大小: +" + growthPercent + "%", 400, 20);
  
  textAlign(CENTER, CENTER); // 恢复默认对齐
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
  
  // 重置暴雨事件
  isRedStorm = false;
  redFlashEffect = false; // 重置闪烁效果
  scheduleNextRedStorm();
  
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
            // 红色偏见短句会造成伤害
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
    fill(0);
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
    if (forcePrejudice || isRedStorm) {
      // 强制生成红色偏见短句
      this.isPrejudice = true;
    } else {
      // 正常情况随机决定是创建普通短句还是红色偏见短句
      this.isPrejudice = random() < 0.3; // 30%概率出现红色短句
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
      // 红色偏见短句始终使用36号字体和255透明度
      this.size = 36;
      this.color = color(255, 0, 0, 255); // 纯红色，不透明
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
    
    this.color = color(0, 0, 0, newAlpha); // 保持纯黑色，只改变透明度
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
function updateRedStormStatus() {
  let currentTime = millis();
  
  // 如果不在暴雨状态，检查是否应该开始暴雨
  if (!isRedStorm && currentTime >= nextRedStormTime) {
    startRedStorm();
  }
}

// 暴雨结束后的清理工作，确保列占用状态正确恢复
function cleanupAfterRedStorm() {
  // 重新检查每一列是否有雨滴
  let columnsWithRaindrops = Array(occupiedColumns.length).fill(false);
  
  // 遍历所有雨滴，记录它们所在的列
  for (let raindrop of raindrops) {
    columnsWithRaindrops[raindrop.columnIndex] = true;
  }
  
  // 更新占用列数组，确保与实际雨滴分布一致
  for (let i = 0; i < occupiedColumns.length; i++) {
    occupiedColumns[i] = columnsWithRaindrops[i];
  }
  
  // 在没有雨滴的列中添加一些新的普通短句，保证基本的游戏流畅性
  let emptyColumns = 0;
  for (let i = 0; i < occupiedColumns.length; i++) {
    if (!occupiedColumns[i]) {
      emptyColumns++;
    }
  }
  
  // 确保至少有一定数量的短句在屏幕上
  let minRaindrops = min(occupiedColumns.length / 3, 10); // 至少有1/3的列或10个雨滴
  let additionalDropsNeeded = max(0, minRaindrops - raindrops.length);
  
  // 添加一些新的普通短句
  for (let i = 0; i < min(additionalDropsNeeded, emptyColumns); i++) {
    addNewRaindrop();
  }
} 