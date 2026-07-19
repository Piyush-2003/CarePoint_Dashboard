import { useState } from 'react';
import { Users, AlertCircle, CheckCircle, Home, Clock, TrendingUp, Bell, Shield } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const NAVY = '#1e3a5f';
const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const AMBER = '#d97706';
const PURPLE = '#7c3aed';

// ── Mock Data ──
const RESIDENTS = [
  { id: 1, name: 'Margaret Thompson', age: 84, room: '101', careLevel: 'High',   keyWorker: 'Sarah Johnson',  status: 'stable',   notes: 'Physio at 2pm today' },
  { id: 2, name: 'Arthur Williams',   age: 79, room: '102', careLevel: 'Medium', keyWorker: 'James Patel',    status: 'review',   notes: 'GP visit requested' },
  { id: 3, name: 'Dorothy Hughes',    age: 91, room: '103', careLevel: 'High',   keyWorker: 'Emma Williams',  status: 'stable',   notes: 'Family visiting 3pm' },
  { id: 4, name: 'Harold Bennett',    age: 76, room: '104', careLevel: 'Low',    keyWorker: 'Tom Wilson',     status: 'stable',   notes: '' },
  { id: 5, name: 'Edith Clarke',      age: 88, room: '105', careLevel: 'High',   keyWorker: 'Fatima Hassan',  status: 'alert',    notes: '⚠️ Fall risk - bed rails up' },
  { id: 6, name: 'Frank Morrison',    age: 82, room: '106', careLevel: 'Medium', keyWorker: 'Sarah Johnson',  status: 'stable',   notes: 'Medication review due' },
  { id: 7, name: 'Violet Patterson',  age: 95, room: '107', careLevel: 'High',   keyWorker: 'Emma Williams',  status: 'stable',   notes: '' },
  { id: 8, name: 'Reg Dawson',        age: 71, room: '108', careLevel: 'Low',    keyWorker: 'James Patel',    status: 'review',   notes: 'Awaiting assessment' },
];

const INCIDENTS = [
  { id: 1, type: 'Fall',            resident: 'Edith Clarke',      time: '08:14', severity: 'high',   resolved: false },
  { id: 2, type: 'Medication Late', resident: 'Frank Morrison',    time: '09:30', severity: 'medium', resolved: true  },
  { id: 3, type: 'GP Visit Due',    resident: 'Arthur Williams',   time: '10:00', severity: 'medium', resolved: false },
  { id: 4, type: 'Family Request',  resident: 'Dorothy Hughes',    time: '11:15', severity: 'low',    resolved: true  },
];

const OCCUPANCY = [
  { month: 'Jan', occupied: 18, capacity: 20 },
  { month: 'Feb', occupied: 19, capacity: 20 },
  { month: 'Mar', occupied: 17, capacity: 20 },
  { month: 'Apr', occupied: 20, capacity: 20 },
  { month: 'May', occupied: 19, capacity: 20 },
  { month: 'Jun', occupied: 18, capacity: 20 },
];

const COMPLIANCE = [
  { label: 'DBS Checks',        done: 12, total: 12 },
  { label: 'Care Plans',        done: 8,  total: 8  },
  { label: 'Risk Assessments',  done: 7,  total: 8  },
  { label: 'Med Competencies',  done: 5,  total: 6  },
  { label: 'Fire Training',     done: 10, total: 12 },
];

const STAFF_TODAY = [
  { name: 'Sarah Johnson',  role: 'Senior Carer',   shift: '07:00–15:00', status: 'on-shift'  },
  { name: 'James Patel',    role: 'Care Assistant', shift: '07:00–15:00', status: 'late'      },
  { name: 'Emma Williams',  role: 'Nurse',          shift: '07:00–19:00', status: 'on-shift'  },
  { name: 'Fatima Hassan',  role: 'Nurse',          shift: '07:00–19:00', status: 'on-shift'  },
  { name: 'Tom Wilson',     role: 'Care Assistant', shift: '07:00–15:00', status: 'completed' },
  { name: 'Lucy Chen',      role: 'Senior Carer',   shift: '15:00–23:00', status: 'upcoming'  },
];

// ── Components ──
function KPICard({ icon, label, value, sub, color }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e6f0', borderRadius: 12, padding: '16px 18px', flex: 1, minWidth: 140, display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function StatusDot({ status }) {
  const colors = { stable: GREEN, review: AMBER, alert: RED };
  return <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors[status] || '#9ca3af', display: 'inline-block', marginRight: 6 }} />;
}

