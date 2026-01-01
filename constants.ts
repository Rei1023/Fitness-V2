import { BodyPart, Exercise, ExerciseCategory } from './types';

export const EXERCISE_DB: Exercise[] = [
  // --- 🔥 熱身 (Warmup) ---
  { id: 'w1', name: '連續踝關節跳 (Pogo Jumps)', category: ExerciseCategory.WARMUP, emoji: '🔥', bodyParts: [BodyPart.LEGS, BodyPart.FUNCTIONAL] },
  { id: 'w2', name: '高抬腿跑', category: ExerciseCategory.WARMUP, emoji: '🏃', bodyParts: [BodyPart.LEGS, BodyPart.FUNCTIONAL] },
  { id: 'w3', name: '藥球繞頭 + 肩部環繞', category: ExerciseCategory.WARMUP, emoji: '🏐', bodyParts: [BodyPart.SHOULDERS, BodyPart.CORE] },
  { id: 'w4', name: '毛毛蟲爬行', category: ExerciseCategory.WARMUP, emoji: '🐛', bodyParts: [BodyPart.CORE, BodyPart.FUNCTIONAL] },
  { id: 'w5', name: '世界最偉大伸展', category: ExerciseCategory.WARMUP, emoji: '🌍', bodyParts: [BodyPart.LEGS, BodyPart.BACK] },
  { id: 'w6', name: '彈力帶肩內外旋', category: ExerciseCategory.WARMUP, emoji: '🎗️', bodyParts: [BodyPart.SHOULDERS] },
  { id: 'w7', name: '平板支撐轉體', category: ExerciseCategory.WARMUP, emoji: '🧱', bodyParts: [BodyPart.CORE, BodyPart.BACK] },

  // --- 🦿 下肢肌力 (Legs) ---
  { id: 'l1', name: '槓鈴/啞鈴 深蹲', category: ExerciseCategory.MAIN, emoji: '🏋️', bodyParts: [BodyPart.LEGS], reps: '8-10 下' },
  { id: 'l2', name: '保加利亞分腿蹲', category: ExerciseCategory.MAIN, emoji: '🦵', bodyParts: [BodyPart.LEGS], reps: '單腳 8 下' },
  { id: 'l3', name: '羅馬尼亞硬舉 (RDL)', category: ExerciseCategory.MAIN, emoji: '📉', bodyParts: [BodyPart.LEGS, BodyPart.BACK], reps: '10 下' },
  { id: 'l4', name: '負重弓箭步行走', category: ExerciseCategory.MAIN, emoji: '🚶', bodyParts: [BodyPart.LEGS], reps: '20 步' },
  { id: 'l5', name: '啞鈴登階 (Step-ups)', category: ExerciseCategory.MAIN, emoji: '🪜', bodyParts: [BodyPart.LEGS], reps: '單腳 10 下' },
  { id: 'l6', name: '負重深蹲跳', category: ExerciseCategory.MAIN, emoji: '🐇', bodyParts: [BodyPart.LEGS, BodyPart.FUNCTIONAL], reps: '6 下' },
  { id: 'l7', name: '槓鈴/啞鈴 臀推', category: ExerciseCategory.MAIN, emoji: '🍑', bodyParts: [BodyPart.LEGS], reps: '12 下' },
  { id: 'l8', name: '哥薩克深蹲', category: ExerciseCategory.MAIN, emoji: '↔️', bodyParts: [BodyPart.LEGS], reps: '單邊 8 下' },
  { id: 'l9', name: '啞鈴相撲深蹲', category: ExerciseCategory.MAIN, emoji: '👺', bodyParts: [BodyPart.LEGS], reps: '12 下' },
  { id: 'l10', name: '槓片弓步蹲', category: ExerciseCategory.MAIN, emoji: '💿', bodyParts: [BodyPart.LEGS], reps: '單腳 10 下' },

  // --- 🦍 胸部肌力 (Chest) ---
  { id: 'c1', name: '平板臥推', category: ExerciseCategory.MAIN, emoji: '🛌', bodyParts: [BodyPart.CHEST], reps: '8-10 下' },
  { id: 'c2', name: '上斜啞鈴臥推', category: ExerciseCategory.MAIN, emoji: '📐', bodyParts: [BodyPart.CHEST], reps: '10 下' },
  { id: 'c3', name: '啞鈴飛鳥 (Flys)', category: ExerciseCategory.MAIN, emoji: '🦅', bodyParts: [BodyPart.CHEST], reps: '12 下' },
  { id: 'c4', name: '加重伏地挺身', category: ExerciseCategory.MAIN, emoji: '🎒', bodyParts: [BodyPart.CHEST], reps: '力竭' },
  { id: 'c5', name: '下斜伏地挺身', category: ExerciseCategory.MAIN, emoji: '↘️', bodyParts: [BodyPart.CHEST], reps: '15 下' },
  { id: 'c6', name: '啞鈴窄距臥推', category: ExerciseCategory.MAIN, emoji: '📏', bodyParts: [BodyPart.CHEST, BodyPart.SHOULDERS], reps: '12 下' },

  // --- 🦅 背部肌力 (Back) ---
  { id: 'b1', name: '單臂啞鈴划船', category: ExerciseCategory.MAIN, emoji: '🛶', bodyParts: [BodyPart.BACK], reps: '單手 10 下' },
  { id: 'b2', name: '槓鈴俯身划船', category: ExerciseCategory.MAIN, emoji: '🏋️‍♀️', bodyParts: [BodyPart.BACK], reps: '10 下' },
  { id: 'b3', name: '上斜支撐划船', category: ExerciseCategory.MAIN, emoji: '📐', bodyParts: [BodyPart.BACK], reps: '12 下' },
  { id: 'b4', name: '仰臥拉舉 (Pullover)', category: ExerciseCategory.MAIN, emoji: '🙆', bodyParts: [BodyPart.BACK, BodyPart.CHEST], reps: '12 下' },
  { id: 'b5', name: '啞鈴聳肩', category: ExerciseCategory.MAIN, emoji: '🤷', bodyParts: [BodyPart.BACK], reps: '15 下' },
  { id: 'b6', name: '直臂下壓 (仰臥)', category: ExerciseCategory.MAIN, emoji: '👇', bodyParts: [BodyPart.BACK], reps: '15 下' },
  { id: 'b7', name: '潘德雷划船 (Pendlay)', category: ExerciseCategory.MAIN, emoji: '🦍', bodyParts: [BodyPart.BACK], reps: '8 下' },
  { id: 'b8', name: '反手槓鈴划船 (Yates)', category: ExerciseCategory.MAIN, emoji: '🖐️', bodyParts: [BodyPart.BACK], reps: '10 下' },
  { id: 'b9', name: '克羅克划船 (Kroc Row)', category: ExerciseCategory.MAIN, emoji: '🐊', bodyParts: [BodyPart.BACK], reps: '單手 20 下' },
  { id: 'b10', name: '槓鈴早安式', category: ExerciseCategory.MAIN, emoji: '☀️', bodyParts: [BodyPart.BACK, BodyPart.LEGS], reps: '12 下' },
  { id: 'b11', name: '寬握槓鈴划船', category: ExerciseCategory.MAIN, emoji: '👐', bodyParts: [BodyPart.BACK], reps: '10 下' },
  { id: 'b12', name: '反向划船 (Inverted Row)', category: ExerciseCategory.MAIN, emoji: '🙃', bodyParts: [BodyPart.BACK], reps: '力竭' },
  { id: 'b13', name: '俯臥挺身 (Superman)', category: ExerciseCategory.MAIN, emoji: '🦸', bodyParts: [BodyPart.BACK], reps: '20 下' },
  { id: 'b14', name: '鳥狗式 (Bird Dog)', category: ExerciseCategory.MAIN, emoji: '🐕', bodyParts: [BodyPart.BACK, BodyPart.CORE], reps: '單邊 12 下' },

  // --- 🦾 肩膀與三頭 (Shoulders) ---
  { id: 's1', name: '站姿槓鈴/啞鈴 肩推', category: ExerciseCategory.MAIN, emoji: '💂', bodyParts: [BodyPart.SHOULDERS], reps: '8 下' },
  { id: 's2', name: '坐姿啞鈴肩推', category: ExerciseCategory.MAIN, emoji: '🪑', bodyParts: [BodyPart.SHOULDERS], reps: '10 下' },
  { id: 's3', name: '啞鈴側平舉', category: ExerciseCategory.MAIN, emoji: '🦅', bodyParts: [BodyPart.SHOULDERS], reps: '15 下' },
  { id: 's4', name: '俯身飛鳥 (後三角)', category: ExerciseCategory.MAIN, emoji: '🐦', bodyParts: [BodyPart.SHOULDERS], reps: '15 下' },
  { id: 's5', name: '法式推舉 (三頭)', category: ExerciseCategory.MAIN, emoji: '🇫🇷', bodyParts: [BodyPart.SHOULDERS], reps: '12 下' },
  { id: 's6', name: '坐姿過頂三頭伸展', category: ExerciseCategory.MAIN, emoji: '🙆‍♂️', bodyParts: [BodyPart.SHOULDERS], reps: '12 下' },
  { id: 's7', name: '阿諾推舉', category: ExerciseCategory.MAIN, emoji: '🤖', bodyParts: [BodyPart.SHOULDERS], reps: '10 下' },
  { id: 's8', name: '啞鈴前平舉', category: ExerciseCategory.MAIN, emoji: '🧟', bodyParts: [BodyPart.SHOULDERS], reps: '12 下' },
  { id: 's9', name: '板凳臂屈伸 (Bench Dips)', category: ExerciseCategory.MAIN, emoji: '🛋️', bodyParts: [BodyPart.SHOULDERS, BodyPart.CHEST], reps: '15 下' },
  { id: 's10', name: '槓片臉拉', category: ExerciseCategory.MAIN, emoji: '🤡', bodyParts: [BodyPart.SHOULDERS, BodyPart.BACK], reps: '20 下' },

  // --- 🏋️ 核心/藥球 (Core) ---
  { id: 'cr1', name: '藥球俄羅斯轉體', category: ExerciseCategory.MAIN, emoji: '🇷🇺', bodyParts: [BodyPart.CORE], reps: '40 下' },
  { id: 'cr2', name: '藥球 V字捲腹', category: ExerciseCategory.MAIN, emoji: '✌️', bodyParts: [BodyPart.CORE], reps: '15 下' },
  { id: 'cr3', name: '槓鈴滾輪 (Rollout)', category: ExerciseCategory.MAIN, emoji: '🛞', bodyParts: [BodyPart.CORE], reps: '10 下' },
  { id: 'cr4', name: '死蟲式 (對抗藥球)', category: ExerciseCategory.MAIN, emoji: '🪲', bodyParts: [BodyPart.CORE], reps: '單邊 10 下' },
  { id: 'cr5', name: '側棒式', category: ExerciseCategory.MAIN, emoji: '📐', bodyParts: [BodyPart.CORE], reps: '45 秒' },
  { id: 'cr6', name: '躺椅反向捲腹', category: ExerciseCategory.MAIN, emoji: '🔄', bodyParts: [BodyPart.CORE], reps: '15 下' },
  { id: 'cr7', name: '藥球伐木 (Woodchoppers)', category: ExerciseCategory.MAIN, emoji: '🪓', bodyParts: [BodyPart.CORE], reps: '單邊 12 下' },
  { id: 'cr8', name: '仰臥雨刷', category: ExerciseCategory.MAIN, emoji: '🚗', bodyParts: [BodyPart.CORE], reps: '12 下' },
  { id: 'cr9', name: '啞鈴棒式划船', category: ExerciseCategory.MAIN, emoji: '🚣', bodyParts: [BodyPart.CORE, BodyPart.BACK], reps: '10 下' },
  { id: 'cr10', name: '側平板啞鈴上提', category: ExerciseCategory.MAIN, emoji: '🆙', bodyParts: [BodyPart.CORE], reps: '單邊 12 下' },
  { id: 'cr11', name: '弓箭步+槓片迴轉', category: ExerciseCategory.MAIN, emoji: '🥋', bodyParts: [BodyPart.CORE, BodyPart.LEGS], reps: '單邊 10 下' },
  { id: 'cr12', name: '後跨步扭轉', category: ExerciseCategory.MAIN, emoji: '🕺', bodyParts: [BodyPart.CORE, BodyPart.LEGS], reps: '單邊 10 下' },
  { id: 'cr13', name: '嬰兒式', category: ExerciseCategory.MAIN, emoji: '👶', bodyParts: [BodyPart.CORE], reps: '1 分鐘' },

  // --- 👟 剛性/動力鍊 (Functional) ---
  { id: 'f1', name: '藥球旋轉砸牆/地', category: ExerciseCategory.MAIN, emoji: '💥', bodyParts: [BodyPart.FUNCTIONAL, BodyPart.CORE], reps: '單邊 8 下' },
  { id: 'f2', name: '單臂啞鈴抓舉', category: ExerciseCategory.MAIN, emoji: '🏋️‍♂️', bodyParts: [BodyPart.FUNCTIONAL, BodyPart.SHOULDERS], reps: '單手 6 下' },
  { id: 'f3', name: '連續踝關節跳 (Pogo)', category: ExerciseCategory.MAIN, emoji: '🐰', bodyParts: [BodyPart.FUNCTIONAL, BodyPart.LEGS], reps: '20 下' },
  { id: 'f4', name: '深跳 (Depth Drop)', category: ExerciseCategory.MAIN, emoji: '📦', bodyParts: [BodyPart.FUNCTIONAL, BodyPart.LEGS], reps: '6 下' },
  { id: 'f5', name: '藥球過頂前砸', category: ExerciseCategory.MAIN, emoji: '☄️', bodyParts: [BodyPart.FUNCTIONAL, BodyPart.CORE], reps: '10 下' },
  { id: 'f6', name: '單腳連續跳 (Hops)', category: ExerciseCategory.MAIN, emoji: '🦶', bodyParts: [BodyPart.FUNCTIONAL, BodyPart.LEGS], reps: '單腳 10 下' },
  { id: 'f7', name: '啞鈴高翻 (Clean)', category: ExerciseCategory.MAIN, emoji: '⚡', bodyParts: [BodyPart.FUNCTIONAL], reps: '8 下' },
  { id: 'f8', name: '單腳落地穩定', category: ExerciseCategory.MAIN, emoji: '🧘', bodyParts: [BodyPart.FUNCTIONAL, BodyPart.LEGS], reps: '單腳 5 下' },
  { id: 'f9', name: '180度深蹲跳', category: ExerciseCategory.MAIN, emoji: '🔄', bodyParts: [BodyPart.FUNCTIONAL, BodyPart.LEGS], reps: '8 下' },
  { id: 'f10', name: '藥球橫向爆發拋', category: ExerciseCategory.MAIN, emoji: '🏐', bodyParts: [BodyPart.FUNCTIONAL, BodyPart.CORE], reps: '單邊 8 下' },

  // --- 🧘 收操 (Cooldown) ---
  { id: 'cd1', name: '腿後側伸展', category: ExerciseCategory.COOLDOWN, emoji: '🦵', bodyParts: [BodyPart.LEGS] },
  { id: 'cd2', name: '嬰兒式', category: ExerciseCategory.COOLDOWN, emoji: '👶', bodyParts: [BodyPart.ALL] }, // General
  { id: 'cd3', name: '胸大肌伸展', category: ExerciseCategory.COOLDOWN, emoji: '🚪', bodyParts: [BodyPart.CHEST] },
  { id: 'cd4', name: '臀部伸展 (鴿式)', category: ExerciseCategory.COOLDOWN, emoji: '🐦', bodyParts: [BodyPart.LEGS] },
  { id: 'cd5', name: '上斜方肌伸展', category: ExerciseCategory.COOLDOWN, emoji: '💆', bodyParts: [BodyPart.SHOULDERS, BodyPart.BACK] },
  { id: 'cd6', name: '眼鏡蛇式', category: ExerciseCategory.COOLDOWN, emoji: '🐍', bodyParts: [BodyPart.CORE, BodyPart.ALL] },
  { id: 'cd7', name: '站姿股四頭肌伸展', category: ExerciseCategory.COOLDOWN, emoji: '🩰', bodyParts: [BodyPart.LEGS] },
  { id: 'cd8', name: '坐姿腿後側伸展', category: ExerciseCategory.COOLDOWN, emoji: '🧘', bodyParts: [BodyPart.LEGS] },
  { id: 'cd9', name: '蝴蝶式', category: ExerciseCategory.COOLDOWN, emoji: '🦋', bodyParts: [BodyPart.LEGS] },
  { id: 'cd10', name: '門框胸大肌伸展', category: ExerciseCategory.COOLDOWN, emoji: '🚪', bodyParts: [BodyPart.CHEST] },
  { id: 'cd11', name: '背後扣手伸展', category: ExerciseCategory.COOLDOWN, emoji: '🤝', bodyParts: [BodyPart.SHOULDERS] },
  { id: 'cd12', name: '貓牛式', category: ExerciseCategory.COOLDOWN, emoji: '🐄', bodyParts: [BodyPart.BACK, BodyPart.CORE] },
  { id: 'cd13', name: '跪姿背闊肌伸展', category: ExerciseCategory.COOLDOWN, emoji: '🙇', bodyParts: [BodyPart.BACK] },
  { id: 'cd14', name: '十字肩部伸展', category: ExerciseCategory.COOLDOWN, emoji: '✝️', bodyParts: [BodyPart.SHOULDERS] },
  { id: 'cd15', name: '過頂三頭肌伸展', category: ExerciseCategory.COOLDOWN, emoji: '💪', bodyParts: [BodyPart.SHOULDERS] },
  { id: 'cd16', name: '弓箭步脊椎扭轉', category: ExerciseCategory.COOLDOWN, emoji: '🌪️', bodyParts: [BodyPart.CORE, BodyPart.ALL] }
];

export const PARTS_DISPLAY = [
  { id: BodyPart.LEGS, label: '下肢', icon: '🦿' },
  { id: BodyPart.CHEST, label: '胸部', icon: '🦍' },
  { id: BodyPart.BACK, label: '背部', icon: '🦅' },
  { id: BodyPart.SHOULDERS, label: '肩膀', icon: '🦾' },
  { id: BodyPart.CORE, label: '核心', icon: '🏋️' },
  { id: BodyPart.FUNCTIONAL, label: '下肢剛性/動力鍊', icon: '👟' },
];