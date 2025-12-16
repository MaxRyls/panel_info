// ===== Toast =====
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
let toastTimer = null;

function showToast(msg){
  toastText.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

// ===== Tabs =====
function activateTab(target){
  document.querySelectorAll(".tab-button").forEach(b => {
    const isActive = b.dataset.tab === target;
    b.classList.toggle("active", isActive);
    b.setAttribute("aria-selected", String(isActive));
  });

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  const el = document.getElementById("tab-" + target);
  if (el) el.classList.add("active");
}

document.querySelectorAll(".tab-button").forEach(btn => {
  btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activateTab(btn.dataset.tab);
    }
  });
});

// ===== Buttons (tab 1, 3) =====
document.getElementById("btnExport").addEventListener("click", () => {
  showToast("Имитируем выгрузку данных по фильтрам");
});

document.getElementById("btnBuildChart").addEventListener("click", () => {
  showToast("График будет подключён позже (сейчас заглушка)");
});

document.getElementById("btnManualLoad").addEventListener("click", () => {
  const op = document.getElementById("manualOpType").value;
  const d = document.getElementById("manualDate").value || "выбранную дату";
  showToast("Ручная загрузка: " + op + " на " + d);
});

// ===== Analytics: без рандома =====
const analyticsBody = document.getElementById("analyticsBody");
const analyticsHeaderRow = document.getElementById("analyticsHeaderRow");
const btnAddOffice = document.getElementById("btnAddOffice");
const btnAddOperationRow = document.getElementById("btnAddOperationRow");

const operationOptions = [
  "Открытие вклада",
  "Выдача кредита",
  "Перевод",
  "Снятие наличных",
  "Продажа страховки"
];

function createOperationSelect(){
  const s = document.createElement("select");
  operationOptions.forEach(x => {
    const o = document.createElement("option");
    o.textContent = x;
    s.appendChild(o);
  });
  return s;
}

function addOperationRow(){
  const tr = document.createElement("tr");

  const tdOp = document.createElement("td");
  tdOp.appendChild(createOperationSelect());
  tr.appendChild(tdOp);

  const officeCount = analyticsHeaderRow.children.length - 1;
  for (let i=0; i<officeCount; i++){
    const td = document.createElement("td");
    td.textContent = "—";
    tr.appendChild(td);
  }

  analyticsBody.appendChild(tr);
}

function addOfficeColumn(){
  const th = document.createElement("th");
  const s = document.createElement("select");

  ["Офис Москва","Офис Санкт-Петербург","Офис Региональный","Офис Онлайн","Офис Дистанционный"]
    .forEach(name => {
      const o = document.createElement("option");
      o.textContent = name;
      s.appendChild(o);
    });

  th.appendChild(s);
  analyticsHeaderRow.appendChild(th);

  analyticsBody.querySelectorAll("tr").forEach(row => {
    const td = document.createElement("td");
    td.textContent = "—";
    row.appendChild(td);
  });
}

btnAddOffice.addEventListener("click", () => {
  addOfficeColumn();
  showToast("Добавлен столбец офис");
});

btnAddOperationRow.addEventListener("click", () => {
  addOperationRow();
  showToast("Добавлена строка операции");
});

// старт: 1 строка операции (как просил)
addOperationRow();

// сводка (тип клиента/время)
const analyticsClientType = document.getElementById("analyticsClientType");
const analyticsTime = document.getElementById("analyticsTime");
const summaryClientType = document.getElementById("summaryClientType");
const summaryTime = document.getElementById("summaryTime");

function refreshSummary(){
  summaryClientType.textContent = analyticsClientType.value;
  summaryTime.textContent = analyticsTime.value;
}
analyticsClientType.addEventListener("change", refreshSummary);
analyticsTime.addEventListener("change", refreshSummary);
refreshSummary();
