import re

with open("Aivion.dc.html", "r") as f:
    content = f.read()

# 1. subtitle text
content = content.replace(
    'Мы готовим почву под весь ваш бизнес сразу — собираем контекст и данные. Но засеваем сначала один «квадрат»: запускаем одного агента. Дальше каждый следующий агент дешевле — почва уже вспахана.',
    'Мы готовим почву под весь ваш бизнес сразу. Запускаем одного агента. Дальше каждый следующий агент дешевле'
)

# 2. remove Daily brief link
content = re.sub(
    r'<div data-reveal="" data-d="1" onClick="\{\{ goDailyLink \}\}" style="margin-bottom:clamp\(40px,5vw,64px\);display:flex;align-items:center;gap:14px;flex-wrap:wrap;border-left:2px solid var\(--acc,#fff\);padding:14px 22px;background:rgba\(47,208,138,\.04\);cursor:pointer"><span style="color:rgba\(var\(--ink\),\.72\);font-size:16px;line-height:1\.5"><span class="av-acc" style="font-weight:600">Daily Brief</span> — входная точка в AIOS \(слой Intelligence\)\. Уже пользуетесь сводкой\? Следующий шаг — отсюда →</span></div>\n+',
    '', content
)

# 3. remove AIOS toggle
content = re.sub(
    r'<div style="display:inline-flex;border:1px solid rgba\(var\(--ink\),\.16\);padding:5px;gap:4px">\s*<button onClick="\{\{ aios\.toggleAios \}\}"[^>]+>AIOS</button>\s*<button onClick="\{\{ aios\.toggleNoAios \}\}"[^>]+>Без AIOS</button>\s*</div>\n+',
    '', content
)

# 4. remove AIOS from price
content = content.replace(
    'При 10 агентах на общем контексте AIOS цена за агента падает до',
    'При 10 агентах цена за агента падает до'
)

# 5. change small blocks
content = content.replace('ПОЧВА · слои 1–2', 'слои 1–2')
content = content.replace('ВСХОДЫ · слои 3–4', 'слои 3–4')
content = content.replace('УРОЖАЙ · слой 5', 'слой 5')
content = content.replace(
    'Каждое утро — короткая сводка: что произошло, где провисло, что улучшить. Рутина начинает выполняться сама.',
    'Внедряем автоматизации, где каждый новый агент умеет работать с остальными.'
)

# 6. fix withAios logic
content = content.replace(
    'const pricePct = withAios ? [100, 45, 20][lv] : 100;',
    'const pricePct = [100, 45, 20][lv];'
)
content = re.sub(
    r'const withAios = this\.state\.withAios !== false;\n\s*',
    '', content
)

content = re.sub(
    r'withAios, toggleAios: \(\) => this\.setState\(\{ withAios: true \}\), toggleNoAios: \(\) => this\.setState\(\{ withAios: false \}\),\s*aiosBg: withAios \? \'var\(--acc,#fff\)\' : \'transparent\', aiosTx: withAios \? \'var\(--ctaTx,#06140E\)\' : \'rgba\(var\(--ink\),\.6\)\',\s*noAiosBg: !withAios \? \'var\(--acc,#fff\)\' : \'transparent\', noAiosTx: !withAios \? \'var\(--ctaTx,#06140E\)\' : \'rgba\(var\(--ink\),\.6\)\',\s*priceNote: withAios \? \'при общем контексте бизнеса\' : \'без общего контекста — каждый агент отдельно\',',
    "priceNote: 'при общем контексте бизнеса',",
    content
)

with open("Aivion.dc.html", "w") as f:
    f.write(content)
