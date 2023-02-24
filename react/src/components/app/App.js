import Input from '../input/Input';
import PlayerWrapper from '../playerWrapper/PlayerWrapper';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.scss';

function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Input/>
        },
        {
            path: '/player',
            element: <PlayerWrapper/>
        }
    ])

    return (
        <div className="App">
            {/* <Input/> */}
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
