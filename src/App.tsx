import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';


function App() {

  return (
    <div className="page">
      <Header className='page__header mb-5 border-bottom pb-4 pt-4' />
      <main className="main-wrap mb-5">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
