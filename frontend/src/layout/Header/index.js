import React from 'react';
import NextLink from "next/link";
import { MenuList, MenuItem } from '@mui/material';
import useDeviceSize from '../../support/deviceSizeVerify';
import { FaCar, FaUsers, FaLaptop, FaCreditCard, FaWhatsapp, FaSignOutAlt } from 'react-icons/fa'

export default function Header() {

    const [width, height] = useDeviceSize();

    return (
        <React.Fragment>
            {(width < 577) ?
                <div></div>
                :
                <nav className='header navbar navbar-expand-lg navbar-light bg-white'>
                    <div className='container'>
                        <NextLink className='navbar-brand' href="#">
                            CRM
                        </NextLink>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NextLink href="/products">
                                    <a className="nav-link">
                                        <FaCar className="icon-lg me-2" />
                                        Produtos</a>
                                </NextLink>
                            </li>

                            <li className="nav-item">
                                <NextLink href="#">
                                    <a className="nav-link">
                                        <FaUsers className="icon-lg me-2" />
                                        Proprietários</a>
                                </NextLink>
                            </li>

                            <li className="nav-item dropdown">
                                <NextLink href="#">
                                    <a className="nav-link dropdown-toggle" to="#" data-toogle="dropdown">
                                        <FaLaptop className="icon-lg me-2" />
                                        Site</a>
                                </NextLink>
                                <MenuList className='dropdown-menu'>
                                    <MenuItem className='dropdonw-item'>
                                        Otimizar para o google
                                    </MenuItem>
                                    <MenuItem className='dropdonw-item'>
                                        Unidades e telefones
                                    </MenuItem>
                                    <MenuItem className='dropdonw-item'>
                                        Minha logo
                                    </MenuItem>
                                    <MenuItem className='dropdonw-item'>
                                        Dominio
                                    </MenuItem>
                                    <MenuItem className='dropdonw-item'>
                                        Configurações
                                    </MenuItem>
                                </MenuList>
                            </li>

                            <li className="nav-item dropdown">
                                <NextLink href="#">
                                    <a className="nav-link dropdown-toggle" to="#" data-toogle="dropdown">
                                        <FaCreditCard className="icon-lg me-2" />
                                        Financeiro</a>
                                </NextLink>
                                <MenuList className='dropdown-menu'>
                                    <MenuItem className='dropdonw-item'>
                                        Meu plano
                                    </MenuItem>
                                    <MenuItem className='dropdonw-item'>
                                        Minhas tranzações
                                    </MenuItem>
                                </MenuList>
                            </li>

                            <li className="nav-item">
                                <NextLink href="#">
                                    <a className="nav-link">
                                        <FaWhatsapp className="icon-lg me-2" />
                                        Ajuda</a>
                                </NextLink>
                            </li>

                            <li className="nav-item">
                                <NextLink href="#">
                                    <a className="nav-link">
                                        <FaSignOutAlt className="icon-lg me-2" />
                                        Sair</a>
                                </NextLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            }
        </React.Fragment>
    )
}
