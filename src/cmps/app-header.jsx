import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export const AppHeader = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAppScrolled, setIsAppScrolled] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = () => {
        if (window.scrollY > 50) setIsAppScrolled(true)
        else setIsAppScrolled(false)
    }
    return (
        <section className={`app-header flex space-between ${isAppScrolled && 'scrolled'}`}>
            <Link to='/'><h1 className="logo">Weather App</h1></Link>
            <ul className="nav-list flex clean-list align-center">
                <NavLink exact to='/'><li>Home</li></NavLink>
                <NavLink to='/search'><li>Search</li></NavLink>
                <NavLink to='/favorites'><li>Favorites</li></NavLink>
            </ul>
            <i className="lni lni-menu bars-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}></i>
            {isMobileMenuOpen && <div className="mobile-menu-container" onClick={() => setIsMobileMenuOpen(false)}></div>}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : 'close'}`}>
                <ul className="nav-list-mobile flex clean-list column align-center justify-center">
                    <NavLink exact to='/'><li onClick={() => setIsMobileMenuOpen(false)}>Home</li></NavLink>
                    <NavLink to='/search'><li onClick={() => setIsMobileMenuOpen(false)}>Search</li></NavLink>
                    <NavLink to='/favorites'><li onClick={() => setIsMobileMenuOpen(false)}>Favorites</li></NavLink>
                </ul>
            </div>
        </section>
    )
}
