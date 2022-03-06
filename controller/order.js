//Order======================================================================================================
$(".saveOrderBtn").attr('disabled', true)
var discountRegEx = /^[0-9]{2,10}$/;
var qtyRegEx = /^[0-9]{1,20}$/;
$('#selectCustomer,#selectItem,#Quantity').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#selectCustomer").change(function () {
    let temp = $("#selectCustomer").val();
    btnAction3();
    if (temp != "Select Customer") {
        $("#selectCustomer").css('border', '2px solid green');
    }
})

$("#selectItem").change(function () {
    let temp = $("#selectItem").val();
    btnAction3();
    if (temp != "Select Item") {
        $("#selectItem").css('border', '2px solid green');
    }
})

$("#Quantity").keyup(function (event) {
    let temp = checkQuantity();
    btnAction3();
    if ("Enter" == event.key & temp == true) {
        $("#Discount").focus();
    }
})

function checkQuantity() {
    let temp = $("#Quantity").val();
    if (qtyRegEx.test(temp)) {
        $("#Quantity").css('border', '2px solid green');
        return true;
    } else {
        $("#Quantity").css('border', '2px solid red');
    }
}

/*$("#Discount").keyup(function (event) {
    let temp = checkDiscount();
    btnAction3();
    if ("Enter" == event.key & temp == true) {
        saveorder()
    }
})

function checkDiscount() {
    let temp = $("#Discount").val();
    if (discountRegEx.test(temp)) {
        $("#Discount").css('border', '2px solid green');
        return true;
    } else {
        $("#Discount").css('border', '2px solid red');
    }
}*/

function btnAction3() {
    let selectedCustomer = $("#selectCustomer").val();
    if (selectedCustomer != "Select Customer") {
        let selectedItem = $("#selectItem").val();
        if (selectedItem != "Select Item") {
            let qty = $("#Quantity").val();
            if (qtyRegEx.test(qty)) {
                    $(".saveOrderBtn").attr('disabled', false);
            } else {
                $(".saveOrderBtn").attr('disabled', true);
                return false;
            }
        } else {
            $(".saveOrderBtn").attr('disabled', true);
            return false;
        }
    } else {
        $(".saveOrderBtn").attr('disabled', true);
        return false;
    }

}

$(".saveOrderBtn").click(function () {
    saveorder();
})

function saveorder() {
    let selectedCustomer = $("#selectCustomer").val();
    let selectedItem = $("#selectItem").val();
    let quantity = $("#Quantity").val();
    let discount = $("#Discount").val();
    let row3 = `<tr><td>1</td><td>${discount}</td><td>${selectedCustomer}</td><td>${selectedItem}</td><td>${quantity}</td><td>1000</td></tr>`;

    $("#tbl3").append(row3);
    $("#tbl3>tr").click(function () {
        let customerName = $(this).children().eq(2).text();
        let itemName = $(this).children().eq(3).text();
        let price = $(this).children().eq(5).text();

        $(".tempCustomerName").val(customerName);
        $(".tempItemName").val(itemName);
        $(".tempOrderPrice").val(price);
    })
}