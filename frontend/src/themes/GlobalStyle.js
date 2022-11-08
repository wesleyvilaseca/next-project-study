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

.box-image {
    width: 100%;
    height: 9rem;
    cursor:move;
    position: relative;
}

.bg-img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 4px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.23);
}

.box-image .file-input {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 4;
    cursor: pointer;
    opacity: 0;
}

.box-upload {
    border: 2px dashed rgba(0, 0, 0, 0.23)
}

.box-image .text-plus {
    font-size: 48px;
    line-height: 48px;
    display: block;
    text-align: center;
}

.box-image .img-action {
    position: absolute;
    bottom: 16px;
    right: 10px;
    width: 35px;
    height: 35px;
    cursor: pointer;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.54);
    z-index: 1;
    opacity: 0;
}

.box-image:hover .img-action{
    opacity: 1;
}

.box-image .img-action:hover {
    background-color: #d53545;
}

@media(max-width: 576px){
    .vehicle-img img {
        max-width: 100px;
    }

    .MuiMenu-paper {
        position: fixed !important;
        top: auto !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
    }

    .MuiMenu-paper ~ div::before {
        content: "";
        z-index: -1;
        position: fixed;
        inset: 0px;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .MuiMenuItem-root {
        padding-top: 9px !important;
        padding-bottom: 9px !important;
        font-weight: 500 !important;
    }
}
`
