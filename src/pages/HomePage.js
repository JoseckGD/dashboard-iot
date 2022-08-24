import '../styles/HomePage.css';
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

export const HomePage = () => {
   return (
      <>
         <Sidebar />
         <section className='homepage'>
            <Header />
            <h1>
               Dashboard IoT
            </h1>
         </section>
      </>
   )
}
