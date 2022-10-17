import NextLink from "next/link";

import Head from 'next/head'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function AuthScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { credentials, success } = useSelector(state => state.authReducer);

    return (
        <React.Fragment>
            <Head>
                <title>Home - Site CRM</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='container-fluid'>
                Home Page
                <div>
                    <NextLink href='/login'>Login</NextLink>
                </div>
            </div>
        </React.Fragment>
    )
}
