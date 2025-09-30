import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Layout } from '@/components';
import { Dashboard, VirtualMachines, Storage, Security, Monitoring, Events, Help } from '@/pages';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="virtual-machines" element={<VirtualMachines />} />

            <Route path="events" element={<Events />} />
            <Route path="help" element={<Help />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
