import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
function App() {
    useEffect(() => {document.body.className = "bg-white text-slate-500"})
    return (
        <>
            <NavigationBar />
            <div className="min-h-screen h-auto max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default App;
