import './globals.css'
import Sidebar from './sidebar'

export default function RootLayout({ children }) {
  return (
    <div className='dashboad__outer'>
        <div className='dashboard__inner'>
            <div className='admin__sider_outer'>
                <Sidebar />
            </div>
            <div className='content'>
                {children}
            </div>
        </div>
    </div>
  )
}
