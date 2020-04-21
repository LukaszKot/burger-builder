import React, { Fragment } from 'react';
import styles from './Layout.module.css'
const Layout = (props) => (
    <Fragment>
        <div>
            Toolbar, SideDrawer, Backdrop
        </div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;