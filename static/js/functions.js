function selectOnlyThis(id, begin, end) {
    for (var i = begin; i <= end; i++) {
        document.getElementById(i).checked = false;
    }
    document.getElementById(id).checked = true;
}