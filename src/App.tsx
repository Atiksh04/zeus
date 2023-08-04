import './App.css'
import BuilderSection from './components/BuilderSection';
import Header from './components/Header';
import PanelSection from './components/PanelSection';


function App() {

  return (
    <div className="bg-slate-50 w-screen h-screen">
      <Header/>
      <div className='h-[calc(100%-4rem)] w-full flex'>
        <div  className="w-2/3 h-full">
          <BuilderSection/>
        </div>
        <div className='w-1/3 h-full'>
          <PanelSection />
        </div>
      </div>
    </div>
  )
}

export default App
