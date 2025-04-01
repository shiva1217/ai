import React, { useState, useEffect } from 'react';
import './settings.css';
import { useTheme } from '../context/ThemeContext';


const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showManageAccount, setShowManageAccount] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    general: {
      theme: theme,
    },
    security: {
      twoFactorAuth: false,
      activeSessions: [],
    },
    learning: {
      aiAvatar: 'default',
      courseDifficulty: 'medium',
      quizProctoring: true,
    },
    notifications: {
      email: true,
      push: true,
      courseUpdates: true,
      marketing: false,
    },
    privacy: {
      aiPersonalization: true,
      dataExport: false,
      accountDeletion: false,
    }
  });

  const handleGeneralChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [type]: value
      }
    }));
    
    if (type === 'theme') {
      toggleTheme(value);
    }
  };

  const handleSecurityChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [type]: value
      }
    }));
  };

  const handleLearningChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      learning: {
        ...prev.learning,
        [type]: value
      }
    }));
  };

  const handleNotificationChange = (type) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePrivacyChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General Settings' },
    { id: 'security', label: 'Account & Security' },
    { id: 'learning', label: 'Learning Preferences' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy & Data' }
  ];

  if (showDeleteAccount) {
    return (
      <DeleteAccount
        onBack={() => setShowDeleteAccount(false)}
      />
    );
  }

  if (showManageAccount) {
    return (
      <ManageAccount
        onBack={() => setShowManageAccount(false)}
      />
    );
  }

  if (showChangePassword) {
    return (
      <ChangePassword
        onBack={() => setShowChangePassword(false)}
      />
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>SETTINGS</h1>
        <button className="save-settings-btn" onClick={handleSaveSettings}>
          Save Changes
        </button>
      </div>

      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="settings-content">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <span className="setting-label">Theme</span>
                <select
                  value={settings.general.theme}
                  onChange={(e) => handleGeneralChange('theme', e.target.value)}
                  className="setting-select"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="system">System Default</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Account & Security */}
        {activeTab === 'security' && (
          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <span className="setting-label">Change Password</span>
                <button 
                  className="action-btn"
                  onClick={() => setShowChangePassword(true)}
                >
                  Change
                </button>
              </div>
              <div className="setting-item">
                <span className="setting-label">Manage Linked Accounts</span>
                <button 
                  className="action-btn"
                  onClick={() => setShowManageAccount(true)}
                >
                  Manage
                </button>
              </div>
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={() => handleSecurityChange('twoFactorAuth', !settings.security.twoFactorAuth)}
                  />
                  <span className="slider"></span>
                </label>
                <span className="setting-label">Two-Factor Authentication (2FA)</span>
              </div>
              <div className="setting-item">
                <span className="setting-label">Manage Active Sessions</span>
                <button className="action-btn">View</button>
              </div>
              <div className="setting-item danger">
                <span className="setting-label">Delete Account</span>
                <button 
                  className="action-btn danger"
                  onClick={() => setShowDeleteAccount(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Learning Preferences */}
        {activeTab === 'learning' && (
          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <span className="setting-label">AI Avatar Selection</span>
                <select
                  value={settings.learning.aiAvatar}
                  onChange={(e) => handleLearningChange('aiAvatar', e.target.value)}
                  className="setting-select"
                >
                  <option value="default">Default</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
              <div className="setting-item">
                <span className="setting-label">Course Difficulty</span>
                <select
                  value={settings.learning.courseDifficulty}
                  onChange={(e) => handleLearningChange('courseDifficulty', e.target.value)}
                  className="setting-select"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.learning.quizProctoring}
                    onChange={() => handleLearningChange('quizProctoring', !settings.learning.quizProctoring)}
                  />
                  <span className="slider"></span>
                </label>
                <span className="setting-label">Quiz Proctoring</span>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="slider"></span>
                </label>
                <span className="setting-label">Email Notifications</span>
              </div>
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="slider"></span>
                </label>
                <span className="setting-label">Push Notifications</span>
              </div>
            </div>
          </div>
        )}

        {/* Privacy & Data */}
        {activeTab === 'privacy' && (
          <div className="settings-section">
            <div className="settings-group">
              <div className="setting-item">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.aiPersonalization}
                    onChange={() => handlePrivacyChange('aiPersonalization', !settings.privacy.aiPersonalization)}
                  />
                  <span className="slider"></span>
                </label>
                <span className="setting-label">AI Personalization</span>
              </div>
              <div className="setting-item">
                <span className="setting-label">Data Export</span>
                <button className="action-btn">Export Data</button>
              </div>
              <div className="setting-item">
                <span className="setting-label">Data Deletion</span>
                <button className="action-btn">Request Deletion</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 