// ── Main App ──
export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [resolvedIncidents, setResolvedIncidents] = useState(
    INCIDENTS.filter(i => i.resolved).map(i => i.id)
  );

  const resolveIncident = (id) => {
    setResolvedIncidents(prev => [...prev, id]);
  };

  const tabs = [
    { id: 'overview',    label: '📊 Overview'    },
    { id: 'residents',   label: '👥 Residents'   },
    { id: 'incidents',   label: '🚨 Incidents'   },
    { id: 'compliance',  label: '✅ Compliance'  },
  ];

  const openIncidents = INCIDENTS.filter(i => !resolvedIncidents.includes(i.id)).length;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f4f6fb', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ background: NAVY, padding: '0 28px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Home size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>CarePoint365 — Sunrise Care Home</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>Management Dashboard · Live Overview</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {openIncidents > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: RED + '30', border: `1px solid ${RED}`, borderRadius: 20, padding: '4px 12px' }}>
              <Bell size={12} color={RED} />
              <span style={{ fontSize: 12, color: RED, fontWeight: 600 }}>{openIncidents} open incidents</span>
            </div>
          )}
          <div style={{ fontSize: 11, color: '#94a3b8' }}>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', borderBottom: '2px solid #e2e6f0', padding: '0 28px', display: 'flex' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '13px 18px', fontSize: 13, fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer',
            borderBottom: activeTab === tab.id ? `2px solid ${BLUE}` : '2px solid transparent',
            color: activeTab === tab.id ? BLUE : '#6b7280', marginBottom: -2
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: 24 }}>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
              <KPICard icon={<Users size={20} color={BLUE} />} label="Residents" value="8/20" sub="60% occupancy" color={BLUE} />
              <KPICard icon={<CheckCircle size={20} color={GREEN} />} label="Stable" value={RESIDENTS.filter(r => r.status === 'stable').length} sub="residents" color={GREEN} />
              <KPICard icon={<AlertCircle size={20} color={AMBER} />} label="Under Review" value={RESIDENTS.filter(r => r.status === 'review').length} sub="residents" color={AMBER} />
              <KPICard icon={<AlertCircle size={20} color={RED} />} label="Alerts" value={RESIDENTS.filter(r => r.status === 'alert').length} sub="action needed" color={RED} />
              <KPICard icon={<Clock size={20} color={GREEN} />} label="Staff On Shift" value={STAFF_TODAY.filter(s => s.status === 'on-shift').length} sub="of 6 scheduled" color={GREEN} />
              <KPICard icon={<TrendingUp size={20} color={PURPLE} />} label="Occupancy Rate" value="90%" sub="May average" color={PURPLE} />
            </div>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#fff', border: '1px solid #e2e6f0', borderRadius: 12, padding: 20 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Occupancy Trend</div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 16 }}>Residents vs capacity · Jan–Jun</div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={OCCUPANCY}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={[0, 22]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="capacity" stroke="#e2e6f0" strokeWidth={2} dot={false} name="Capacity" />
                    <Line type="monotone" dataKey="occupied" stroke={BLUE} strokeWidth={2} dot={{ r: 4, fill: BLUE }} name="Occupied" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: '#fff', border: '1px solid #e2e6f0', borderRadius: 12, padding: 20 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Compliance Overview</div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 16 }}>Completed vs required</div>
                {COMPLIANCE.map((c, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12 }}>{c.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: c.done === c.total ? GREEN : AMBER }}>
                        {c.done}/{c.total}
                      </span>
                    </div>
                    <div style={{ background: '#f0f2f8', borderRadius: 4, height: 8 }}>
                      <div style={{ width: `${(c.done / c.total) * 100}%`, background: c.done === c.total ? GREEN : AMBER, borderRadius: 4, height: 8 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff today */}
            <div style={{ background: '#fff', border: '1px solid #e2e6f0', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>Staff On Duty Today</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {STAFF_TODAY.map((s, i) => {
                  const colors = { 'on-shift': GREEN, late: AMBER, completed: '#9ca3af', upcoming: BLUE };
                  const color = colors[s.status];
                  return (
                    <div key={i} style={{ background: color + '10', border: `1px solid ${color}30`, borderRadius: 10, padding: '10px 14px', minWidth: 160 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.role}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{s.shift}</div>
                      <span style={{ fontSize: 10, fontWeight: 600, color, background: color + '20', padding: '2px 8px', borderRadius: 20, display: 'inline-block', marginTop: 6, textTransform: 'capitalize' }}>
                        {s.status.replace('-', ' ')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── RESIDENTS ── */}
        {activeTab === 'residents' && (
          <div>
            <div style={{ background: '#fff', border: '1px solid #e2e6f0', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>Resident Overview</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e6f0' }}>
                    {['Room', 'Resident', 'Age', 'Care Level', 'Key Worker', 'Status', 'Notes'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RESIDENTS.map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #f0f2f8' }}>
                      <td style={{ padding: '12px 12px', fontWeight: 700, color: NAVY }}>{r.room}</td>
                      <td style={{ padding: '12px 12px', fontWeight: 600 }}>{r.name}</td>
                      <td style={{ padding: '12px 12px', color: '#6b7280' }}>{r.age}</td>
                      <td style={{ padding: '12px 12px' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: r.careLevel === 'High' ? '#fee2e2' : r.careLevel === 'Medium' ? '#fef9c3' : '#dcfce7', color: r.careLevel === 'High' ? RED : r.careLevel === 'Medium' ? AMBER : GREEN }}>
                          {r.careLevel}
                        </span>
                      </td>
                      <td style={{ padding: '12px 12px', color: '#6b7280' }}>{r.keyWorker}</td>
                      <td style={{ padding: '12px 12px' }}>
                        <StatusDot status={r.status} />
                        <span style={{ textTransform: 'capitalize', fontSize: 12 }}>{r.status}</span>
                      </td>
                      <td style={{ padding: '12px 12px', fontSize: 12, color: r.status === 'alert' ? RED : '#6b7280' }}>{r.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── INCIDENTS ── */}
        {activeTab === 'incidents' && (
          <div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
              <KPICard icon={<AlertCircle size={20} color={RED} />} label="Open Incidents" value={openIncidents} sub="need action" color={RED} />
              <KPICard icon={<CheckCircle size={20} color={GREEN} />} label="Resolved Today" value={resolvedIncidents.length} sub="incidents" color={GREEN} />
              <KPICard icon={<Shield size={20} color={BLUE} />} label="Total Today" value={INCIDENTS.length} sub="all incidents" color={BLUE} />
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e6f0', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>Today's Incidents</div>
              {INCIDENTS.map(incident => {
                const isResolved = resolvedIncidents.includes(incident.id);
                const severityColor = incident.severity === 'high' ? RED : incident.severity === 'medium' ? AMBER : GREEN;
                return (
                  <div key={incident.id} style={{
                    border: `1px solid ${isResolved ? '#e2e6f0' : severityColor + '40'}`,
                    borderLeft: `4px solid ${isResolved ? '#e2e6f0' : severityColor}`,
                    borderRadius: 10, padding: '14px 16px', marginBottom: 10,
                    background: isResolved ? '#f9fafb' : '#fff',
                    opacity: isResolved ? 0.7 : 1
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{incident.type}</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>
                          {incident.resident} · {incident.time}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: severityColor, background: severityColor + '20', padding: '3px 10px', borderRadius: 20, textTransform: 'capitalize' }}>
                          {incident.severity}
                        </span>
                        {isResolved ? (
                          <span style={{ fontSize: 12, color: GREEN, fontWeight: 600 }}>✓ Resolved</span>
                        ) : (
                          <button onClick={() => resolveIncident(incident.id)} style={{
                            fontSize: 12, padding: '6px 14px', borderRadius: 8,
                            background: GREEN, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600
                          }}>
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── COMPLIANCE ── */}
        {activeTab === 'compliance' && (
          <div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
              <KPICard icon={<Shield size={20} color={GREEN} />} label="DBS Checks" value="12/12" sub="all clear" color={GREEN} />
              <KPICard icon={<CheckCircle size={20} color={GREEN} />} label="Care Plans" value="8/8" sub="up to date" color={GREEN} />
              <KPICard icon={<AlertCircle size={20} color={AMBER} />} label="Risk Assessments" value="7/8" sub="1 overdue" color={AMBER} />
              <KPICard icon={<AlertCircle size={20} color={AMBER} />} label="Fire Training" value="10/12" sub="2 pending" color={AMBER} />
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e6f0', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>Compliance Status</div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={COMPLIANCE} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 14]} />
                  <YAxis dataKey="label" type="category" tick={{ fontSize: 11 }} width={140} />
                  <Tooltip />
                  <Bar dataKey="total" name="Required" fill="#e2e6f0" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="done" name="Completed" radius={[0, 4, 4, 0]}>
                    {COMPLIANCE.map((c, i) => (
                      <Cell key={i} fill={c.done === c.total ? GREEN : AMBER} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}