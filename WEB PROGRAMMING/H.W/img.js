function applyChanges(checkId, dropdownId) {
    const checkbox = document.getElementById(checkId);
    const dropdown = document.getElementById(dropdownId);
    const img = document.querySelector(".img img"); // Target your image

    if (!checkbox.checked) {
        alert(`Please check the box for ${dropdownId} before applying changes.`);
        return;
    }

    const value = dropdown.value;
    if (value === "") {
        alert("Please select a value before applying.");
        return;
    }

    // Apply changes on button
    if (dropdownId === "dropdown1") {
        img.style.border = `7px solid ${value.toLowerCase()}`; // Color change
    } 
    else if (dropdownId === "dropdown2") {
        if (value === "Small") img.style.width = "200px";
        if (value === "Medium") img.style.width = "400px";
        if (value === "Large") img.style.width = "600px";
    } 
    else if (dropdownId === "dropdown3") {
        img.style.display = value === "Yes" ? "block" : "none"; // Show/Hide
    }

    alert(`Applied: ${value} for ${dropdownId}`);
}

document.getElementById("apply1").addEventListener("click", function() {
    applyChanges("check1", "dropdown1");
});

document.getElementById("apply2").addEventListener("click", function() {
    applyChanges("check2", "dropdown2");
});

document.getElementById("apply3").addEventListener("click", function() {
    applyChanges("check3", "dropdown3");
});
