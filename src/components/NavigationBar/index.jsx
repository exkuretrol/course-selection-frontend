import { BsLayoutTextWindowReverse } from 'react-icons/bs'

const NavigationBar = () => {
    // TODO: mx responsive design
    return (
        <div className="sticky top-0 z-40 w-full backdrop-blur flex-none lg:z-50 lg:border-b lg:border-slate-900/10">
            <div className="max-w-7xl mx-auto">
                <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 mx-4 lg:mx-0">
                    <div className="relative flex flex-row items-center">
                        <a href="/" className="mr-3 w-auto h-6">
                            <div className="flex gap-4">
                                <BsLayoutTextWindowReverse className="w-6 h-6 fill-sky-400" />
                                <p>語音選課系統</p>
                            </div>
                        </a>
                        <div className="relative items-center ml-auto hidden md:flex">
                            <nav className="text-sm text-slate-700 leading-6 font-semibold">
                                <ul className="flex space-x-6">
                                    <NavItem name="查詢記錄" href="/records" />
                                    <NavItem name="導入" href="/import" />
                                    <NavItem name="關於" href="/about" />
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const NavItem = (props) => {
    return (
        <li>
            <a href={props.href} className="rounded-full px-2 py-1 hover:bg-sky-100 hover:text-sky-600">
                {props.name}
            </a>
        </li>
    )
}

export default NavigationBar;