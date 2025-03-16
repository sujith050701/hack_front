// src/pages/InstitutionDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstitutionDashboard = () => {
  const [pendingEndorsements, setPendingEndorsements] = useState([]);
  const [verifiedEndorsements, setVerifiedEndorsements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEndorsements = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch both pending and verified endorsements in parallel
        const [pendingResponse, verifiedResponse] = await Promise.all([
          axios.get('http://192.168.206.4:5000/api/endorsements/pending', { headers }),
          axios.get('http://192.168.206.4:5000/api/endorsements/verified', { headers })
        ]);

        setPendingEndorsements(pendingResponse.data.data.endorsements || []);
        setVerifiedEndorsements(verifiedResponse.data.data.endorsements || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch endorsements');
        setLoading(false);
      }
    };
    fetchEndorsements();
  }, []);

  const handleVerify = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://192.168.206.4:5000/api/endorsements/${id}/verify`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // After verification, fetch both lists again to ensure they're up to date
      const headers = { Authorization: `Bearer ${token}` };
      const [pendingResponse, verifiedResponse] = await Promise.all([
        axios.get('http://192.168.206.4:5000/api/endorsements/pending', { headers }),
        axios.get('http://192.168.206.4:5000/api/endorsements/verified', { headers })
      ]);

      setPendingEndorsements(pendingResponse.data.data.endorsements || []);
      setVerifiedEndorsements(verifiedResponse.data.data.endorsements || []);
    } catch (err) {
      setError(err.message || 'Failed to verify endorsement');
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorText}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern} />
      <div style={styles.dashboardContent}>
        <div style={styles.headerSection}>
          <h1 style={styles.dashboardTitle}>Institution Verification Portal</h1>
          <p style={styles.dashboardSubtitle}>
            Manage and verify professional endorsement requests with comprehensive institutional support tracking
          </p>
        </div>
        
        <div style={styles.gridContainer}>
          {/* Pending Endorsements Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <i className="fas fa-clock" style={{marginRight: '10px'}}></i>
                Pending Verifications
            </h2>
              <p style={styles.sectionDescription}>
                Review and verify new endorsement requests from professionals. Each request includes detailed skill information and support requirements.
              </p>
            </div>

            {pendingEndorsements.length === 0 ? (
              <div style={styles.emptyState}>
                <i className="fas fa-inbox" style={styles.emptyStateIcon}></i>
                <p style={styles.noDataText}>No pending endorsement requests</p>
                <p style={styles.emptyStateSubtext}>New requests will appear here for your review</p>
              </div>
            ) : (
              <ul style={styles.list}>
                {pendingEndorsements.map((endorsement) => (
                  <li key={endorsement._id} style={styles.listItem}>
                    {/* Title */}
                    <div style={styles.titleText}>
                      <i className="fas fa-bookmark" style={{ marginRight: '10px' }}></i>
                      {endorsement.title}
                    </div>

                    {/* Skill */}
                    <div style={styles.skillText}>
                      <i className="fas fa-graduation-cap" style={{ marginRight: '10px' }}></i>
                      {endorsement.skill}
                    </div>

                    {/* Professional Name */}
                    <div style={styles.professionalText}>
                      <i className="fas fa-user" style={{ marginRight: '10px' }}></i>
                      {endorsement.professional?.name || 'Unknown Professional'}
                    </div>

                    {/* Description Box */}
                    <div style={styles.descriptionBox}>
                      <div style={styles.descriptionTitle}>
                        <i className="fas fa-file-alt" style={{ marginRight: '8px' }}></i>
                        Purpose & Justification
                      </div>
                      <div style={styles.descriptionText}>{endorsement.description}</div>
                    </div>

                    {/* Institutional Support Section */}
                    <div style={styles.supportDetailsBox}>
                      <div style={styles.supportTitle}>
                        <i className="fas fa-hands-helping" style={{ marginRight: '8px' }}></i>
                        Institutional Support Requested
                      </div>
                      
                      {/* Funding Support */}
                      {endorsement.institutionalSupport?.fundingSupport?.required && (
                        <div style={styles.supportDetail}>
                          <span style={styles.supportLabel}>
                            <span style={styles.supportEmoji}>💰</span> Funding Support
                          </span>
                          <div style={styles.supportText}>
                            {endorsement.institutionalSupport.fundingSupport.details}
                          </div>
                        </div>
                      )}
                      
                      {/* Time Allocation */}
                      {endorsement.institutionalSupport?.timeAllocation?.required && (
                        <div style={styles.supportDetail}>
                          <span style={styles.supportLabel}>
                            <span style={styles.supportEmoji}>⏳</span> Time Allocation
                          </span>
                          <div style={styles.supportText}>
                            {endorsement.institutionalSupport.timeAllocation.details}
                          </div>
                        </div>
                      )}
                      
                      {/* Resource Access */}
                      {endorsement.institutionalSupport?.resourceAccess?.required && (
                        <div style={styles.supportDetail}>
                          <span style={styles.supportLabel}>
                            <span style={styles.supportEmoji}>🔗</span> Resource Access
                          </span>
                          <div style={styles.supportText}>
                            {endorsement.institutionalSupport.resourceAccess.details}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleVerify(endorsement._id)}
                      style={styles.verifyButton}
                    >
                      <i className="fas fa-check" style={{marginRight: '8px'}}></i>
                      Verify
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Verified Endorsements Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <i className="fas fa-check-circle" style={{marginRight: '10px'}}></i>
              Verified Endorsements
            </h2>
              <p style={styles.sectionDescription}>
                Track all verified endorsements and their associated institutional support commitments
              </p>
            </div>

            {verifiedEndorsements.length === 0 ? (
              <div style={styles.emptyState}>
                <i className="fas fa-certificate" style={styles.emptyStateIcon}></i>
                <p style={styles.noDataText}>No verified endorsements yet</p>
                <p style={styles.emptyStateSubtext}>Verified endorsements will be displayed here</p>
              </div>
            ) : (
              <ul style={styles.list}>
                {verifiedEndorsements.map((endorsement) => (
                  <li key={endorsement._id} style={styles.listItem}>
                    {/* Title */}
                    <div style={styles.titleText}>
                      <i className="fas fa-bookmark" style={{ marginRight: '10px' }}></i>
                      {endorsement.title}
                    </div>

                    {/* Skill */}
                    <div style={styles.skillText}>
                      <i className="fas fa-graduation-cap" style={{ marginRight: '10px' }}></i>
                      {endorsement.skill}
                    </div>

                    {/* Professional Name */}
                    <div style={styles.professionalText}>
                      <i className="fas fa-user" style={{ marginRight: '10px' }}></i>
                      {endorsement.professional?.name || 'Unknown Professional'}
                    </div>

                    {/* Description Box */}
                    <div style={styles.descriptionBox}>
                      <div style={styles.descriptionTitle}>
                        <i className="fas fa-file-alt" style={{ marginRight: '8px' }}></i>
                        Purpose & Justification
                      </div>
                      <div style={styles.descriptionText}>{endorsement.description}</div>
                    </div>

                    {/* Institutional Support Section */}
                    <div style={styles.supportDetailsBox}>
                      <div style={styles.supportTitle}>
                        <i className="fas fa-hands-helping" style={{ marginRight: '8px' }}></i>
                        Institutional Support Requested
                      </div>
                      
                      {/* Funding Support */}
                      {endorsement.institutionalSupport?.fundingSupport?.required && (
                        <div style={styles.supportDetail}>
                          <span style={styles.supportLabel}>
                            <span style={styles.supportEmoji}>💰</span> Funding Support
                          </span>
                          <div style={styles.supportText}>
                            {endorsement.institutionalSupport.fundingSupport.details}
                          </div>
                        </div>
                      )}
                      
                      {/* Time Allocation */}
                      {endorsement.institutionalSupport?.timeAllocation?.required && (
                        <div style={styles.supportDetail}>
                          <span style={styles.supportLabel}>
                            <span style={styles.supportEmoji}>⏳</span> Time Allocation
                          </span>
                          <div style={styles.supportText}>
                            {endorsement.institutionalSupport.timeAllocation.details}
                          </div>
                        </div>
                      )}
                      
                      {/* Resource Access */}
                      {endorsement.institutionalSupport?.resourceAccess?.required && (
                        <div style={styles.supportDetail}>
                          <span style={styles.supportLabel}>
                            <span style={styles.supportEmoji}>🔗</span> Resource Access
                          </span>
                          <div style={styles.supportText}>
                            {endorsement.institutionalSupport.resourceAccess.details}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Verified Badge */}
                    <span style={styles.verifiedBadge}>
                      <i className="fas fa-shield-alt" style={{marginRight: '8px'}}></i>
                      Verified
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal CSS as JavaScript objects
const styles = {
  container: {
    minHeight: '100vh',
    background: '#1a1a1a',
    padding: '40px 20px',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },

  backgroundPattern: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `
      linear-gradient(45deg, transparent 48%, rgba(69, 243, 255, 0.1) 50%, transparent 52%),
      linear-gradient(-45deg, transparent 48%, rgba(255, 39, 112, 0.1) 50%, transparent 52%)
    `,
    backgroundSize: '40px 40px',
    animation: 'moveBackground 20s linear infinite',
    pointerEvents: 'none',
    zIndex: 0,
  },

  dashboardContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },

  dashboardTitle: {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    background: 'linear-gradient(45deg, #45f3ff, #ff2770)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 20px rgba(69, 243, 255, 0.3)',
    letterSpacing: '2px',
  },

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    padding: '20px',
  },

  section: {
    background: 'rgba(45, 45, 57, 0.9)',
    borderRadius: '20px',
    padding: '30px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(69, 243, 255, 0.2)',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },

  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '25px',
    color: '#ff2770',
    textShadow: '0 0 5px #ff2770',
    borderBottom: '2px solid rgba(255, 39, 112, 0.3)',
    paddingBottom: '10px',
  },

  noDataText: {
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontSize: '1.1rem',
    padding: '20px',
  },

  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    maxHeight: '600px',
    overflowY: 'auto',
  },

  listItem: {
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '20px',
    border: '1px solid rgba(69, 243, 255, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(69, 243, 255, 0.2)',
    },
  },

  skillText: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#45f3ff',
    marginBottom: '10px',
    textShadow: '0 0 5px rgba(69, 243, 255, 0.5)',
  },

  professionalText: {
    fontSize: '1.1rem',
    color: '#fff',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },

  descriptionText: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.5',
    marginBottom: '15px',
  },

  verifyButton: {
    backgroundColor: '#45f3ff',
    color: '#1a1a1a',
    padding: '12px 25px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: '#ff2770',
      color: '#fff',
      boxShadow: '0 0 20px #ff2770',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover:before': {
      left: '100%',
    },
  },

  verifiedBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(69, 243, 255, 0.2)',
    color: '#45f3ff',
    fontSize: '0.9rem',
    padding: '8px 15px',
    borderRadius: '20px',
    marginTop: '10px',
    border: '1px solid #45f3ff',
    textShadow: '0 0 5px #45f3ff',
  },

  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#1a1a1a',
  },

  loadingText: {
    fontSize: '1.5rem',
    color: '#45f3ff',
    textShadow: '0 0 10px #45f3ff',
    animation: 'pulse 1.5s infinite',
  },

  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#1a1a1a',
  },

  errorText: {
    fontSize: '1.5rem',
    color: '#ff2770',
    textShadow: '0 0 10px #ff2770',
    padding: '20px',
    borderRadius: '10px',
    background: 'rgba(255, 39, 112, 0.1)',
    border: '1px solid rgba(255, 39, 112, 0.3)',
  },

  // Add custom scrollbar styles
  '@global': {
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#45f3ff',
      borderRadius: '4px',
      '&:hover': {
        background: '#ff2770',
      },
    },
  },

  titleText: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#ff2770',
    marginBottom: '10px',
    textShadow: '0 0 10px rgba(255, 39, 112, 0.3)',
  },

  descriptionBox: {
    marginTop: '15px',
    padding: '15px',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  },

  descriptionTitle: {
    color: '#45f3ff',
    fontSize: '1.1rem',
    marginBottom: '8px',
    fontWeight: '600',
  },

  descriptionText: {
    color: '#fff',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    wordBreak: 'break-word',
  },

  supportDetailsBox: {
    marginTop: '15px',
    padding: '15px',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  },

  supportTitle: {
    fontSize: '1.3rem',
    color: '#45f3ff',
    marginBottom: '15px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    '& i': {
      fontSize: '1.4rem',
      filter: 'drop-shadow(0 0 5px rgba(69, 243, 255, 0.5))',
    },
  },

  supportDetail: {
    marginBottom: '15px',
    padding: '10px',
    borderLeft: '3px solid #ff2770',
    background: 'rgba(255, 39, 112, 0.1)',
    borderRadius: '0 8px 8px 0',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateX(5px)',
      background: 'rgba(255, 39, 112, 0.15)',
    },
  },

  supportLabel: {
    color: '#45f3ff',
    fontWeight: '600',
    display: 'block',
    marginBottom: '5px',
  },

  supportEmoji: {
    fontSize: '1.2rem',
    marginRight: '8px',
  },

  supportText: {
    color: '#fff',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    paddingLeft: '10px',
    wordBreak: 'break-word',
  },

  headerSection: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '20px',
    background: 'rgba(45, 45, 57, 0.9)',
    borderRadius: '20px',
    border: '1px solid rgba(69, 243, 255, 0.2)',
    boxShadow: '0 0 30px rgba(69, 243, 255, 0.1)',
  },

  dashboardSubtitle: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '10px',
    maxWidth: '800px',
    margin: '10px auto 0',
  },

  sectionHeader: {
    marginBottom: '25px',
  },

  sectionDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1.1rem',
    marginTop: '10px',
    lineHeight: '1.5',
  },

  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '15px',
    border: '1px solid rgba(69, 243, 255, 0.1)',
  },

  emptyStateIcon: {
    fontSize: '3rem',
    color: '#45f3ff',
    marginBottom: '15px',
    filter: 'drop-shadow(0 0 10px rgba(69, 243, 255, 0.3))',
  },

  emptyStateSubtext: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.9rem',
    marginTop: '5px',
  },
};

export default InstitutionDashboard;