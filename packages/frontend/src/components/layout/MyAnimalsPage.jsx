import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from './Background';
import LogoutButton from '../common/LogoutButton';
import { fetchWithAuth } from '../../utils/api';
import API_URL from '../../config/api';
import DeleteAccountModal from '../common/DeleteAccountModal';

/**
 * MyAnimalsPage component
 *
 * @returns {React.ReactElement} The MyAnimalsPage component
 */
const MyAnimalsPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    seNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchWithAuth(`${API_URL}/auth/profile`);
        if (!response.ok) {
          throw new Error('Kunde inte hämta användardata');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdatePassword = () => {
    // TODO: Implementera lösenordsändring senare
    console.log('Ändra lösenord');
  };

  const handleUpdateSeNumber = () => {
    // TODO: Implementera SE-nummer hantering senare
    console.log('Ändra SE-nummer');
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  if (loading) {
    return (
      <Background showBackButton={false}>
        <div style={{ color: 'white' }}>Laddar...</div>
      </Background>
    );
  }

  if (error) {
    return (
      <Background showBackButton={false}>
        <div style={{ color: 'red' }}>{error}</div>
      </Background>
    );
  }

  return (
    <Background showBackButton={false}>
      <LogoutButton />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <div style={{
          backgroundColor: 'rgb(119, 87, 43, 0.95)',
          width: '40vw',
          height: '75vw',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          gap: '20px',
          borderRadius: '8px'
        }}>
          <h1 style={{
            fontSize: '2rem',
            width: '80%',
            color: 'white',
            margin: '0',
            borderBottom: '2px solid white'
          }}>
            Min Profil
          </h1>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            width: '80%',
            color: 'white'
          }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>E-post</h3>
              <p style={{ margin: 0 }}>{userData.email}</p>
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>Lösenord</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                alignItems: 'center'
              }}>
                <button
                  onClick={handleUpdatePassword}
                  style={{
                    backgroundColor: 'rgb(108, 117, 125)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    border: 'none',
                    width: '200px'
                  }}
                >
                  Ändra lösenord
                </button>
              </div>
            </div>
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>Antal djur</h3>
              <p style={{ margin: 0 }}>Total:</p>
              <p style={{ margin: 0 }}>Nötkreatur:</p>
              <p style={{ margin: 0 }}>Get:</p>
              <p style={{ margin: 0 }}>Fjäderfä:</p>
            </div>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <h3 style={{ margin: '0 0 5px 0' }}>SE-nummer</h3>
              </div>
              <p style={{ margin: 0 }}>{userData.seNumber || 'Inte angivet'}</p>
            </div>
          </div>
          <div style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '80%'
          }}>
            <button
              onClick={handleDeleteAccount}
              style={{
                backgroundColor: 'rgb(220, 53, 69)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'center',
                fontWeight: 'bold',
                border: 'none'
              }}
            >
              Radera konto
            </button>
            <div style={{
              backgroundColor: 'rgb(108, 117, 125)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              Ladda ner backup
            </div>
          </div>
        </div>
        <div style={{
          backgroundColor: 'rgb(119, 87, 43, 0.95)',
          width: '40vw',
          height: '75vw',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          gap: '20px',
          borderRadius: '8px'
        }}>
          <h1 style={{
            fontSize: '2rem',
            width: '80%',
            color: 'white',
            margin: '0',
            borderBottom: '2px solid white'
          }}>
            Mina Djur
          </h1>
          {/* Här kommer vi senare lägga till en lista med djur */}
        </div>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </Background>
  );
};

export default MyAnimalsPage;
