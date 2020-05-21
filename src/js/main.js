let startBtn = document.getElementById("start"),
  budgetValue = document.getElementsByClassName("budget-value")[0],
  dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
  levelValue = document.getElementsByClassName("level-value")[0],
  expensesValue = document.getElementsByClassName("expenses-value")[0],
  optionalExpensesValue = document.getElementsByClassName(
    "optionalexpenses-value"
  )[0],
  incomeValue = document.getElementsByClassName("income-value")[0],
  monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
  yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],
  expensesItem = document.getElementsByClassName("expenses-item"),
  expensesBtn = document.getElementsByTagName("button")[0],
  optionalexpensesBtn = document.getElementsByTagName("button")[1],
  countBtn = document.getElementsByTagName("button")[2],
  optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
  incomeItem = document.querySelector(".choose-income"),
  checkSavings = document.querySelector("#savings"),
  sumValue = document.querySelector(".choose-sum"),
  percentValue = document.querySelector(".choose-percent"),
  yearValue = document.querySelector(".year-value"),
  monthValue = document.querySelector(".month-value"),
  dayValue = document.querySelector(".day-value");

let money, time;

startBtn.addEventListener("click", function () {
  time = prompt("Enter date in format YYYY-MM-DD", ""); //получаем данные от пользователя
  money = +prompt("What is your budget for one month?", "");

  while (isNaN(money) || money == "" || money == null) {
    money = +prompt("What is your budget for one month?", "");
  }
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear(); //у ОБЪЕКТА Date есть метод parse. Мы получили данные time, которые будут обработаны командов  Date.parse.Эти данные превратятся в кол-во милисекунд, которые прошли с1970 года. Потом эти милисекунды используются для получения даты.Чтобы получить год из этой даты нужен метод getFullYear()
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1; // то же самое, что иgetFullYear но тперь для месяцев. Прибавляем еденицу, т.к все месяцы в JS начинаются с 0;
  dayValue.value = new Date(Date.parse(time)).getDate(); //получим день текущего месяца, его номер
});

expensesBtn.addEventListener("click", function () {
  let sum = 0;

  for (let i = 0; i < expensesItem.length; i++) {
    // цикл, работающий при любом кол-ве input
    let a = expensesItem[i].value, // с паомощью метода value, используем введенное значение
      b = expensesItem[++i].value; // с помощью префиксного инкремента ++, для того чтобы получить сразу следующий за ним элемент

    if (
      typeof a === "string" &&
      typeof a != null &&
      typeof b != null &&
      a != "" &&
      b != "" &&
      a.length < 50
    ) {
      console.log("done");
      appData.expenses[a] = b; // в глобавальный объект appData попадает значение с ключом a, и со значение b
      sum += +b; // с помощью +=  прибавляем к сумме значение b// +b для передачи именно числа, нужен префиксный инкремент
    } else {
      i = i - 1;
    }
  }
  expensesValue.textContent = sum;
});

optionalexpensesBtn.addEventListener("click", function () {
  for (let i = 0; i < optionalExpensesItem.length; i++) {
    let opt = optionalExpensesItem[i].value;
    appData.optionalExpenses[i] = opt;
    optionalExpensesValue.textContent += appData.optionalExpenses[i] + " "; //формируем динамическое значение, спомощью данных, полученный в цикле
  }
});



countBtn.addEventListener("click", function () {
  if (appData.budget != undefined) {
    appData.moneyPerDay = (appData.budget / 30).toFixed(); // записываем в глобальный объект и округляем до ближайшего целого значения
    dayBudgetValue.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay < 100) {
      levelValue.textContent = "Low income";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      levelValue.textContent = "Average income";
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = "High income";
    } else {
      levelValue.textContent = "error";
    }
  } else {
    dayBudgetValue.textContent = 'Must click Start Calculation';
  }
});

incomeItem.addEventListener('input', function () { //событие input 1) все значения, прописанные в поле input, сразу же отображатся в массиве. 2) событие change - все данные прописываются в массиве, только после того, как курсор сменит ацент на любом другом элементе(например кликаем в другое поле)
  let items = incomeItem.value;
  appData.income = items.split(", "); // вводим полчунное значение  в массив в глобальном объекте через запятую
  incomeValue.textContent = appData.income; // при ввдение данных поле его данные тут же передаются и прописываются в массиве
});

checkSavings.addEventListener('click', function () {
  if (appData.savings == true) { // если чекбокс равен true
    appData.savings = false; // то мы его выключаем
  } else {
    appData.savings = true;
  }
});

sumValue.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = +sumValue.value,
      percent = +percentValue.value;

    appData.monthIncome = sum / 100 / 12 * percent; //расчитваем на один месяц
    appData.yearIncome = sum / 100 * percent; // расчитываем на один год


    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

percentValue.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = +sumValue.value,
      percent = +percentValue.value;

    appData.monthIncome = sum / 100 / 12 * percent; //расчитваем на один месяц
    appData.yearIncome = sum / 100 * percent; // расчитываем на один год


    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false
};
