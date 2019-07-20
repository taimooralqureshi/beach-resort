import React from 'react'
import RoomFilter from './RoomFilter'
import RoomsList from './RoomsList'
import {withRoomComponent} from '../Context'
import Loading from './Loading'
function RoomsContainer({context}) {
 const {loading, sortedRooms, rooms} = context;
if(loading)
    return <Loading />
return (
    <div>
        hello from room container
        <RoomFilter rooms={rooms}/>
        <RoomsList rooms={sortedRooms} />
    </div>
)    
}

export default withRoomComponent(RoomsContainer)












// import React from 'react'
// import RoomFilter from './RoomFilter'
// import RoomsList from './RoomsList'
// import {RoomConsumer} from '../Context'
// import Loading from './Loading'
// function RoomsContainer() {
//     return (
//         <RoomConsumer>
//             {value =>{
//                 const {loading,rooms,sortedRoom} = value;
//                 if(loading)
//                 {
//                     return <Loading />
//                 }
//                 return(
//                     <div>
//                     hello from room container
//                     <RoomFilter />
//                     <RoomsList />
//                 </div>
               
//            )}}
//         </RoomConsumer>
//             )
// }

// export default RoomsContainer
