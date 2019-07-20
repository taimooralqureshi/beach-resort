import React, { Component } from 'react'
import defaultBg from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import {RoomContext} from '../Context'
import {Link} from 'react-router-dom'
import StyledHero from '../components/StyledHero'
export default class SingleRoom extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            slug:this.props.match.params.slug,
            defaultBg
        }
    }
    static contextType = RoomContext;
    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        if(!room)
        {
            return <div className="error">
                <h3>no such room could be found...</h3>
                <Link to='/rooms' className='btn-primary'>
                    Back to Room
                </Link>
            </div>
        }
        const [mainImg,...defaultImg] = room.images;
        return (
            <>
           <StyledHero img={mainImg}>
               <Banner title={`${room.name} room`}>
                    <Link to='/rooms' className='btn-primary'>
                        back to rooms
                    </Link>
               </Banner>
           </StyledHero>
            <section className='single-room'>
                <div className='single-room-images'>
                    {
                        defaultImg.map((img,index)=> <img key={index} src={img} alt={room.name} />)
                    }

                </div>
                <div className='single-room-info'>
                    <article className='desc'>
                        <h3>details</h3>
                        <p>{room.description}</p>
                    </article>
                    <article className='info'>
                        <h3>Info</h3>
                        <h6>price : ${room.price}</h6>
                        <h6>size : {room.size}Sq.ft </h6>
                        <h6>
                            capacity : {' '}{room.capacity > 1 ? `${room.capacity} people`: `${room.capacity} person` }
                        </h6>
                        <h6>{room.pets? 'pets allowed' : 'pets not allowed'}</h6>
                        <h6>{room.breakfast&& 'free breakfast included'}</h6>
                    </article>
                </div>
            </section>
            <section className='room-extras'>
                    <h6>extras</h6>
                    <ul className='extras'>
                        {room.extras.map((item,idx)=> <li key={idx}>+ {item}</li>)}
                    </ul>
            </section>
        </>
        )
    }
}
