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

// Replace the sc-html logic with an sc-if condition using the label
// Wait, the review suggested: "conditionally rendered standard HTML based on the caseData.label."

const oldModalContentStr = `        <sc-if value="{{ caseData.content }}">
          <div style="border-top:1px solid rgba(var(--ink),.12);padding-top:24px">
            <sc-html value="{{ caseData.content }}"></sc-html>
          </div>
        </sc-if>
      </div>`;

const newModalContentStr = `        <sc-if value="{{ caseData.label === 'КЕЙС · К—01' }}">
          <div style="border-top:1px solid rgba(var(--ink),.12);padding-top:24px">
${contentHTML}
          </div>
        </sc-if>
      </div>`;

html = html.replace(oldModalContentStr, newModalContentStr);

fs.writeFileSync('/app/Aivion.dc.html', html, 'utf8');
