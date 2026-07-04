const fs = require('fs');

const contentHTML = `
        <p style="color:rgba(var(--ink),.7);font-size:16px;line-height:1.6;margin-bottom:16px">
          <strong>Проблема:</strong> Оператор одновременно вёл разговор с клиентом и вручную вносил данные в CRM: адрес, состав заказа, комментарии по доставке и контактные детали. При потоке звонков это регулярно приводило к неточностям и потерям в качестве сервиса. Ошибки в адресах и деталях заказа напрямую влияли на SLA доставки.
        </p>
        <p style="color:rgba(var(--ink),.7);font-size:16px;line-height:1.6;margin-bottom:16px">
          <strong>Решение:</strong> Разработали AI-микросервис на FastAPI, который интегрируется с CRM и работает в фоновом режиме: автоматически забирает записи звонков, извлекает данные и возвращает структурированный JSON в нужные поля заказа. Поддерживает два режима: быстрый операционный ввод (Address Only) и расширенный контроль качества (Full Transcript).
        </p>
        <p style="color:rgba(var(--ink),.7);font-size:16px;line-height:1.6;margin-bottom:16px">
          <strong>Результат:</strong> Обработка заказа сократилась с ~2 минут до ~30 секунд (x4 скорость). Снижен процент ошибок в адресах и деталях на 70% благодаря JSON-валидации.
        </p>
`;

let html = fs.readFileSync('/app/Aivion.dc.html', 'utf8');

const oldModalContentStr = `        <div style="display:flex;align-items:baseline;gap:14px;border-top:1px solid rgba(var(--ink),.12);padding-top:20px">
          <div style="font-size:clamp(36px,4vw,54px);font-weight:700;letter-spacing:-.02em;color:var(--acc,#fff)">{{ caseData.metric }}</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(var(--ink),.45);letter-spacing:.04em">{{ caseData.metricLabel }}</div>
        </div>
      </div>`;

const newModalContentStr = `        <div style="display:flex;align-items:baseline;gap:14px;border-top:1px solid rgba(var(--ink),.12);padding-top:20px;margin-bottom:24px">
          <div style="font-size:clamp(36px,4vw,54px);font-weight:700;letter-spacing:-.02em;color:var(--acc,#fff)">{{ caseData.metric }}</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(var(--ink),.45);letter-spacing:.04em">{{ caseData.metricLabel }}</div>
        </div>
        <sc-if value="{{ caseData.content }}">
          <div style="border-top:1px solid rgba(var(--ink),.12);padding-top:24px">
            <sc-html value="{{ caseData.content }}"></sc-html>
          </div>
        </sc-if>
      </div>`;

html = html.replace(oldModalContentStr, newModalContentStr);

const oldCaseListStr = `  caseList = [
    { label: 'КЕЙС · К—01', title: 'Авторазбор телефонных звонков', desc: 'ИИ-микросервис слушает звонки, разбирает их по скрипту и находит ошибки операторов — раньше это делал человек выборочно и с задержкой в дни.', metric: '−83%', metricLabel: 'ошибок в CRM после разбора' },
    { label: 'КЕЙС · К—02', title: 'ИИ-составитель ТЗ', desc: 'Помощник собирает документацию по шаблону из брифа и голосовых заметок, снимая проблему «чистого листа» для аналитиков.', metric: '×16', metricLabel: 'скорость подготовки спецификаций' },
    { label: 'КЕЙС · К—03', title: 'Контент-завод', desc: 'Связка ИИ-агентов сама собирает, редактирует и публикует посты для Telegram по контент-плану.', metric: '×20', metricLabel: 'скорость производства контента' },
  ];`;

const newCaseListStr = `  caseList = [
    { label: 'КЕЙС · К—01', title: 'Авторазбор телефонных звонков', desc: 'ИИ-микросервис слушает звонки, разбирает их по скрипту и находит ошибки операторов — раньше это делал человек выборочно и с задержкой в дни.', metric: '−83%', metricLabel: 'ошибок в CRM после разбора', content: \`${contentHTML}\` },
    { label: 'КЕЙС · К—02', title: 'ИИ-составитель ТЗ', desc: 'Помощник собирает документацию по шаблону из брифа и голосовых заметок, снимая проблему «чистого листа» для аналитиков.', metric: '×16', metricLabel: 'скорость подготовки спецификаций' },
    { label: 'КЕЙС · К—03', title: 'Контент-завод', desc: 'Связка ИИ-агентов сама собирает, редактирует и публикует посты для Telegram по контент-плану.', metric: '×20', metricLabel: 'скорость производства контента' },
  ];`;

html = html.replace(oldCaseListStr, newCaseListStr);

fs.writeFileSync('/app/Aivion.dc.html', html, 'utf8');
