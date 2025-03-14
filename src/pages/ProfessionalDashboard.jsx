import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfessionalDashboard = () => {
  const [endorsements, setEndorsements] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEndorsement, setNewEndorsement] = useState({
    skill: '',
    title: '', // Add this field
    institution: '',
    description: '',
    institutionalSupport: {
      fundingSupport: {
        required: false,
        details: ''
      },
      timeAllocation: {
        required: false,
        details: ''
      },
      resourceAccess: {
        required: false,
        details: ''
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch both endorsements and institutions
        const [endorsementsRes, institutionsRes] = await Promise.all([
          axios.get('http://192.168.235.4:5000/api/endorsements/my-endorsements', { headers }),
          axios.get('http://192.168.235.4:5000/api/profiles/institutions', { headers }),
        ]);

        setEndorsements(endorsementsRes.data.data.endorsements);
        setInstitutions(institutionsRes.data.data.institutions);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setNewEndorsement({ ...newEndorsement, [e.target.name]: e.target.value });
  };

  const handleSupportChange = (field, type, value) => {
    setNewEndorsement(prev => ({
      ...prev,
      institutionalSupport: {
        ...prev.institutionalSupport,
        [field]: {
          ...prev.institutionalSupport[field],
          [type]: value
        }
      }
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://192.168.235.4:5000/api/endorsements', 
        newEndorsement,  // Send the state directly since it matches the backend schema
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      setEndorsements([...endorsements, response.data.data.endorsement]);
      // Reset form with all fields including title
      setNewEndorsement({
        skill: '',
        title: '',  // Add this field
        institution: '',
        description: '',
        institutionalSupport: {
          fundingSupport: {
            required: false,
            details: ''
          },
          timeAllocation: {
            required: false,
            details: ''
          },
          resourceAccess: {
            required: false,
            details: ''
          }
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to create endorsement');
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
    <div className='body' style={styles.container}>
      <div style={styles.backgroundPattern} />
      <div style={styles.content}>
        <div style={styles.headerSection}>
          <h1 style={styles.dashboardTitle}>
            <i className="fas fa-user-circle" style={{ marginRight: '10px' }}></i>
            Professional Skills Portal
          </h1>
          <p style={styles.dashboardSubtitle}>
            Showcase your expertise and get institutional endorsements for your professional skills
          </p>
        </div>

        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h2 style={styles.sectionTitle}>
              <i className="fas fa-plus-circle" style={{ marginRight: '10px' }}></i>
              Request New Skill Endorsement
            </h2>
            <p style={styles.sectionDescription}>
              Submit your skill for verification by a recognized institution. Provide detailed information to support your request.
            </p>
          </div>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.inputGroupHalf}>
                <select
                  name="institution"
                  value={newEndorsement.institution}
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option value="">Select Institution</option>
                  {institutions.map((institution) => (
                    <option key={institution._id} value={institution._id}>
                      {institution.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.inputGroupHalf}>
                <input
                  type="text"
                  name="title"
                  placeholder="Endorsement Title"
                  value={newEndorsement.title}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <input
                type="text"
                name="skill"
                placeholder="Skill/Subject to Learn"
                value={newEndorsement.skill}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <textarea
                name="description"
                placeholder="Purpose & Justification"
                value={newEndorsement.description}
                onChange={handleChange}
                style={styles.textarea}
                rows="4"
              />
            </div>
            <div style={styles.supportContainer}>
              <h3 style={styles.supportTitle}>
                <i className="fas fa-hands-helping"></i>
                Institutional Support Requirements
              </h3>
              <p style={styles.supportDescription}>
                Select the types of support needed from the institution to develop your skill. Be specific in your requirements.
              </p>

              {/* Funding Support */}
              <div style={styles.supportOption}>
                <label style={styles.supportLabel}>
                  <span style={styles.supportEmoji}>💰</span>
                  Funding Support
                  <input
                    type="checkbox"
                    checked={newEndorsement.institutionalSupport.fundingSupport.required}
                    onChange={(e) => handleSupportChange('fundingSupport', 'required', e.target.checked)}
                    style={styles.checkbox}
                  />
                </label>
                {newEndorsement.institutionalSupport.fundingSupport.required && (
                  <textarea
                    value={newEndorsement.institutionalSupport.fundingSupport.details}
                    onChange={(e) => handleSupportChange('fundingSupport', 'details', e.target.value)}
                    placeholder="Specify amount & purpose"
                    style={styles.supportInput}
                  />
                )}
              </div>

              {/* Time Allocation */}
              <div style={styles.supportOption}>
                <label style={styles.supportLabel}>
                  <span style={styles.supportEmoji}>⏳</span>
                  Time Allocation
                  <input
                    type="checkbox"
                    checked={newEndorsement.institutionalSupport.timeAllocation.required}
                    onChange={(e) => handleSupportChange('timeAllocation', 'required', e.target.checked)}
                    style={styles.checkbox}
                  />
                </label>
                {newEndorsement.institutionalSupport.timeAllocation.required && (
                  <textarea
                    value={newEndorsement.institutionalSupport.timeAllocation.details}
                    onChange={(e) => handleSupportChange('timeAllocation', 'details', e.target.value)}
                    placeholder="Study leave, flexible schedule, workload adjustment"
                    style={styles.supportInput}
                  />
                )}
              </div>

              {/* Resource Access */}
              <div style={styles.supportOption}>
                <label style={styles.supportLabel}>
                  <span style={styles.supportEmoji}>🔗</span>
                  Resource Access
                  <input
                    type="checkbox"
                    checked={newEndorsement.institutionalSupport.resourceAccess.required}
                    onChange={(e) => handleSupportChange('resourceAccess', 'required', e.target.checked)}
                    style={styles.checkbox}
                  />
                </label>
                {newEndorsement.institutionalSupport.resourceAccess.required && (
                  <textarea
                    value={newEndorsement.institutionalSupport.resourceAccess.details}
                    onChange={(e) => handleSupportChange('resourceAccess', 'details', e.target.value)}
                    placeholder="Lab facilities, software, datasets"
                    style={styles.supportInput}
                  />
                )}
              </div>
            </div>
            <button type="submit" style={styles.submitButton}>
              Create Endorsement
            </button>
          </form>
        </div>

        <div style={styles.endorsementsContainer}>
          <div style={styles.endorsementsHeader}>
            <h2 style={styles.sectionTitle}>
              <i className="fas fa-certificate" style={{ marginRight: '10px' }}></i>
              My Skill Portfolio
            </h2>
            <p style={styles.sectionDescription}>
              Track your endorsement requests and view verified skills. Verified endorsements can be shared with potential employers.
            </p>
          </div>
          {endorsements.length === 0 ? (
            <div style={styles.emptyStateMessage}>
              No endorsements found.
            </div>
          ) : (
            <ul style={styles.list}>
              {endorsements.map((endorsement) => (
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

                  {/* Institution */}
                  <div style={styles.institutionText}>
                    <i className="fas fa-building"></i>
                    {endorsement.institution?.name || 'Unknown'}
                  </div>

                  {/* Status */}
                  <div style={styles.statusBadge} style={{
                    backgroundColor: endorsement.status === 'verified' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(202, 138, 4, 0.1)',
                    color: endorsement.status === 'verified' ? '#16a34a' : '#ca8a04',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginTop: '10px'
                  }}>
                    <i className={`fas fa-${endorsement.status === 'verified' ? 'check-circle' : 'clock'}`} style={{ marginRight: '8px' }}></i>
                    {endorsement.status}
                  </div>

                  {/* Description */}
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
                      Institutional Support
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Internal CSS as JavaScript objects
const styles = {
  body: {
    margin: 0,
    padding: 0,
    background: '#0a0a0a',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    width: '100%',
  },

  container: {
    width: '100%',
    minHeight: '100vh',
    padding: '20px',
    background: '#0a0a0a',
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },

  backgroundPattern: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `
      radial-gradient(circle at 20% 20%, rgba(69, 243, 255, 0.05) 0%, transparent 25%),
      radial-gradient(circle at 80% 80%, rgba(255, 39, 112, 0.05) 0%, transparent 25%),
      linear-gradient(45deg, rgba(69, 243, 255, 0.02) 0%, transparent 70%),
      linear-gradient(-45deg, rgba(255, 39, 112, 0.02) 0%, transparent 70%)
    `,
    backgroundSize: '200% 200%',
    animation: 'gradientFlow 15s ease infinite',
    zIndex: 0,
  },

  content: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    padding: '0 20px',
    boxSizing: 'border-box',
  },

  dashboardTitle: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '800',
    textAlign: 'center',
    background: 'linear-gradient(45deg, #45f3ff, #ff2770)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    padding: '20px 0',
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: '100px',
      height: '4px',
      background: 'linear-gradient(90deg, #45f3ff, #ff2770)',
      margin: '15px auto 0',
      borderRadius: '2px',
    },
  },

  formContainer: {
    background: 'rgba(20, 20, 28, 0.95)',
    borderRadius: '20px',
    padding: '30px',
    border: '1px solid rgba(69, 243, 255, 0.2)',
    boxShadow: `
      0 0 30px rgba(69, 243, 255, 0.1),
      inset 0 0 30px rgba(255, 39, 112, 0.05)
    `,
    backdropFilter: 'blur(10px)',
    animation: 'containerGlow 3s ease-in-out infinite',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },

  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#ff2770',
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '0 0 15px 0',
    borderBottom: '2px solid rgba(69, 243, 255, 0.2)',
    '& i': {
      color: '#45f3ff',
      textShadow: '0 0 10px rgba(69, 243, 255, 0.5)',
    },
  },

  formRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '10px',
    },
  },

  inputGroupHalf: {
    flex: '1',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: '0',
      width: '0',
      height: '2px',
      background: 'linear-gradient(90deg, #45f3ff, #ff2770)',
      transition: 'width 0.3s ease',
    },
    '&:focus-within::after': {
      width: '100%',
    },
  },

  inputGroup: {
    width: '100%',
    marginBottom: '20px',
    boxSizing: 'border-box',
  },

  input: {
    width: '100%',
    padding: '15px 20px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(69, 243, 255, 0.2)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    '&:focus': {
      outline: 'none',
      borderColor: '#ff2770',
      boxShadow: '0 0 15px rgba(255, 39, 112, 0.2)',
      transform: 'translateY(-2px)',
    },
  },

  select: {
    width: '100%',
    padding: '15px 20px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(69, 243, 255, 0.2)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    '&:focus': {
      outline: 'none',
      borderColor: '#ff2770',
      boxShadow: '0 0 15px rgba(255, 39, 112, 0.2)',
      transform: 'translateY(-2px)',
    },
  },

  textarea: {
    width: '100%',
    padding: '15px 20px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(69, 243, 255, 0.2)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '1rem',
    minHeight: '120px',
    maxHeight: '200px',
    resize: 'vertical',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    '&:focus': {
      outline: 'none',
      borderColor: '#ff2770',
      boxShadow: '0 0 15px rgba(255, 39, 112, 0.2)',
      transform: 'translateY(-2px)',
    },
  },

  submitButton: {
    width: '100%',
    padding: '15px',
    background: `linear-gradient(45deg, #ff2770, #45f3ff)`,
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px rgba(69, 243, 255, 0.3)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: '0.5s',
    },
    '&:hover::before': {
      left: '100%',
    },
  },

  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },

  listItem: {
    background: 'rgba(20, 20, 28, 0.95)',
    borderRadius: '15px',
    padding: '25px',
    border: '1px solid rgba(69, 243, 255, 0.2)',
    position: 'relative',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    boxSizing: 'border-box',
    width: '100%',
  },

  skillText: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#45f3ff',
    marginBottom: '15px',
    textShadow: '0 0 10px rgba(69, 243, 255, 0.3)',
    borderBottom: '2px solid rgba(69, 243, 255, 0.2)',
    paddingBottom: '10px',
  },

  institutionText: {
    fontSize: '1.1rem',
    color: '#ff2770',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  statusBadge: {
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
  },

  statusBadgeVerified: {
    backgroundColor: 'rgba(69, 243, 255, 0.1)',
    color: '#45f3ff',
    border: '1px solid #45f3ff',
  },

  statusBadgePending: {
    backgroundColor: 'rgba(255, 39, 112, 0.1)',
    color: '#ff2770',
    border: '1px solid #ff2770',
  },

  descriptionText: {
    fontSize: '0.95rem',
    color: '#fff',
    lineHeight: '1.6',
    padding: '15px',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    marginTop: '15px',
    maxHeight: '150px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(45deg, #ff2770, #45f3ff)',
      borderRadius: '2px',
    },
  },

  '@keyframes containerGlow': {
    '0%, 100%': {
      boxShadow: '0 0 30px rgba(69, 243, 255, 0.1), inset 0 0 30px rgba(255, 39, 112, 0.05)',
    },
    '50%': {
      boxShadow: '0 0 40px rgba(255, 39, 112, 0.1), inset 0 0 40px rgba(69, 243, 255, 0.05)',
    },
  },

  '@keyframes gradientFlow': {
    '0%, 100%': {
      backgroundPosition: '0% 0%',
    },
    '50%': {
      backgroundPosition: '100% 100%',
    },
  },

  '@media (max-width: 768px)': {
    container: {
      padding: '10px',
    },
    dashboardTitle: {
      fontSize: '2rem',
    },
    list: {
      gridTemplateColumns: '1fr',
    },
  },

  supportContainer: {
    marginTop: '20px',
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '15px',
    border: '1px solid rgba(69, 243, 255, 0.1)',
  },

  supportTitle: {
    fontSize: '1.3rem',
    color: '#45f3ff',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    textShadow: '0 0 10px rgba(69, 243, 255, 0.3)',
  },

  supportOption: {
    marginBottom: '20px',
    padding: '15px',
    background: 'rgba(20, 20, 28, 0.95)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 39, 112, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateX(5px)',
      borderColor: 'rgba(255, 39, 112, 0.3)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '3px',
      height: '100%',
      background: 'linear-gradient(180deg, #45f3ff, #ff2770)',
      borderRadius: '3px',
    },
  },

  supportLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#fff',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginBottom: '10px',
  },

  supportEmoji: {
    fontSize: '1.4rem',
    filter: 'drop-shadow(0 0 5px rgba(69, 243, 255, 0.5))',
  },

  checkbox: {
    width: '18px',
    height: '18px',
    accentColor: '#ff2770',
    cursor: 'pointer',
  },

  supportInput: {
    width: '100%',
    padding: '12px 15px',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(69, 243, 255, 0.2)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '0.95rem',
    marginTop: '10px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    '&:focus': {
      outline: 'none',
      borderColor: '#ff2770',
      boxShadow: '0 0 15px rgba(255, 39, 112, 0.2)',
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

  supportDetailsBox: {
    marginTop: '15px',
    padding: '15px',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  },

  supportDetail: {
    marginBottom: '10px',
    padding: '8px',
    borderLeft: '3px solid #ff2770',
    background: 'rgba(255, 39, 112, 0.1)',
    borderRadius: '0 8px 8px 0',
  },

  supportLabel: {
    color: '#45f3ff',
    fontWeight: '600',
    display: 'block',
    marginBottom: '5px',
  },

  supportText: {
    color: '#fff',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    paddingLeft: '10px',
  },

  headerSection: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '30px',
    background: 'rgba(20, 20, 28, 0.95)',
    borderRadius: '20px',
    border: '1px solid rgba(69, 243, 255, 0.2)',
    boxShadow: '0 0 30px rgba(69, 243, 255, 0.1)',
  },

  dashboardSubtitle: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '15px',
    maxWidth: '800px',
    margin: '15px auto 0',
    lineHeight: '1.6',
  },

  formHeader: {
    marginBottom: '30px',
  },

  sectionDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1.1rem',
    marginTop: '10px',
    lineHeight: '1.6',
    paddingLeft: '15px',
    borderLeft: '3px solid #ff2770',
  },

  endorsementsHeader: {
    marginBottom: '30px',
  },

  supportDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1rem',
    marginBottom: '20px',
    lineHeight: '1.5',
    padding: '10px',
    background: 'rgba(69, 243, 255, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(69, 243, 255, 0.1)',
  },

  emptyStateMessage: {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '1.1rem',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '15px',
    border: '1px solid rgba(69, 243, 255, 0.1)',
    margin: '20px 0',
  },
};

export default ProfessionalDashboard;
