import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
.outline-none {
    outline: none !important;
}

.header {
    border-bottom: 2px solid rgb(229, 229, 299);
}

.header .nav-link {
    font-weight: 600;
    color: #555 !important;
    padding: 28px 1.5rem !important;
    border-bottom: 2px solid transparent;
}

.header .nav-link:hover {
    border-bottom: 2px solid #1976d2;
}

.header .nav-link .icon-lg {
    font-size: 22px;
}

.header .dropdown:hover > .dropdown-menu {
    display: block;
}

.header .dropdown-menu {
    box-shadow: rgba(0,0,0,0.8) 0px 4px 16px 0px, rgba(0,0,0,0.6) 0px 2px 6px 0px;
    border: 1px solid #eee;
    top: 80%;
}

.header .dropdown-item {
    padding: 10px 15px;
    font-weight: 600;
    color: #444;
}
`