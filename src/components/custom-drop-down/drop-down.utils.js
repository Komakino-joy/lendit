const selectedListItemID = (dropDownListName) => {
    var node = document.getElementById(dropDownListName);
    var value = node.options[node.selectedIndex].text;
    return value
}

export default selectedListItemID;