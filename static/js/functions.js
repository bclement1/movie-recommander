// Some functions used on home page.

function selectOnlyThis(id, begin, end) {
    for (var i = begin; i <= end; i++) {
        document.getElementById(i).checked = false;
        document.getElementById("tick" + i.toString()).style.display = "none";
    }
    document.getElementById(id).checked = true;
    document.getElementById("tick" + id.toString()).style.display = "block";
}