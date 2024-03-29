import React, { Component } from 'react'
import Title from './Title'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'

export default class Services extends Component {
    state = {
        services:[
            {
                icon: <FaCocktail />,
                title: "Free cocktails",
                info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, nihil. "
            },
            {
                icon: <FaHiking />,
                title: "Endless Hiking",
                info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, nihil. "
            },
            {
                icon: <FaShuttleVan />,
                title: "Free Shuttile",
                info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, nihil. "
            },
            {
                icon: <FaBeer />,
                title: "Strongest Beer",
                info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, nihil. "
            }

        ]
    }
    render() {
        return (
            <section className='services'>
                <Title title='Our Services' />
                <div className='services-center'>
                    {this.state.services.map((service,index) => {
                        return (
                            <article key={index} className='service'>
                                <span>{service.icon}</span>
                                <h6>{service.title}</h6>
                                <p>{service.info}</p>
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}
