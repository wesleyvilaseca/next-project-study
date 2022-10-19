import React from 'react';
import NextLink from "next/link";
import { MenuList, MenuItem, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse } from '@mui/material';
import useDeviceSize from '../../support/deviceSizeVerify';
import { FaCar, FaUsers, FaLaptop, FaCreditCard, FaWhatsapp, FaSignOutAlt, FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'

export default function Header(props) {

    const [width, height] = useDeviceSize();
    const [state, setState] = React.useState({ open: false });
    const [collapse, setCollapse] = React.useState({ site: false, financeiro: false });

    return (
        <React.Fragment>
            {(width < 577) ?
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setState({ open: true })}
                        >
                            <MdMenu />
                        </IconButton>
                        <Typography variant="h6">
                            {props.title}
                        </Typography>
                    </Toolbar>

                </AppBar>
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

            <Drawer
                anchor="left"
                open={state.open}
                onClose={() => {
                    setState({ open: false })
                }}
            >
                <div style={{ width: 320, maxWidth: width - 70 }}>
                    <List
                        component='nav'
                        className='menu-mobile'>
                        <ListItem>
                            <span>CRM</span>
                        </ListItem>

                        <Divider className='mt-2 mb-3' />

                        <ListItem>
                            <ListItemIcon>
                                <FaCar />
                            </ListItemIcon>
                            <ListItemText primary="Produtos" />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <FaUsers />
                            </ListItemIcon>
                            <ListItemText primary="Proprietários" />
                        </ListItem>

                        <ListItem button onClick={() => setCollapse({ site: (collapse.site) ? false : true })}>
                            <ListItemIcon>
                                <FaLaptop />
                            </ListItemIcon>
                            <ListItemText primary="Site" />
                            {(collapse.site) ? <FaAngleUp /> : <FaAngleDown />}
                        </ListItem>

                        <Collapse in={collapse.site} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText className='pl-5' primary="Otimizar para o google" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className='pl-5' primary="Unidades e telefones" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className='pl-5' primary="Minha logo" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className='pl-5' primary="Dominio" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className='pl-5' primary="Configuracoes" />
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem button onClick={() => setCollapse({ financeiro: (collapse.financeiro) ? false : true })}>
                            <ListItemIcon>
                                <FaCreditCard />
                            </ListItemIcon>
                            <ListItemText primary="Financeiro" />
                            {(collapse.financeiro) ? <FaAngleUp /> : <FaAngleDown />}
                        </ListItem>

                        <Collapse in={collapse.financeiro} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem>
                                    <ListItemText className='pl-5' primary="Meu plano" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText className='pl-5' primary="Transações" />
                                </ListItem>
                            </List>
                        </Collapse>

                        <ListItem>
                            <ListItemIcon>
                                <FaSignOutAlt />
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </React.Fragment>
    )
}
