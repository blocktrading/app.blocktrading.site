import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/Layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { StrategyBuilder } from './pages/StrategyBuilder';
import { ActiveStrategies } from './pages/ActiveStrategies';
import { Portfolio } from './pages/Portfolio';
import { Exchanges } from './pages/Exchanges';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Backtesting } from './pages/Backtesting';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
            <Route index element={<Dashboard />} />
            <Route path="strategies" element={<ActiveStrategies />} />
            <Route path="backtesting" element={<Backtesting />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="exchanges" element={<Exchanges />} />
            <Route path="analytics" element={<div>Analytics</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
          
          {/* Layout dedicato per Strategy Builder */}
          <Route path="strategy-builder" element={<StrategyBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;