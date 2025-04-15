String.prototype.repeat = function (times) {
  return new Array(times + 1).join(this);
};

function indentBeauty(str, indent) {
  indent = indent | 0;

  var list = str.split(/\n/g);
  var factor = null;

  list.forEach(function (item, index) {
    list[index] = item = item.replace(/[\r|\s]+$/g, "");
    if (item == "") return;

    var match = item.match(new RegExp("^([\\t|\\s]+)", "ig"));

    if (match != null) {
      if (factor == null) {
        factor = match[0].length;
      }

      factor = Math.min(factor, match[0].length);
    } else {
      factor = 0;
    }
  });

  factor -= indent;
  var result = [];
  list.forEach(function (item) {
    if (item == "") return;

    if (factor > 0) {
      item = item.substr(factor);
    } else {
      item = " ".repeat(Math.abs(factor)) + item;
    }
    result.push(item);
  });

  return result.join("\n");
}
function strHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function init() {
  // Navigation
  document.querySelectorAll('#nav li a').forEach((item) => {
    const href = item.getAttribute('href');
    if (href && href.startsWith('#')) {
      const rel = href.substring(1); // убираем #
      item.onclick = function (e) {
        e.preventDefault(); // чтобы не сработал переход по ссылке
        scrollToElement(rel);
      };
    }
  });

  // PrettyPrint
  var elem = document.getElementsByClassName("prettyprint");
  for (var i = 0; i < elem.length; i++) {
    var str = strHtml(indentBeauty(elem[i].innerHTML, 0));
    elem[i].innerHTML = str;
  }
  prettyPrint();

  // for Grid
  document.querySelectorAll(".lt-grid[data-stretch-last]").forEach((grid) => {
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const items = Array.from(grid.children);

    // Группировка по вертикальной позиции
    const rows = {};
    items.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (!rows[top]) rows[top] = [];
      rows[top].push(el);
    });

    const rowTops = Object.keys(rows)
      .map(parseFloat)
      .sort((a, b) => a - b);
    const lastRow = rows[rowTops[rowTops.length - 1]];

    if (!lastRow || lastRow.length === 0) return;

    const remaining = cols - lastRow.length;
    if (remaining > 0) {
      const lastItem = lastRow[lastRow.length - 1];
      lastItem.style.gridColumn = `span ${remaining + 1}`;
    }
  });
}
