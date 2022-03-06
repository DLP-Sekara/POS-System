//Order======================================================================================================
$(".saveOrderBtn").attr('disabled', true)
$(".OrderDltBtn").attr('disabled', true)
$(".purchaseBtn").attr('disabled', true)
getCustomerNames();
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
    if (temp != null) {
        $("#selectCustomer").css('border', '2px solid green');
    }
})

$("#selectItem").change(function () {
    let temp = $("#selectItem").val();
    btnAction3();
    if (temp != null) {
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
//========save==========//
$(".saveOrderBtn").click(function () {
    saveorder();
})

function saveorder() {
    let tempItem1=finditem($("#selectItem").val());

    let oid=makeOrderId();
    let date=today;
    let selectedCustomer = $("#selectCustomer").val();
    let selectedItem = [tempItem1];
    let quantity = $("#Quantity").val();
    let totalPrice = quantity*tempItem1.price;

    var orderObject=new OrderObject(oid,date,selectedCustomer,selectedItem,quantity,totalPrice);
    order.push(orderObject);
    addOrderToTable(tempItem1);
    console.log(order)
    $("#tbl3>tr").click(function () {
        let customerName = $(this).children().eq(2).text();
        let itemName = $(this).children().eq(3).text();
        let price = $(this).children().eq(5).text();

        $(".tempCustomerName").val(customerName);
        $(".tempItemName").val(itemName);
        $(".tempOrderPrice").val(price);
    })
}
//========others==========//
function getCustomerNames() {
   $('.customerSelection').empty();
    $('.customerSelection').append($('<option>', { text:"Select Customer"}));
    for (var i=0;i<customer.length;i++){
        $('.customerSelection').append($('<option>', { text:customer[i].name}));
        console.log(customer[i].name)
    }

}
function getItemNames() {
   $('.itemSelection').empty();
    $('.itemSelection').append($('<option>', { text:"Select Item"}));
    for (var i=0;i<item.length;i++){
        $('.itemSelection').append($('<option>', {text:item[i].name}));

    }

}

$(".itemSelection").change(function () {
    setItemDetails();
})
function setItemDetails() {
    var tempItemName=$(".itemSelection").val();
    if(tempItemName!="Select Item"){
        var tempItem2=finditem(tempItemName);
        $(".itemCode").val(tempItem2.code);
        $(".itemName").val(tempItem2.name);
        $(".itemPrice").val(tempItem2.price);
        $(".itemQty").val(tempItem2.qty);
        $(".itemCode,.itemName,.itemPrice,.itemQty").css("background-color"," #74b9ff");

    }else{
        alert("select item")
    }

}
function finditem(tempItemName) {
    for (var i=0;i<item.length;i++){
        if(item[i].name==tempItemName){
            return item[i];
        }
    }
}

function addOrderToTable(tempItem1) {
    $("#tbl3").empty();
    for (var i = 0; i < order.length; i++) {
        let row3 = `<tr><td>${order[i].oID}</td><td>${order[i].date}</td><td>${order[i].custName}</td><td>${tempItem1.name}</td><td>${order[i].qty}</td><td>${order[i].totalPrice}</td></tr>`;
        $("#tbl3").append(row3);
    }
}
function makeOrderId() {
    var orderCount=order.length;
    return orderCount++;
}