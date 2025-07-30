// src/components/Navbar/Navbar.js
import React, {useState} from "react";
import styles from './Navbar.module.css';
import Text from "../Typography/Text/Text";


const navItems = [
    { id: 1, text: "Início", href: "#inicio" },
    { id: 2, text: "História", href: "#historia" },
    { id: 3, text: "Projetos", href: "#projetos" },
    { id: 4, text: "Metodologia", href: "#metodologia" },
    { id: 5, text: "Ecossistema", href: "#ecossistema" },
    { id: 6, text: "Loja", href: "#loja" },
];

function Navbar() {
    const [ activeItem, setActiveItem ] = useState(navItems[0].id);
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    
    const handleItemClick = (id, href) => {
        setActiveItem(id);

        if (href.startsWith('#')) {
            document.querySelector(href).scrollIntoView({behavior: 'smooth'});
        }
    }

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);

    }

    return (
        <nav className={styles.navbar}>
            <button className={styles.navButton} onClick={handleMenuClick}>Menu</button>
            <ul className={`${styles.navList} ${isMenuOpen ? styles.navActive : ''}`}>
                {navItems.map(item => (
                    <li key={item.id}>
                        <Text
                            href={item.href}
                            className={`${styles.navListItem} ${activeItem === item.id ? styles.active : ''}`}
                            onClick={() => handleItemClick(item.id, item.href)} // Adiciona o manipulador de clique
                        >
                            {item.text}
                        </Text>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;