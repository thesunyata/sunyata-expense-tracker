import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import ExpenseChart from './components/ExpenseChart';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import { FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { supabase } from './supabaseClient';
import Auth from './components/Auth';
import AnalyticsChart from './components/AnalyticsChart';
import Profile from './components/Profile';

const initialData = [
  { id: 1, text: 'Groceries', amount: -60, category: 'Food', date: '2023-10-25' },
  { id: 2, text: 'Salary', amount: 2500, category: 'Other', date: '2023-10-24' },
  { id: 3, text: 'Gas', amount: -45, category: 'Transport', date: '2023-10-23' },
  { id: 4, text: 'Games', amount: -70, category: 'Entertainment', date: '2023-10-22' },
];

const Dashboard = ({ transactions, onAdd, onDelete, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const amounts = transactions.map(t => t.amount);
  const totalBalance = amounts.length > 0 ? amounts.reduce((acc, item) => acc + item, 0) : 0;
  const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0);
  const expense = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0);

  // Prepare chart data
  const chartData = transactions.reduce((acc, current) => {
    const found = acc.find(item => item.name === current.date);
    if (found) {
      found.value += Math.abs(current.amount);
    } else {
      acc.push({ name: current.date, value: Math.abs(current.amount) });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.name) - new Date(b.name)).slice(-7);

  const finalChartData = chartData.length > 0 ? chartData : [{ name: 'Today', value: 0 }];

  const triggerHaptic = (pattern = 10) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  };

  return (
    <div style={{ paddingBottom: '6rem' }}>
      <Header user={user} onProfileClick={() => setIsProfileOpen(true)} />

      <div className="dashboard-grid">
        <div>
          <BalanceCard totalBalance={totalBalance} income={income} expense={expense} />
          <ExpenseChart data={finalChartData} />
          <AnalyticsChart transactions={transactions} />
        </div>
        <div className="desktop-sidebar">
          <TransactionList transactions={transactions} onDelete={onDelete} />
        </div>
      </div>

      <motion.button
        className="fab-button"
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsModalOpen(true);
          triggerHaptic(10);
        }}
      >
        <FaPlus />
      </motion.button>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={onAdd}
      />

      <AnimatePresence>
        {isProfileOpen && <Profile user={user} onClose={() => setIsProfileOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchTransactions();
    }
  }, [session]);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching:', error);
    else setTransactions(data);
  };

  const triggerHaptic = (pattern = 10) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  };

  const addTransaction = async (transaction) => {
    if (!session) return;

    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        ...transaction,
        user_id: session.user.id
      }])
      .select();

    if (error) {
      console.error('Error adding:', error);
      alert('Error adding transaction. Please check your network or try again.');
    } else {
      setTransactions([data[0], ...transactions]);
      triggerHaptic([10, 30, 10]); // Success pattern
    }
  };

  const deleteTransaction = async (id) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting:', error);
    } else {
      setTransactions(transactions.filter(t => t.id !== id));
      triggerHaptic(20);
    }
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Dashboard
            transactions={transactions}
            onAdd={addTransaction}
            onDelete={deleteTransaction}
            user={session.user}
          />
        } />
      </Routes>
    </Router>
  );
}

export default App;
