// Source metadata: CSGO Nades / esports.clash.gg, CS2-only records. Reviewed 2026-11-09.
// Aiming references are in the linked author's video; no in-game patch verification is claimed.
export type MapId = 'mirage' | 'dust2' | 'anubis' | 'overpass' | 'nuke';
export type Side = 't' | 'ct';
export type Zone = 'a' | 'b' | 'mid';
export type Grenade = { id:string; title:string; type:'smoke'|'flash'|'molotov'|'he'; from:string; to:string; steps:string[]; videoUrl:string; sourceUrl:string; sourceName:string; technique:string; difficulty:'easy'|'medium'|'hard'; x:number; y:number };
export type Plan = { id:string; mapId:MapId; side:Side; zone:Zone; title:string; description:string; steps:string[]; grenades:Grenade[] };
export const maps: { id:MapId; name:string; subtitle:string; description:string; midLabel:string; accent:string }[] = [
  {
    "id": "mirage",
    "name": "Mirage",
    "subtitle": "Контроль пространства",
    "description": "Классика командных выходов: рампа, апартаменты и контроль центра.",
    "midLabel": "Мид",
    "accent": "#e8ad54"
  },
  {
    "id": "dust2",
    "name": "Dust2",
    "subtitle": "Дистанция решает",
    "description": "Лонг, шорт и тоннели: отделяй позиции защитников и выходи вместе.",
    "midLabel": "Мид",
    "accent": "#e8ad54"
  },
  {
    "id": "anubis",
    "name": "Anubis",
    "subtitle": "Вода и тайминги",
    "description": "Разделяй защиту через мост, воду и коннектор.",
    "midLabel": "Мид / мост",
    "accent": "#e8ad54"
  },
  {
    "id": "overpass",
    "name": "Overpass",
    "subtitle": "Забирай пространство",
    "description": "Работай с парком, туалетами и подходами к B.",
    "midLabel": "Мид / парк",
    "accent": "#e8ad54"
  },
  {
    "id": "nuke",
    "name": "Nuke",
    "subtitle": "Два уровня игры",
    "description": "Улица и рампа открывают переходы между верхним и нижним плентом.",
    "midLabel": "Outside / улица",
    "accent": "#e8ad54"
  }
];
export const plans: Plan[] = [
  {
    "id": "mirage-t-a",
    "mapId": "mirage",
    "side": "t",
    "zone": "a",
    "title": "Выход на плент A",
    "description": "Командный план за T: плент A. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: T Spawn → Ticket Booth. Назначьте игрока и предупредите команду.",
      "Поддержка: T Spawn → Stairs. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "mirage-t-a-1",
        "title": "Смок → Ticket Booth",
        "type": "smoke",
        "to": "Ticket Booth",
        "steps": [
          "Займи позицию T Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Ticket Booth; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=dlWQ5CvI50M",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-ticketbooth-smoke-3",
        "sourceName": "CSGO Nades / ZywooDaddy",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 40,
        "from": "T Spawn"
      },
      {
        "id": "mirage-t-a-2",
        "title": "Смок → Stairs",
        "type": "smoke",
        "to": "Stairs",
        "steps": [
          "Займи позицию T Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Stairs; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=O_s6kcSu5vk",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-stairs-smoke-17",
        "sourceName": "CSGO Nades / tabztar",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 40,
        "from": "T Spawn"
      }
    ]
  },
  {
    "id": "mirage-t-b",
    "mapId": "mirage",
    "side": "t",
    "zone": "b",
    "title": "Выход на плент B",
    "description": "Командный план за T: плент B. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Back Alley → Market Window. Назначьте игрока и предупредите команду.",
      "Поддержка: Back Alley →  Market Door. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "mirage-t-b-1",
        "title": "Смок → Market Window",
        "type": "smoke",
        "to": "Market Window",
        "steps": [
          "Займи позицию Back Alley, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Market Window; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=2ptE605BU8Q",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-market-window-smoke",
        "sourceName": "CSGO Nades / tabztar",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 48,
        "from": "Back Alley"
      },
      {
        "id": "mirage-t-b-2",
        "title": "Смок →  Market Door",
        "type": "smoke",
        "to": " Market Door",
        "steps": [
          "Займи позицию Back Alley, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в  Market Door; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=L92OxG7YMF0",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-marketdoor-smoke",
        "sourceName": "CSGO Nades / SPAGHETTICARBONARA",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 48,
        "from": "Back Alley"
      }
    ]
  },
  {
    "id": "mirage-t-mid",
    "mapId": "mirage",
    "side": "t",
    "zone": "mid",
    "title": "Контроль: Мид",
    "description": "Командный план за T: Мид. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: T Spawn → Mid Window. Назначьте игрока и предупредите команду.",
      "Поддержка: T Spawn → Top Connector. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "mirage-t-mid-1",
        "title": "Смок → Mid Window",
        "type": "smoke",
        "to": "Mid Window",
        "steps": [
          "Займи позицию T Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Движение: running.",
          "В тренировке проверь приземление в Mid Window; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=SttdsZCVA-Y",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-midwindow-smoke-4",
        "sourceName": "CSGO Nades / raiseoff",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 56,
        "from": "T Spawn"
      },
      {
        "id": "mirage-t-mid-2",
        "title": "Смок → Top Connector",
        "type": "smoke",
        "to": "Top Connector",
        "steps": [
          "Займи позицию T Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Top Connector; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=iMOfoEAGR4Q",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-topconnector-smoke",
        "sourceName": "CSGO Nades / tabztar",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 56,
        "from": "T Spawn"
      }
    ]
  },
  {
    "id": "mirage-ct-a",
    "mapId": "mirage",
    "side": "ct",
    "zone": "a",
    "title": "Удержание: плент A",
    "description": "Командный план за CT: плент A. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: CT Spawn → A Ramp. Назначьте игрока и предупредите команду.",
      "Поддержка: CT Stairs → Tetris. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "mirage-ct-a-1",
        "title": "Смок → A Ramp",
        "type": "smoke",
        "to": "A Ramp",
        "steps": [
          "Займи позицию CT Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в A Ramp; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=v3aOBDQr6JQ",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-aramp-smoke-3",
        "sourceName": "CSGO Nades / elsim",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 40,
        "from": "CT Spawn"
      },
      {
        "id": "mirage-ct-a-2",
        "title": "Смок → Tetris",
        "type": "smoke",
        "to": "Tetris",
        "steps": [
          "Займи позицию CT Stairs, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Tetris; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=hfn94wZccLY",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-tetris-smoke-2",
        "sourceName": "CSGO Nades / No1ACTIVESHOOTR",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 40,
        "from": "CT Stairs"
      }
    ]
  },
  {
    "id": "mirage-ct-b",
    "mapId": "mirage",
    "side": "ct",
    "zone": "b",
    "title": "Удержание: плент B",
    "description": "Командный план за CT: плент B. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: CT Spawn → B Apps. Назначьте игрока и предупредите команду.",
      "Поддержка: Behind Vent → Deep B Apps. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "mirage-ct-b-1",
        "title": "Смок → B Apps",
        "type": "smoke",
        "to": "B Apps",
        "steps": [
          "Займи позицию CT Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Движение: walking.",
          "В тренировке проверь приземление в B Apps; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=RzWQ49BbH-M",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-bapps-smoke-3",
        "sourceName": "CSGO Nades / rasco",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 48,
        "from": "CT Spawn"
      },
      {
        "id": "mirage-ct-b-2",
        "title": "Смок → Deep B Apps",
        "type": "smoke",
        "to": "Deep B Apps",
        "steps": [
          "Займи позицию Behind Vent, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Deep B Apps; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=8y_MdBVi3L0",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-deepbapps-smoke",
        "sourceName": "CSGO Nades / elsim",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 48,
        "from": "Behind Vent"
      }
    ]
  },
  {
    "id": "mirage-ct-mid",
    "mapId": "mirage",
    "side": "ct",
    "zone": "mid",
    "title": "Удержание: Мид",
    "description": "Командный план за CT: Мид. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: CT Spawn → Top Mid. Назначьте игрока и предупредите команду.",
      "Поддержка: Mid Window → Bottom Mid. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "mirage-ct-mid-1",
        "title": "Смок → Top Mid",
        "type": "smoke",
        "to": "Top Mid",
        "steps": [
          "Займи позицию CT Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Top Mid; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=b5YIG7G9v1g",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-topmid-smoke-6",
        "sourceName": "CSGO Nades / Esteba",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 56,
        "from": "CT Spawn"
      },
      {
        "id": "mirage-ct-mid-2",
        "title": "Флешка → Bottom Mid",
        "type": "flash",
        "to": "Bottom Mid",
        "steps": [
          "Займи позицию Mid Window, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Bottom Mid; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=Va65RYz6LWA",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-mirage-bottommid-flash",
        "sourceName": "CSGO Nades / Perluwu",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 56,
        "from": "Mid Window"
      }
    ]
  },
  {
    "id": "dust2-t-a",
    "mapId": "dust2",
    "side": "t",
    "zone": "a",
    "title": "Выход на плент A",
    "description": "Командный план за T: плент A. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Long → Cross. Назначьте игрока и предупредите команду.",
      "Поддержка: Long → CT Spawn. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "dust2-t-a-1",
        "title": "Смок → Cross",
        "type": "smoke",
        "to": "Cross",
        "steps": [
          "Займи позицию Long, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ + ПКМ в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Cross; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=9uZxJYgNHlE",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-cross-smoke-4",
        "sourceName": "CSGO Nades / curlyfriis",
        "technique": "ЛКМ + ПКМ в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 40,
        "from": "Long"
      },
      {
        "id": "dust2-t-a-2",
        "title": "Смок → CT Spawn",
        "type": "smoke",
        "to": "CT Spawn",
        "steps": [
          "Займи позицию Long, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в CT Spawn; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=neAvfJFu2fY",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-ctspawn-smoke-3",
        "sourceName": "CSGO Nades / nofvix9",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 40,
        "from": "Long"
      }
    ]
  },
  {
    "id": "dust2-t-b",
    "mapId": "dust2",
    "side": "t",
    "zone": "b",
    "title": "Выход на плент B",
    "description": "Командный план за T: плент B. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Upper Tunnels → B Doors. Назначьте игрока и предупредите команду.",
      "Поддержка: Upper Tunnels → B Window. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "dust2-t-b-1",
        "title": "Смок → B Doors",
        "type": "smoke",
        "to": "B Doors",
        "steps": [
          "Займи позицию Upper Tunnels, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в B Doors; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=mAhgwjfDvJU",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-bdoors-smoke-4",
        "sourceName": "CSGO Nades / nofvix9",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 35,
        "y": 48,
        "from": "Upper Tunnels"
      },
      {
        "id": "dust2-t-b-2",
        "title": "Смок → B Window",
        "type": "smoke",
        "to": "B Window",
        "steps": [
          "Займи позицию Upper Tunnels, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в B Window; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=YzSYNoFqGJA",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-bwindow-smoke-4",
        "sourceName": "CSGO Nades / Ky1e",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 48,
        "from": "Upper Tunnels"
      }
    ]
  },
  {
    "id": "dust2-t-mid",
    "mapId": "dust2",
    "side": "t",
    "zone": "mid",
    "title": "Контроль: Мид",
    "description": "Командный план за T: Мид. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: T Spawn → X-Box. Назначьте игрока и предупредите команду.",
      "Поддержка: T Spawn → Mid Doors. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "dust2-t-mid-1",
        "title": "Смок → X-Box",
        "type": "smoke",
        "to": "X-Box",
        "steps": [
          "Займи позицию T Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в X-Box; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=usPQQ222uFg",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-x-box-smoke-3",
        "sourceName": "CSGO Nades / Jonas",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 56,
        "from": "T Spawn"
      },
      {
        "id": "dust2-t-mid-2",
        "title": "Смок → Mid Doors",
        "type": "smoke",
        "to": "Mid Doors",
        "steps": [
          "Займи позицию T Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Mid Doors; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=vnKH4ncvA4c",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-middoors-smoke",
        "sourceName": "CSGO Nades / Jonas",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 56,
        "from": "T Spawn"
      }
    ]
  },
  {
    "id": "dust2-ct-a",
    "mapId": "dust2",
    "side": "ct",
    "zone": "a",
    "title": "Удержание: плент A",
    "description": "Командный план за CT: плент A. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Elevator → Long Doors. Назначьте игрока и предупредите команду.",
      "Поддержка: A Site → Short. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "dust2-ct-a-1",
        "title": "Смок → Long Doors",
        "type": "smoke",
        "to": "Long Doors",
        "steps": [
          "Займи позицию Elevator, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Long Doors; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=K8RCqmqWFi0",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-longdoors-smoke",
        "sourceName": "CSGO Nades / SPAGHETTICARBONARA",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 40,
        "from": "Elevator"
      },
      {
        "id": "dust2-ct-a-2",
        "title": "Смок → Short",
        "type": "smoke",
        "to": "Short",
        "steps": [
          "Займи позицию A Site, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Short; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=j9ytqZVyfAQ",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-short-smoke",
        "sourceName": "CSGO Nades / nofvix9",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 40,
        "from": "A Site"
      }
    ]
  },
  {
    "id": "dust2-ct-b",
    "mapId": "dust2",
    "side": "ct",
    "zone": "b",
    "title": "Удержание: плент B",
    "description": "Командный план за CT: плент B. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: CT Mid → Tunnels. Назначьте игрока и предупредите команду.",
      "Поддержка: CT Mid → B Site. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "dust2-ct-b-1",
        "title": "Смок → Tunnels",
        "type": "smoke",
        "to": "Tunnels",
        "steps": [
          "Займи позицию CT Mid, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Tunnels; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=o9GHB0owaFo",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-tunnels-smoke",
        "sourceName": "CSGO Nades / nofvix9",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 48,
        "from": "CT Mid"
      },
      {
        "id": "dust2-ct-b-2",
        "title": "Флешка → B Site",
        "type": "flash",
        "to": "B Site",
        "steps": [
          "Займи позицию CT Mid, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в B Site; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=MdOoyTPGRSw",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-bsite-flash-3",
        "sourceName": "CSGO Nades / nofvix9",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 48,
        "from": "CT Mid"
      }
    ]
  },
  {
    "id": "dust2-ct-mid",
    "mapId": "dust2",
    "side": "ct",
    "zone": "mid",
    "title": "Удержание: Мид",
    "description": "Командный план за CT: Мид. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: CT Mid → Top Mid. Назначьте игрока и предупредите команду.",
      "Поддержка: Short → Mid. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "dust2-ct-mid-1",
        "title": "Смок → Top Mid",
        "type": "smoke",
        "to": "Top Mid",
        "steps": [
          "Займи позицию CT Mid, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Top Mid; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=yQk1BVm6imE",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-topmid-smoke",
        "sourceName": "CSGO Nades / SPAGHETTICARBONARA",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 56,
        "from": "CT Mid"
      },
      {
        "id": "dust2-ct-mid-2",
        "title": "Флешка → Mid",
        "type": "flash",
        "to": "Mid",
        "steps": [
          "Займи позицию Short, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Mid; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=tuj2ewQJifc",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-dust2-mid-flash",
        "sourceName": "CSGO Nades / nofvix9",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 56,
        "from": "Short"
      }
    ]
  },
  {
    "id": "anubis-t-a",
    "mapId": "anubis",
    "side": "t",
    "zone": "a",
    "title": "Выход на плент A",
    "description": "Командный план за T: плент A. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Boat → Heaven. Назначьте игрока и предупредите команду.",
      "Поддержка: Long → A Site. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "anubis-t-a-1",
        "title": "Смок → Heaven",
        "type": "smoke",
        "to": "Heaven",
        "steps": [
          "Займи позицию Boat, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Heaven; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=PIbGoT-IZmc",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-heaven-smoke-6",
        "sourceName": "CSGO Nades / Bufo",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 40,
        "from": "Boat"
      },
      {
        "id": "anubis-t-a-2",
        "title": "Флешка → A Site",
        "type": "flash",
        "to": "A Site",
        "steps": [
          "Займи позицию Long, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в A Site; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=XVVBEjZOy-U",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-asite-flash",
        "sourceName": "CSGO Nades / SoNiQz",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 40,
        "from": "Long"
      }
    ]
  },
  {
    "id": "anubis-t-b",
    "mapId": "anubis",
    "side": "t",
    "zone": "b",
    "title": "Выход на плент B",
    "description": "Командный план за T: плент B. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: T Spawn → Connector. Назначьте игрока и предупредите команду.",
      "Поддержка: Long → Backsite B. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "anubis-t-b-1",
        "title": "Смок → Connector",
        "type": "smoke",
        "to": "Connector",
        "steps": [
          "Займи позицию T Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Connector; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=aAmw-3-m2Ug",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-connector-smoke",
        "sourceName": "CSGO Nades / SPAGHETTICARBONARA",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 48,
        "from": "T Spawn"
      },
      {
        "id": "anubis-t-b-2",
        "title": "Смок → Backsite B",
        "type": "smoke",
        "to": "Backsite B",
        "steps": [
          "Займи позицию Long, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Backsite B; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=tt_aM9PZac4",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-backsiteb-smoke-2",
        "sourceName": "CSGO Nades / Xans",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 48,
        "from": "Long"
      }
    ]
  },
  {
    "id": "anubis-t-mid",
    "mapId": "anubis",
    "side": "t",
    "zone": "mid",
    "title": "Контроль: Мид / мост",
    "description": "Командный план за T: Мид / мост. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Top Mid → Mid Palace. Назначьте игрока и предупредите команду.",
      "Поддержка: T Spawn → Window. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "anubis-t-mid-1",
        "title": "Смок → Mid Palace",
        "type": "smoke",
        "to": "Mid Palace",
        "steps": [
          "Займи позицию Top Mid, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Mid Palace; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=35efl7tF4Ak",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-midpalace-smoke-5",
        "sourceName": "CSGO Nades / elsim",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 56,
        "from": "Top Mid"
      },
      {
        "id": "anubis-t-mid-2",
        "title": "Смок → Window",
        "type": "smoke",
        "to": "Window",
        "steps": [
          "Займи позицию T Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Window; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=yWp0eHTqwcE",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-window-smoke-5",
        "sourceName": "CSGO Nades / elsim",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 56,
        "from": "T Spawn"
      }
    ]
  },
  {
    "id": "anubis-ct-a",
    "mapId": "anubis",
    "side": "ct",
    "zone": "a",
    "title": "Удержание: плент A",
    "description": "Командный план за CT: плент A. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: CT Spawn → A Main. Назначьте игрока и предупредите команду.",
      "Поддержка: CT → A-main. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "anubis-ct-a-1",
        "title": "Смок → A Main",
        "type": "smoke",
        "to": "A Main",
        "steps": [
          "Займи позицию CT Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в A Main; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=ulFHm-uK9Ig",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-amain-smoke-8",
        "sourceName": "CSGO Nades / elsim",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 40,
        "from": "CT Spawn"
      },
      {
        "id": "anubis-ct-a-2",
        "title": "Смок → A-main",
        "type": "smoke",
        "to": "A-main",
        "steps": [
          "Займи позицию CT, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в A-main; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=0ZNLuk33J_0",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-a-main-smoke",
        "sourceName": "CSGO Nades / SPAGHETTICARBONARA",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 40,
        "from": "CT"
      }
    ]
  },
  {
    "id": "anubis-ct-b",
    "mapId": "anubis",
    "side": "ct",
    "zone": "b",
    "title": "Удержание: плент B",
    "description": "Командный план за CT: плент B. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: CT Spawn → B Main. Назначьте игрока и предупредите команду.",
      "Поддержка: Street → B Site. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "anubis-ct-b-1",
        "title": "Смок → B Main",
        "type": "smoke",
        "to": "B Main",
        "steps": [
          "Займи позицию CT Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в B Main; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=JdO5nAOIqGw",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-bmain-smoke-4",
        "sourceName": "CSGO Nades / Pedrofox",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 48,
        "from": "CT Spawn"
      },
      {
        "id": "anubis-ct-b-2",
        "title": "Флешка → B Site",
        "type": "flash",
        "to": "B Site",
        "steps": [
          "Займи позицию Street, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Движение: crouching.",
          "В тренировке проверь приземление в B Site; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=lV9Ty3zpy6Q",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-bsite-flash-7",
        "sourceName": "CSGO Nades / rasco",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 48,
        "from": "Street"
      }
    ]
  },
  {
    "id": "anubis-ct-mid",
    "mapId": "anubis",
    "side": "ct",
    "zone": "mid",
    "title": "Удержание: Мид / мост",
    "description": "Командный план за CT: Мид / мост. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: CT Spawn → Bridge. Назначьте игрока и предупредите команду.",
      "Поддержка: CT Spawn → Top Mid. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "anubis-ct-mid-1",
        "title": "Смок → Bridge",
        "type": "smoke",
        "to": "Bridge",
        "steps": [
          "Займи позицию CT Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Bridge; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=qIr0OLw3GPM",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-bridge-smoke-6",
        "sourceName": "CSGO Nades / Pedrofox",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 56,
        "from": "CT Spawn"
      },
      {
        "id": "anubis-ct-mid-2",
        "title": "Смок → Top Mid",
        "type": "smoke",
        "to": "Top Mid",
        "steps": [
          "Займи позицию CT Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Top Mid; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=Pxf0swD3678",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-anubis-topmid-smoke-3",
        "sourceName": "CSGO Nades / FuzzyHat",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 56,
        "from": "CT Spawn"
      }
    ]
  },
  {
    "id": "overpass-t-a",
    "mapId": "overpass",
    "side": "t",
    "zone": "a",
    "title": "Выход на плент A",
    "description": "Командный план за T: плент A. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: A Short → Bank. Назначьте игрока и предупредите команду.",
      "Поддержка: Divider → A Stairs. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "overpass-t-a-1",
        "title": "Смок → Bank",
        "type": "smoke",
        "to": "Bank",
        "steps": [
          "Займи позицию A Short, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Bank; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=uVfAYmmFZJw",
        "sourceUrl": "https://esports.clash.gg/nades/nades/overpass-bank-smoke-7",
        "sourceName": "CSGO Nades / nadia",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 40,
        "from": "A Short"
      },
      {
        "id": "overpass-t-a-2",
        "title": "Смок → A Stairs",
        "type": "smoke",
        "to": "A Stairs",
        "steps": [
          "Займи позицию Divider, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в A Stairs; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=e2ImJk_pX3k",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-astairs-smoke-3",
        "sourceName": "CSGO Nades / SPAGHETTICARBONARA",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 40,
        "from": "Divider"
      }
    ]
  },
  {
    "id": "overpass-t-b",
    "mapId": "overpass",
    "side": "t",
    "zone": "b",
    "title": "Выход на плент B",
    "description": "Командный план за T: плент B. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Alley → Heaven. Назначьте игрока и предупредите команду.",
      "Поддержка: Tracks → Barrels. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "overpass-t-b-1",
        "title": "Смок → Heaven",
        "type": "smoke",
        "to": "Heaven",
        "steps": [
          "Займи позицию Alley, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Шаг вперёд + бросок в прыжке. Движение: running.",
          "В тренировке проверь приземление в Heaven; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=rDJJ8VraM4w",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-heaven-smoke-10",
        "sourceName": "CSGO Nades / elsim",
        "technique": "Шаг вперёд + бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 48,
        "from": "Alley"
      },
      {
        "id": "overpass-t-b-2",
        "title": "Смок → Barrels",
        "type": "smoke",
        "to": "Barrels",
        "steps": [
          "Займи позицию Tracks, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Barrels; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=K8vs8QGF_1I",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-barrels-smoke-3",
        "sourceName": "CSGO Nades / Esteba",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 48,
        "from": "Tracks"
      }
    ]
  },
  {
    "id": "overpass-t-mid",
    "mapId": "overpass",
    "side": "t",
    "zone": "mid",
    "title": "Контроль: Мид / парк",
    "description": "Командный план за T: Мид / парк. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Alley → Divider. Назначьте игрока и предупредите команду.",
      "Поддержка: T Stairs → Top Connector. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "overpass-t-mid-1",
        "title": "Смок → Divider",
        "type": "smoke",
        "to": "Divider",
        "steps": [
          "Займи позицию Alley, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Divider; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=765gSF0UD04",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-divider-smoke-2",
        "sourceName": "CSGO Nades / AK40ozGOD",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 56,
        "from": "Alley"
      },
      {
        "id": "overpass-t-mid-2",
        "title": "Смок → Top Connector",
        "type": "smoke",
        "to": "Top Connector",
        "steps": [
          "Займи позицию T Stairs, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Top Connector; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=7s36UUWMQyQ",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-topconnector-smoke-2",
        "sourceName": "CSGO Nades / Sus",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 56,
        "from": "T Stairs"
      }
    ]
  },
  {
    "id": "overpass-ct-a",
    "mapId": "overpass",
    "side": "ct",
    "zone": "a",
    "title": "Удержание: плент A",
    "description": "Командный план за CT: плент A. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Back A → Long. Назначьте игрока и предупредите команду.",
      "Поддержка: A Site → Ramp. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "overpass-ct-a-1",
        "title": "Смок → Long",
        "type": "smoke",
        "to": "Long",
        "steps": [
          "Займи позицию Back A, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Long; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=eK8UjwQrYxs",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-long-smoke-2",
        "sourceName": "CSGO Nades / W1ggen",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 35,
        "y": 40,
        "from": "Back A"
      },
      {
        "id": "overpass-ct-a-2",
        "title": "Смок → Ramp",
        "type": "smoke",
        "to": "Ramp",
        "steps": [
          "Займи позицию A Site, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Шаг вперёд + бросок в прыжке. Движение: running.",
          "В тренировке проверь приземление в Ramp; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=uNxYBVKlpAs",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-ramp-smoke-2",
        "sourceName": "CSGO Nades / elsim",
        "technique": "Шаг вперёд + бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 40,
        "from": "A Site"
      }
    ]
  },
  {
    "id": "overpass-ct-b",
    "mapId": "overpass",
    "side": "ct",
    "zone": "b",
    "title": "Удержание: плент B",
    "description": "Командный план за CT: плент B. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: A Site → Monster. Назначьте игрока и предупредите команду.",
      "Поддержка: A Site → Pipe. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "overpass-ct-b-1",
        "title": "Смок → Monster",
        "type": "smoke",
        "to": "Monster",
        "steps": [
          "Займи позицию A Site, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Monster; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=GKfKfcQJrZU",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-monster-smoke-11",
        "sourceName": "CSGO Nades / NANI",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 48,
        "from": "A Site"
      },
      {
        "id": "overpass-ct-b-2",
        "title": "Смок → Pipe",
        "type": "smoke",
        "to": "Pipe",
        "steps": [
          "Займи позицию A Site, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Pipe; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=Znmv_zoFZFU",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-pipe-smoke-7",
        "sourceName": "CSGO Nades / Sus",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 48,
        "from": "A Site"
      }
    ]
  },
  {
    "id": "overpass-ct-mid",
    "mapId": "overpass",
    "side": "ct",
    "zone": "mid",
    "title": "Удержание: Мид / парк",
    "description": "Командный план за CT: Мид / парк. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: A Short → Party. Назначьте игрока и предупредите команду.",
      "Поддержка: A Short → Mid Stairs. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "overpass-ct-mid-1",
        "title": "Смок → Party",
        "type": "smoke",
        "to": "Party",
        "steps": [
          "Займи позицию A Short, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Party; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=QTSpHMZ7tfY",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-party-smoke",
        "sourceName": "CSGO Nades / carwashHerzenStr",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 56,
        "from": "A Short"
      },
      {
        "id": "overpass-ct-mid-2",
        "title": "Смок → Mid Stairs",
        "type": "smoke",
        "to": "Mid Stairs",
        "steps": [
          "Займи позицию A Short, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Mid Stairs; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=cJ6g-2HAlr8",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-overpass-midstairs-smoke",
        "sourceName": "CSGO Nades / carwashHerzenStr",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 56,
        "from": "A Short"
      }
    ]
  },
  {
    "id": "nuke-t-a",
    "mapId": "nuke",
    "side": "t",
    "zone": "a",
    "title": "Выход на плент A",
    "description": "Командный план за T: плент A. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: T Spawn → Main. Назначьте игрока и предупредите команду.",
      "Поддержка: T Roof → Heaven. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "nuke-t-a-1",
        "title": "Смок → Main",
        "type": "smoke",
        "to": "Main",
        "steps": [
          "Займи позицию T Spawn, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Main; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=-o5d7rdS1eo",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-main-smoke-4",
        "sourceName": "CSGO Nades / pubrob",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 40,
        "from": "T Spawn"
      },
      {
        "id": "nuke-t-a-2",
        "title": "Смок → Heaven",
        "type": "smoke",
        "to": "Heaven",
        "steps": [
          "Займи позицию T Roof, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Heaven; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=Lu_CgkRGT6o",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-heaven-smoke-7",
        "sourceName": "CSGO Nades / trickmiyoo",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 40,
        "from": "T Roof"
      }
    ]
  },
  {
    "id": "nuke-t-b",
    "mapId": "nuke",
    "side": "t",
    "zone": "b",
    "title": "Выход на плент B",
    "description": "Командный план за T: плент B. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Ramp → B Window. Назначьте игрока и предупредите команду.",
      "Поддержка: Ramp → Dark. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "nuke-t-b-1",
        "title": "Смок → B Window",
        "type": "smoke",
        "to": "B Window",
        "steps": [
          "Займи позицию Ramp, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в B Window; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=u7RopuZKIV4",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-bwindow-smoke-2",
        "sourceName": "CSGO Nades / Esteba",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 35,
        "y": 48,
        "from": "Ramp"
      },
      {
        "id": "nuke-t-b-2",
        "title": "Смок → Dark",
        "type": "smoke",
        "to": "Dark",
        "steps": [
          "Займи позицию Ramp, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Dark; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=u7RopuZKIV4",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-bwindow-smoke",
        "sourceName": "CSGO Nades / Esteba",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 48,
        "from": "Ramp"
      }
    ]
  },
  {
    "id": "nuke-t-mid",
    "mapId": "nuke",
    "side": "t",
    "zone": "mid",
    "title": "Контроль: Outside / улица",
    "description": "Командный план за T: Outside / улица. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Outside Lobby → Outside Secret. Назначьте игрока и предупредите команду.",
      "Поддержка: Outside Lobby → T Red. Выполняйте по команде, учитывая время полёта.",
      "После раскрытия гранат выходите парами и проверяйте открытые углы."
    ],
    "grenades": [
      {
        "id": "nuke-t-mid-1",
        "title": "Смок → Outside Secret",
        "type": "smoke",
        "to": "Outside Secret",
        "steps": [
          "Займи позицию Outside Lobby, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Outside Secret; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=nbwro25kZpQ",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-outsidesecret-smoke-3",
        "sourceName": "CSGO Nades / ZywooDaddy",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 56,
        "from": "Outside Lobby"
      },
      {
        "id": "nuke-t-mid-2",
        "title": "Смок → T Red",
        "type": "smoke",
        "to": "T Red",
        "steps": [
          "Займи позицию Outside Lobby, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в T Red; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=fzMqxcUU7tI",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-tred-smoke",
        "sourceName": "CSGO Nades / Catalyzzt",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 56,
        "from": "Outside Lobby"
      }
    ]
  },
  {
    "id": "nuke-ct-a",
    "mapId": "nuke",
    "side": "ct",
    "zone": "a",
    "title": "Удержание: плент A",
    "description": "Командный план за CT: плент A. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Heaven → Hut. Назначьте игрока и предупредите команду.",
      "Поддержка: A Site → Lobby. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "nuke-ct-a-1",
        "title": "Смок → Hut",
        "type": "smoke",
        "to": "Hut",
        "steps": [
          "Займи позицию Heaven, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Hut; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=yxnVRCZg7yI",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-hut-smoke-2",
        "sourceName": "CSGO Nades / curlyfriis",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 35,
        "y": 40,
        "from": "Heaven"
      },
      {
        "id": "nuke-ct-a-2",
        "title": "Флешка → Lobby",
        "type": "flash",
        "to": "Lobby",
        "steps": [
          "Займи позицию A Site, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Lobby; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=JPJfdLMqO34",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-lobby-flash",
        "sourceName": "CSGO Nades / rasco",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 40,
        "from": "A Site"
      }
    ]
  },
  {
    "id": "nuke-ct-b",
    "mapId": "nuke",
    "side": "ct",
    "zone": "b",
    "title": "Рампа → защита B",
    "description": "Командный план за CT: плент B. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Ramp → Trophy. Назначьте игрока и предупредите команду.",
      "Поддержка: Ramp → Dark. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "nuke-ct-b-1",
        "title": "Смок → Trophy",
        "type": "smoke",
        "to": "Trophy",
        "steps": [
          "Займи позицию Ramp, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Движение: running.",
          "В тренировке проверь приземление в Trophy; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=QugMopT7glI",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-trophy-smoke",
        "sourceName": "CSGO Nades / m4rio",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 35,
        "y": 48,
        "from": "Ramp"
      },
      {
        "id": "nuke-ct-b-2",
        "title": "Молотов → Dark",
        "type": "molotov",
        "to": "Dark",
        "steps": [
          "Займи позицию Ramp, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: ЛКМ. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Dark; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=HhYt8AgTNaM",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-dark-molotov-2",
        "sourceName": "CSGO Nades / Esteba",
        "technique": "ЛКМ",
        "difficulty": "easy",
        "x": 65,
        "y": 48,
        "from": "Ramp"
      }
    ]
  },
  {
    "id": "nuke-ct-mid",
    "mapId": "nuke",
    "side": "ct",
    "zone": "mid",
    "title": "Удержание: Outside / улица",
    "description": "Командный план за CT: Outside / улица. Раздайте броски между игроками; если выполняете их по очереди, сначала обеспечьте безопасный переход между позициями.",
    "steps": [
      "Подготовка: Outside Garage → Silo. Назначьте игрока и предупредите команду.",
      "Поддержка: Outside Garage → Under Silo. Выполняйте по команде, учитывая время полёта.",
      "После гранат удерживайте перекрёстный огонь; сообщайте о контакте и сохраняйте путь отхода."
    ],
    "grenades": [
      {
        "id": "nuke-ct-mid-1",
        "title": "Смок → Silo",
        "type": "smoke",
        "to": "Silo",
        "steps": [
          "Займи позицию Outside Garage, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Шаг вперёд + бросок в прыжке. Движение: crouchwalking.",
          "В тренировке проверь приземление в Silo; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=x1rM6-VJXiM",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-silo-smoke",
        "sourceName": "CSGO Nades / Esteba",
        "technique": "Шаг вперёд + бросок в прыжке",
        "difficulty": "medium",
        "x": 35,
        "y": 56,
        "from": "Outside Garage"
      },
      {
        "id": "nuke-ct-mid-2",
        "title": "Смок → Under Silo",
        "type": "smoke",
        "to": "Under Silo",
        "steps": [
          "Займи позицию Outside Garage, показанную в начале видео.",
          "Повтори положение прицела и стойку из ролика; точный ориентир смотри в видео.",
          "Выполни бросок: Бросок в прыжке. Начальная позиция — без движения.",
          "В тренировке проверь приземление в Under Silo; согласуй момент броска с командой."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=jwAgP_XML3Q",
        "sourceUrl": "https://esports.clash.gg/nades/nades/cs2-nuke-undersilo-smoke",
        "sourceName": "CSGO Nades / pubrob",
        "technique": "Бросок в прыжке",
        "difficulty": "medium",
        "x": 65,
        "y": 56,
        "from": "Outside Garage"
      }
    ]
  }
];
