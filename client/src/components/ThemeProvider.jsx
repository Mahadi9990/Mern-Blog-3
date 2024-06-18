import {useSelector} from 'react-redux'
export default function ThemeProvider({children}) {
    const {theme} =useSelector((state)=>state.theme)
  return (
      <div className={theme}>
          <div className="bg-white text-gray-600 dark:bg-[rgb(16,12,42)] dark:text-white min-h-screen">
             {children}
          </div>   
      </div>
  )
}
