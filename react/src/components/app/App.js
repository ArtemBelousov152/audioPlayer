import Input from '../input/Input';
import Player from '../player/Player';
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
            element: <Player/>
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
