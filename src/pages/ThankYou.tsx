import React from 'react';
import { CheckCircleOutlined, HomeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircleOutlined 
              style={{ 
                fontSize: '80px', 
                color: '#52c41a',
                marginBottom: '16px'
              }} 
            />
          </div>

          {/* Main Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Thank You!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Your application has been submitted successfully.
          </p>

        </div>
      </div>
    </div>
  );
};

export default ThankYou;
