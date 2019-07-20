import React, { Component } from 'react';
// import items from './data';
import Client from './contentful';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
        type:'all',
        capacity:1,
        price :0,
        minPrice: 0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets: false
    }

    getData = async ()  => {
        try {
            let response = await Client.getEntries({
                content_type:'beachResort',
                order:'sys.createdAt'
                // order:'fields.price'
            });
       
            let rooms = this.formatData(response.items);
            let featuredRooms = rooms.filter(room => room.featured === true);
            let maxPrice = Math.max(...rooms.map(room => room.price))
            let maxSize = Math.max(...rooms.map(room => room.size))
           
            
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price:maxPrice,
                maxPrice,
                maxSize
            })

        } catch (error) {
            console.log(error);
            
        }
    }

    componentDidMount() {
       this.getData();
    }

    formatData(items){
        let tempItem =items.map(item => {
          let id = item.sys.id;
          let images = item.fields.images.map(image => image.fields.file.url);
            let room = {...item.fields,images,id};
            return room;
        })
        return tempItem;
    }
    
    getRoom=(slug)=> {
        let tempItem = [...this.state.rooms];
        const room = tempItem.find(room => room.slug === slug);
        return room;
    }

    handleChange = event => {
        const value = event.target.type === 'checkbox'?event.target.checked: event.target.value;
        const name = event.target.name ;
       this.setState({ [name] : value },this.filterRoom)
    }

    filterRoom = () => {
        let {rooms,pets,price,capacity,breakfast,maxPrice,minSize,maxSize,type} = this.state;
        let tempRooms = [...rooms];
        capacity = parseInt(capacity);
        price = parseInt(price)
        if(type !== 'all')
         tempRooms = tempRooms.filter(room => room.type === type)

        if(capacity !== 1)
            tempRooms = tempRooms.filter(room => room.capacity === capacity)

        if(price !== maxPrice)
            tempRooms = tempRooms.filter(room => room.price <= price)

        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        if(breakfast)
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        if(pets)
            tempRooms = tempRooms.filter(room => room.pets === true)
        this.setState({sortedRooms:tempRooms})        
    }

    

    render() {
        return (
            <RoomContext.Provider value={{...this.state,getRoom:this.getRoom, handleChange:this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomComponent(Component) {
    return function ConsumerWraapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}
export {RoomContext, RoomProvider, RoomConsumer};