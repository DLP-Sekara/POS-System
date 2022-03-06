function OrderObject(oID,date,custName,item,qty,totalPrice) {
    this.oID= oID;
    this.date= date;
    this.custName= custName;
    this.ItemName=[item];
    this.qty= qty;
    this.totalPrice= totalPrice;
}