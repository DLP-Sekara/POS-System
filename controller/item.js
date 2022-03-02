//Item======================================================================================================
$(".itemSaveBtn").attr('disabled', true);
var codeRegEx = /^[0-9]{4}$/;
var itemNameRegEx = /^[A-z ]{3,20}$/;
var priceRegEx = /^[0-9]{2,10}$/;
var qtyRegEx = /^[0-9]{1,20}$/;

$('#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQuantity').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#txtItemCode").keyup(function (event) {
    let temp = checkItemcCode();
    btnAction2();
    if ("Enter" == event.key & temp == true) {
        $("#txtItemName").focus();
    }
})

function checkItemcCode() {
    let temp = $("#txtItemCode").val();
    if (codeRegEx.test(temp)) {
        $("#txtItemCode").css('border', '2px solid green');
        return true;
    } else {
        $("#txtItemCode").css('border', '2px solid red');
    }
}

$("#txtItemName").keyup(function (event) {
    let temp = checkItemName();
    btnAction2();
    if ("Enter" == event.key & temp == true) {
        $("#txtItemPrice").focus();
    }
})

function checkItemName() {
    let temp = $("#txtItemName").val();
    if (itemNameRegEx.test(temp)) {
        $("#txtItemName").css('border', '2px solid green');
        return true;
    } else {
        $("#txtItemName").css('border', '2px solid red');
    }
}

$("#txtItemPrice").keyup(function (event) {
    let temp = checkItemPrice();
    btnAction2();
    if ("Enter" == event.key & temp == true) {
        $("#txtItemQuantity").focus();
    }
})

function checkItemPrice() {
    let temp = $("#txtItemPrice").val();
    if (priceRegEx.test(temp)) {
        $("#txtItemPrice").css('border', '2px solid green');
        return true;
    } else {
        $("#txtItemPrice").css('border', '2px solid red');
    }
}

$("#txtItemQuantity").keyup(function (event) {
    let temp = checkQty();
    btnAction2();
    if ("Enter" == event.key & temp == true) {
        saveItem();
    }
})

function checkQty() {
    let temp = $("#txtItemQuantity").val();
    if (qtyRegEx.test(temp)) {
        $("#txtItemQuantity").css('border', '2px solid green');
        return true;
    } else {
        $("#txtItemQuantity").css('border', '2px solid red');
    }
}

function btnAction2() {
    let code = $("#txtItemCode").val();
    if (codeRegEx.test(code)) {
        let name = $("#txtItemName").val();
        if (itemNameRegEx.test(name)) {
            let price = $("#txtItemPrice").val();
            if (priceRegEx.test(price)) {
                let qty = $("#txtItemQuantity").val();
                if (qtyRegEx.test(qty)) {
                    $(".itemSaveBtn").attr('disabled', false);
                } else {
                    $(".itemSaveBtn").attr('disabled', true);
                    return false;
                }
            } else {
                $(".itemSaveBtn").attr('disabled', true);
                return false;
            }
        } else {
            $(".itemSaveBtn").attr('disabled', true);
            return false;
        }
    } else {
        $(".itemSaveBtn").attr('disabled', true);
        return false;
    }
}

$(".btn2").click(function () {
    saveItem();
})

function saveItem() {
    let itemCode = $("#txtItemCode").val();
    let itemName = $("#txtItemName").val();
    let itemPrice = $("#txtItemPrice").val();
    let itemQuantity = $("#txtItemQuantity").val();
    let row2 = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemPrice}</td><td>${itemQuantity}</td></tr>`;
    $("#tbl2").append(row2);

    $("#tbl2>tr").click(function () {
        //let code = $(this).children().eq(0).text();
        let itemName = $(this).children().eq(1).text();
        let price = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();

        $(".tempItemName").val(itemName);
        $(".tempItemPrice").val(price);
        $(".tempItemQty").val(qty);
    })
}

