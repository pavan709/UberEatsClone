import moment from 'moment';

class Order{
    constructor(id, items, totalAmount, date,restaurantName){
        this.id = id;
        this.items=items;
        this.totalAmount = totalAmount;
        this.date = date;
        this.restaurantName=restaurantName;
    }

    get readableDate() {


        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}

export default Order;