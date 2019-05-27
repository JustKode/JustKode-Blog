import Header from './header'
import Footer from './footer'
import { NextFunctionComponent } from 'next';

const Layout: NextFunctionComponent = ({children}: {children?: any}) => {
    return (
        <div>
            <Header />
            { children }
            <Footer />
        </div>
    )
}

export default Layout